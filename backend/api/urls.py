from .views import (
    getRoutes,
    GetRunCode,
    CreateSaveLink
    )

from django.urls import path


urlpatterns = [
    path("", getRoutes, name="sample-check"),
    path("run/", GetRunCode.as_view(), name="sample-run-code"),
    path("savecode/", CreateSaveLink.as_view(), name="save-code-link")
]
