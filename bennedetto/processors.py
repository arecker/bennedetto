from django.conf import settings


def constants(request):
    '''
    injects certain constants form settings module
    into template context
    '''
    return {'DEBUG': settings.DEBUG,
            'API_URL': settings.API_URL,
            'STATIC_URL': settings.STATIC_URL,
            'VERSION': settings.VERSION}
