class TimeZoneMiddleware(object):
    def process_request(self, request):
        request.user.activate_timezone()
