from django.conf import settings


def constants(request):
    '''
    injects certain constants form settings module
    into template context
    '''
    return {'DEBUG': settings.DEBUG,
            'DOMAIN': settings.DOMAIN,
            'API_URL': settings.API_URL,
            'STATIC_URL': settings.STATIC_URL}
