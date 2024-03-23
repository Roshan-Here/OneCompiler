from .views import (
    getRoutes,
    GetRunCode,
    )

from django.urls import path


urlpatterns = [
    path("", getRoutes, name="sample-check"),
    path("run/", GetRunCode.as_view(), name="sample-run-code"),
]
