import os

THIS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.join(THIS_DIR, '..')

INSTALLED_APPS = (
    # 3rd party admin apps
    'flat',

    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 3rd party apps
    'compressor',
    'rest_framework',
    'timezone_field',

    # Project apps
    'authenticating',
    'tracking',
    'reporting'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'bennedetto.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # custom
                'bennedetto.processors.constants'
            ],
        },
    },
]

WSGI_APPLICATION = 'bennedetto.wsgi.application'


LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

API_URL = '/api/'
STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(BASE_DIR, 'prod_static')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

AUTH_USER_MODEL = 'authenticating.User'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

try:
    suffix = ''
    version = '0.0'

    with open(os.path.join(BASE_DIR, 'CHANGELOG.md')) as f:
        import re

        reUnreleased = re.compile('^## Unreleased$')
        reVersion = re.compile('^## ([0-9].*) -')

        for line in f:
            if reUnreleased.match(line):
                suffix = '-Unreleased'
            m = reVersion.match(line)
            if m:
                version = m.group(1)
    VERSION = 'v%s%s' % (version, suffix)
except Exception as e:
    print('Could not determine version')
    VERSION = 'v0.0'
