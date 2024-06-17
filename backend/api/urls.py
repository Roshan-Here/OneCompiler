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
    # DestroyAllProblemData,
    # BlogListView,
    # BlogDeleteView,
    UserRegisterView,
    LoginView,
    UserProfileView,
    UserProfileUpdateView,
    UserProfileViewWithoutJWT,
    UserSpecialFieldUpdater,
    UserRequiedFieldsUpdateView,
    UserProfileDelete
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
    path("probleminimum", RetriveAllMinProblemData.as_view(), name="retive-all-problme-data"),
    path("problem/<slug:slug>/", RetriveIndividalProblemData.as_view(), name="retrive-individual-problem-data-using-id"),
    path("problemsmall/", RetriveAllProblemData.as_view(), name="problem-for-all-table"),
    # path("problemdeleteall", DestroyAllProblemData.as_view(), name="delete-all-problem-code"),
    # path("blog/",BlogListView.as_view(), name="create-list-blog"),
    # path("blog/delete/<int:pk>/", BlogDeleteView.as_view(), name="delete-blog"),
    path('register/',UserRegisterView.as_view(),name='user-account-register'),
    path('login/',LoginView.as_view(), name='login-view'),
    path('profile/',UserProfileView.as_view(), name='user-profile-view'),
    path("profile/score/update", UserSpecialFieldUpdater.as_view(), name="user-score-solvedlist-updater"),
    path('profile/update/',UserRequiedFieldsUpdateView.as_view(), name='user-profile-update'),
    path('profile/delete/',UserProfileDelete.as_view(), name='user-profile-delete'),
    path("user/<slug:username>", UserProfileViewWithoutJWT.as_view(), name="user-profile-without-jwt")
]


# Commented items not using in this Version 1