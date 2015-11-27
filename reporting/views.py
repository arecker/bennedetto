from rest_framework.viewsets import ViewSet
from rest_framework.response import Response


class ReportViewSet(ViewSet):
    def list(self, *args, **kwargs):
        return Response({'google': 'http://google.com'})
