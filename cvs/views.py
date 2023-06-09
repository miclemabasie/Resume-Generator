import json
from cvs.utils.cv_handles import *
from cvs.utils.update_handlers import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
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
from .serializers import CVModelSerializer
import os
from django.conf import settings
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.contrib.staticfiles import finders
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
    # Check if javascript is requesting for user CV data
    if request.GET.get("data"):
        # Get the users data
        user_cv = CV.objects.filter(user=user).last()
        serializer = CVModelSerializer(user_cv)
        # return the results to javascript
        return JsonResponse(serializer.data)
        # return JsonResponse({"data": "User data for editing"})
    profile = Profile.objects.get(user=user)
    template_name = "cvs/create.html"
    try:
        user_cv = CV.objects.filter(user=user).last()
    except CV.DoesNotExist:
        user_cv = None

    context = {
        "username": user.username,
        "user_id": str(user.id)[-12:],
        "section": "create",
        "template_id": template_id,
    }
    # if user_cv update the context
    # to help javascript know if it should request for user data
    if user_cv:
        context["user_cv"] = True
    return render(request, template_name, context)


@login_required
@csrf_exempt
def generate_cv(request):
    user = request.user
    profile = Profile.objects.get(user=user)

    if request.method == "POST":
        # try to get cv from database
        data = json.loads(request.body)
        # Extract the data coming from the fetch API
        personalinfo = data["PersonalInfo"]
        education_info = data["Education"]
        experience_info = data["Experience"]
        skills_info = data["Skills"]
        # projects_info = data["Projects"]
        achievements_info = data["Achievements"]
        language_info = data["Languages"]
        contact_info = data["Contact"]
        # Get the CV associated to the current logged in user
        user_cv = CV.objects.filter(name=data["cvName"]).first()
        print(user_cv)
        if user_cv:
            print("There is a CV for this user, we need updates only")
            print(education_info)
            # Run update routine functions
            update_personalInfo(personalinfo, user_cv)
            update_education(education_info, user_cv, user)
            update_experience(experience_info, user_cv, user)
            update_achieve(achievements_info, user_cv, user)
            update_skills(skills_info, user_cv, user)
            # update_project(projects_info, user_cv)
            update_language(language_info, user_cv, user)
            return JsonResponse({"message": "succesfully updated"})
            # return HttpResponseRedirect("/download-cv/")

        else:
            print("New instance of cv creation")
            cv = CV.objects.create(user=user, name=data["cvName"])
            create_personalInfo(personalinfo, cv)
            update_education(education_info, cv, user)
            update_experience(experience_info, cv, user)
            update_achieve(achievements_info, cv, user)
            update_skills(skills_info, cv, user)
            update_language(language_info, cv, user)
            return JsonResponse({"message": "successfully created"})
            # return HttpResponseRedirect("/download-cv")


@login_required
def download_pdf(request):
    print(request.GET)
    template_path = "pdf_templates/template_1.html"
    user = request.user
    personalInfo = PersonalInfomation.objects.get(cv__user=user)
    experienceInfo = Experience.objects.filter(cv__user=user)
    educationInfo = Education.objects.filter(cv__user=user)
    languageInfo = Language.objects.filter(cv__user=user)
    skillInfo = Skill.objects.filter(cv__user=user)
    achievementInfo = Achievement.objects.filter(cv__user=user)
    profile = Profile.objects.filter(user=user).first()
    

    pdf_data = {"pinfo": personalInfo, "expinfo": experienceInfo, "eduInfo": educationInfo, "langInfo": languageInfo, "skillInfo": skillInfo, "achInfo": achievementInfo, "profile": profile}
    context = {"data": pdf_data}
    cv_name = f"{user.username}-cv"
    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type="application/pdf")
    if request.GET.get("preview"):
        response["Content-Disposition"] = f'filename="{cv_name}.pdf"'
    else:
        response['Content-Disposition'] = f'attachment; filename="{cv_name}.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)
    print(personalInfo.headline)
    # create a pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    # if error then show some funny view
    if pisa_status.err:
        return HttpResponse("We had some errors <pre>" + html + "</pre>")
    return response
