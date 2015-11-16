from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('authenticating.urls')),
    url(r'^$', login_required(TemplateView.as_view(template_name='home.html')), name='home')
]
