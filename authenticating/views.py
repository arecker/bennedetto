from django.shortcuts import render, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views.generic import View
from django.contrib.auth import authenticate, login
from django.contrib.auth.views import login as login_view
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import list_route

from authenticating.forms import UserCreationForm
from authenticating.serializers import UserSerializer


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


def login_with_timezone(request):
    response = login_view(request)
    if request.user.is_authenticated():
        request.user.activate_timezone()
    return response


class UserViewSet(ViewSet):
    def list(self, *args, **kwargs):
        user = self.request.user
        data = UserSerializer(user).data
        return Response(data)

    @list_route(methods=['post'], url_path='send')
    def send(self, request, **kwargs):
        return Response('got it')
