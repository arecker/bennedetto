from django.contrib import admin
from django.contrib.auth.models import Group

from authenticating.models import User


class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = User

admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
