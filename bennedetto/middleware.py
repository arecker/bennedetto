class TimeZoneMiddleware(object):
    def process_request(self, request):
        try:
            request.user.activate_timezone()
        except AttributeError:
            pass
