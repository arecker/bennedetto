from django.conf.urls import include, url

from authenticating import views

urlpatterns = [
    url(r'^register/$', views.Register.as_view(), name='register'),
    url(r'^login/$', views.login_with_timezone, name='login'),
    url(r'^', include('django.contrib.auth.urls')),
]
