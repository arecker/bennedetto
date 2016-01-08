from django.conf.urls import include, url
from django.contrib.auth.views import logout
from django.contrib.auth import urls as auth_urls

from authenticating import views

urlpatterns = [
    url(r'^register/$', views.Register.as_view(), name='register'),
    url(r'^verify/(?P<key>[^/]+)/$', views.verify, name='verify'),
    url(r'^logout/$', logout, {'next_page': '/'}, name='logout'),
    url(r'^', include(auth_urls)),
]
