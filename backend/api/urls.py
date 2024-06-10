from .views import (
    getRoutes,
    GetRunCode,
    CreateSaveLink,
    SaveLinkList,
    RetriveSaveLink,
    DeleteSaveLink,
    DestroyAllSavedData,
    # ProblemCreate, #not using due to no manual problem creation is adding, maybe latter.
    RetriveAllProblemData,
    RetriveAllMinProblemData,
    RetriveIndividalProblemData,
    DestroyAllProblemData,
    BlogListView,
    BlogDeleteView,
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
    # path("problem/", ProblemCreate.as_view(), name="problem-create-load-problme"),
    path("probleminimum", RetriveAllMinProblemData.as_view(), name="retive-all-problme-data"),
    path("problem/<int:id>/", RetriveIndividalProblemData.as_view(), name="retrive-individual-problem-data-using-id"),
    path("problemsmall/", RetriveAllProblemData.as_view(), name="problem-for-all-table"),
    path("problemdeleteall", DestroyAllProblemData.as_view(), name="delete-all-problem-code"),
    path("blog/",BlogListView.as_view(), name="create-list-blog"),
    path("blog/delete/<int:pk>/", BlogDeleteView.as_view(), name="delete-blog")
]
