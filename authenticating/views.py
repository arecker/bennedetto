from django.shortcuts import render, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views.generic import View
from django.contrib.auth import authenticate, login, update_session_auth_hash
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import list_route
from rest_framework import status

from authenticating.forms import UserCreationForm
from authenticating.serializers import UserSerializer, MembershipSerializer
from authenticating.models import (User,
                                   Membership,
                                   Family)


class Register(View):
    form_class = UserCreationForm
    template_name = 'registration/create.html'

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            form.save(request)
            user = authenticate(email=form.cleaned_data['email'],
                                password=form.cleaned_data['password1'])
            login(request, user)
            return HttpResponseRedirect(reverse('home'))
        return render(request, self.template_name, {'form': form})


def verify(request, key):
    User.objects.verify(key)
    return render(request, 'registration/verified.html')


class UserViewSet(ViewSet):
    def list(self, *args, **kwargs):
        user = self.request.user
        data = UserSerializer(user).data
        return Response(data)

    @list_route(methods=['post'], url_path='send')
    def send(self, request, **kwargs):
        request.user.send_verification_email()
        return Response('verification email sent')

    @list_route(methods=['post'], url_path='password')
    def password(self, request, **kwargs):
        user = request.user

        old = request.data.get('old', None)
        new1 = request.data.get('new1', None)
        new2 = request.data.get('new2', None)

        try:
            user = request.user.change_password(old=old, new=(new1, new2))
        except user.IncorrectPassword:
            return Response('Incorrect password',
                            status=status.HTTP_401_UNAUTHORIZED)
        except user.PasswordsDontMatch:
            return Response('Passwords do not match',
                            status=status.HTTP_400_BAD_REQUEST)

        update_session_auth_hash(request, user)
        return Response('password updated')

    @list_route(methods=['post'], url_path='family')
    def create_family(self, request, **kwargs):
        name = request.data.get('name', None)

        if Membership.objects.filter(user=request.user).exists():
            return Response('User already in family', status=status.HTTP_400_BAD_REQUEST)

        if not name:
            return Response('Name required', status=status.HTTP_400_BAD_REQUEST)

        Family.objects.create_from_user(user=request.user, name=name)

        return Response('Family created', status=201)

    @list_route(methods=['post', 'get'], url_path='membership')
    def membership(self, request, **kwargs):
        if request.method == 'POST':
            email = request.data.get('email', None)

            if not email:
                return Response('email required', status=400)

            if User.objects.filter(email=email).exists():
                return Response('user already has account', status=400)

            family = request.user.membership.family
            family.invite_user_to_family(email=email)

            return Response('user invited', status=201)

        elif request.method == 'GET':
            family = request.user.membership.family
            members = Membership.objects \
                                .select_related('user') \
                                .filter(family=family)
            data = MembershipSerializer(members, many=True).data
            return Response(data)

        else:
            return Response('Method not allowed', status=status.HTTP_405_METHOD_NOT_ALLOWED)
