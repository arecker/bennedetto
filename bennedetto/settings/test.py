from bennedetto.settings.common import *

SECRET_KEY = 'raised-by-a-cuppa-coffee'

DEBUG = True
ALLOWED_HOSTS = []
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'temp', 'db.sqlite3'),
    }
}
