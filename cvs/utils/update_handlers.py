from ..models import (
    CV,
    Profile,
    PersonalInfomation,
    Education,
    Experience,
    Skill,
    Language,
    Contact,
    Achievement,
    Project,
)


def update_personalInfo(data, user_cv):
    # Get the personal info associated with this CV
    personal_info_obj = PersonalInfomation.objects.get(cv=user_cv)
    # Update individual objects in that instance
    personal_info_obj.firstName = data["firstName"]
    personal_info_obj.lastName = data["lastName"]
    personal_info_obj.image = data.get("image")
    personal_info_obj.headline = data["headline"]
    personal_info_obj.summary = data.get("summary") or ""
    personal_info_obj.location = data["location"]
    personal_info_obj.pob = data["pob"]
    personal_info_obj.dob = data["dob"]
    personal_info_obj.phone = data["phone"]
    personal_info_obj.email = data["email"]

    personal_info_obj.save()
    return None


def update_education(data, user_cv):
    # Get the education models related to this CV
    education_obj = Education.objects.filter(cv=user_cv).first()
    # udate individual data of this instance
    education_obj.name = data["name"]
    education_obj.major = data["major"]
    education_obj.description = data["description"]
    if data["start"] != "":
        education_obj.start = data["start"]
    if data["end"] != "":
        education_obj.end = data["end"]
    education_obj.institution = data["institution"]

    education_obj.save()
    return None


def update_experience(data, user_cv):
    # Get Experience obj for this user_cv
    experience_obj = Experience.objects.filter(cv=user_cv).first()
    # Update data
    experience_obj.title = data["title"]
    experience_obj.role = data["role"]
    experience_obj.company = data["company"]
    if data["start"] != "":
        experience_obj.start = data["start"]
    if data["end"] != "":
        experience_obj.end = data["end"]
    experience_obj.description = data["description"]

    experience_obj.save()
    return None


def update_skills(data, user_cv):
    # Get the skill_ob for this cv obj
    skill_obj = Skill.objects.get(cv=user_cv)
    # udate data for skill_obj
    skill_obj.name = data["name"]
    skill_obj.level = int(data["level"])


def update_language(data, user_cv):
    # get Language object for this user CV
    language_obj = Language.objects.get(cv=user_cv)
    # udate language obj data
    language_obj.lang_name = data["lang_name"]
    language_obj.level = data["level"]


def update_project(data, user_cv):
    # get project obj for this user CV
    project_obj = Project.objects.get(cv=user_cv)
    # udate project obj data
    project_obj.name = data["name"]
    project_obj.description = data["description"]
    project_obj.link = data["link"]

    project_obj.save()
    return None


def update_achieve(data, user_cv):
    # Get ach for this user_cv
    ach_obj = Achievement.objects.get(cv=user_cv)
    # Update data for arc_obj
    ach_obj.name = data["name"]
    if data["date"] != "":
        ach_obj.date = data["date"]
    ach_obj.description = data["description"]
    ach_obj.organization = data["organization"]
    ach_obj.link = data["link"]

    ach_obj.save()
    return None


def update_contact(data, user_cv):
    # Get contact_obj for this user_cv
    contact_obj = Contact.objects.get(cv=user_cv)
    # udate data
    contact_obj.linkedin = data["linkedin"]
    contact_obj.github = data["github"]
    contact_obj.website = data["website"]
    contact_obj.links = data["others"]

    contact_obj.save()
    return None
