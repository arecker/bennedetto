try:
    from urlparse import urljoin
except ImportError:
    from urllib.parse import urljoin

from django.conf import settings


def expand_url_path(path, domain=None):
    domain = domain or settings.DOMAIN
    return urljoin('//{}'.format(domain), path)
