from django.contrib import admin
from django.contrib.auth.models import Group

from authenticating.models import User, Membership, Family


class MembershipInlineAdmin(admin.TabularInline):
    model = Membership


class UserAdmin(admin.ModelAdmin):
    inlines = [MembershipInlineAdmin]

    class Meta:
        model = User


class FamilyAdmin(admin.ModelAdmin):
    class Meta:
        model = Family


admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
admin.site.register(Family, FamilyAdmin)
