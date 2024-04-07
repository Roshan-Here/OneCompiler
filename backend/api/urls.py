from .views import (
    getRoutes,
    GetRunCode,
    CreateSaveLink,
    SaveLinkList,
    RetriveSaveLink,
    DeleteSaveLink
    )

from django.urls import path


urlpatterns = [
    path("", getRoutes, name="sample-check"),
    path("run/", GetRunCode.as_view(), name="sample-run-code"),
    path("savecode/", CreateSaveLink.as_view(), name="save-code-link"),
    path("viewsavedcode/",SaveLinkList.as_view(), name="view-all-savedcode"),
    path("savecode/<unique_link>", RetriveSaveLink.as_view(), name="save-code-link"),
    path("savecode/<unique_link>/delete", DeleteSaveLink.as_view(), name="delete-save-code"),
]
