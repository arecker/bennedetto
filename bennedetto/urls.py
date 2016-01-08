from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.conf.urls import include, url
from django.conf import settings
from django.contrib import admin

from bennedetto.api import router
from authenticating import urls as authenticating_urls


API_URL = settings.API_URL
if API_URL.startswith('/'):
    API_URL = API_URL[1:]

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include(authenticating_urls)),
    url(r'^api-auth/', include(authenticating_urls, namespace='rest_framework')),
    url(r'^{}'.format(API_URL), include(router.urls, namespace='api')),
    url(r'^$', login_required(TemplateView.as_view(template_name='home.html')), name='home')
]
