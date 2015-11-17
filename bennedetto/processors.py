from django.conf import settings


def constants(request):
    '''
    injects certain constants form settings module
    into template context
    '''
    return {'DEBUG': settings.DEBUG}
