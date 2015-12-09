from django.test import SimpleTestCase

from bennedetto.utils import expand_url_path


class UtilsTestCase(SimpleTestCase):
    def test_expand_url_path(self):
        path = '/test/one/'
        domain = 'test.com:8080'

        actual = expand_url_path(path, domain=domain)
        expected = 'test.com:8080/test/one/'
        self.assertEqual(actual, expected)

        path = '/test/two/'
        domain = 'test.com'

        actual = expand_url_path(path, domain=domain)
        expected = 'test.com/test/two/'
        self.assertEqual(actual, expected)
