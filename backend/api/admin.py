from django.contrib import admin
<<<<<<< HEAD
from .models import OneCode, Problem, Example

# Register your models here.

admin.site.register(OneCode)
admin.site.register(Problem)
admin.site.register(Example)
=======
from .models import OneCode, Problem, Example, UserProfile, CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

# Register your models here.

# manage.py makemigrations api
# manage.py migrate api
# manage.py migrate


class UserAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference fields on auth.User.
    list_display = ('username', 'email', 'is_active', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (_('Personal info'), {'fields': ()}),  # Add any personal fields if needed
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    search_fields = ('username', 'email')
    ordering = ('username',)
    filter_horizontal = ()


#################### Registering the models ##############

admin.site.register(CustomUser, UserAdmin)

admin.site.register(OneCode)
admin.site.register(Problem)
admin.site.register(Example)
admin.site.register(UserProfile)
>>>>>>> backend
