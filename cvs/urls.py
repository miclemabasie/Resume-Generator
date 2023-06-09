from django.urls import path
from . import views

app_name = "cvs"


urlpatterns = [
    path("", views.home, name="home"),
    path("profile/", views.profile_view, name="profile"),
    path("create-cv/<int:template_id>/", views.create_cv, name="create-cv"),
    path("generate-cv/", views.generate_cv, name="generate-cv"),
    path("download-cv/", views.download_pdf, name="download-cv"),
]
