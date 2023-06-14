import json
from cvs.utils.cv_handles import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import (
    CV,
    Profile,
    PersonalInfomation,
    Education,
    Experience,
    Skill,
    Language,
    Contact,
    Project,
    Achievement,
)
from django.contrib.auth.decorators import login_required


def home(request):
    template_name = "home.html"

    context = {
        "section": "home",
    }
    return render(request, template_name, context)


@login_required
def profile_view(request):
    user = request.user
    # get user's profile
    profile = get_object_or_404(Profile, user=user)

    context = {
        "profile": profile,
        "user": user,
    }
    template_name = "cvs/profile.html"

    return render(request, template_name, context)


@login_required
def create_cv(request, template_id=None):
    user = request.user
    profile = Profile.objects.get(user=user)
    template_name = "cvs/create.html"
    context = {
        "section": "create",
        "template_id": template_id,
    }
    return render(request, template_name, context)


@login_required
@csrf_exempt
def generate_cv(request):
    user = request.user
    profile = Profile.objects.get(user=user)

    if request.method == "POST":
        data = json.loads(request.body)
        personalinfo = data["PersonalInfo"]
        education_info = data["Education"]
        experience_info = data["Education"]
        skills_info = data["Education"]
        education_info = data["Education"]
        projects_info = data["Education"]
        achievements_info = data["Education"]
        Language_info = data["Education"]
        create_personalInfo(personalinfo)
        create_education()
        return JsonResponse({"message": "OK"})
   