from django.shortcuts import render, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views.generic import View
from django.contrib.auth import authenticate, login, update_session_auth_hash
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import list_route
from rest_framework import status

from authenticating.forms import UserCreationForm
from authenticating.serializers import UserSerializer
from authenticating.models import User, PasswordsDontMatch, IncorrectPassword


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

        old = request.data.get('old', None)
        new1 = request.data.get('new1', None)
        new2 = request.data.get('new2', None)

        try:
            user = request.user.change_password(old=old, new=(new1, new2))
        except IncorrectPassword:
            return Response('Incorrect password',
                            status=status.HTTP_401_UNAUTHORIZED)
        except PasswordsDontMatch:
            return Response('Passwords do not match',
                            status=status.HTTP_400_BAD_REQUEST)

        update_session_auth_hash(request, user)  # TODO: should we call
        return Response('password updated')      # this in the model?
