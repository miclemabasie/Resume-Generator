from django.shortcuts import render, get_object_or_404
from .models import (
    CV,
    PersonalInfomation,
    Education,
    Experience,
    Skill,
    Language,
    Contact,
    Project,
    Achievement,
)


def home(request):
    template_name = "home.html"

    context = {
        "section": "home",
    }
    return render(request, template_name, context)
