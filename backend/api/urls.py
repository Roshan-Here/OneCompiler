from .views import (
    getRoutes,
    GetRunCode,
    CreateSaveLink,
    SaveLinkList,
    RetriveSaveLink,
    DeleteSaveLink,
    DestroyAllSavedData,
    ProblemCreate,
    RetriveProblemSmallData,
    BlogListView,
    BlogDeleteView
    )

from django.urls import path

urlpatterns = [
    path("", getRoutes, name="sample-check"),
    path("run/", GetRunCode.as_view(), name="sample-run-code"),
    path("savecode/", CreateSaveLink.as_view(), name="save-code-link"),
    path("viewsavedcode/",SaveLinkList.as_view(), name="view-all-savedcode"),
    path("savecode/<unique_link>", RetriveSaveLink.as_view(), name="save-code-link"),
    path("savecode/<unique_link>/delete", DeleteSaveLink.as_view(), name="delete-save-code"),
    path("savecodedeleteall", DestroyAllSavedData.as_view(), name="delete-all-save-code"),
    path("problem/", ProblemCreate.as_view(), name="problem-create"),
    path("problemsmall/", RetriveProblemSmallData.as_view(), name="problem-for-listing-table"),
    path("blog/",BlogListView.as_view(), name="create-list-blog"),
    path("blog/delete/<int:pk>/", BlogDeleteView.as_view(), name="delete-blog")
]
