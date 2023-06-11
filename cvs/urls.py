from django.urls import path
from . import views

app_name = "cvs"


urlpatterns = [
    path("", views.home, name="home"),
    path("profile/", views.profile_view, name="profile"),
]
