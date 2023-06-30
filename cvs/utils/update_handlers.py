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
from cvs.utils.cv_handles import *



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


def update_experience(data, cv, user):
    # Get Experience obj for this user_cv
    print("Data from javascrip")
    experience_obj = Experience.objects.filter(cv__user=user)
    cleaned_data = clean_data(data)

    # get the len of the two datasets (Database and Javascript)
    update_data_len = len(cleaned_data)
    current_data_len = len(experience_obj)

    print(update_data_len, current_data_len)

    # if update_data_len < current_data_len => means user has removed some experiecnes
    if update_data_len == current_data_len:
        for i in range(update_data_len):
            min_update_exp(experience_obj[i], cleaned_data[i])
    elif update_data_len > current_data_len:
        print("########################")
        print("The len of javascript is greated than that of django")
        for i in range(update_data_len):
            if i < current_data_len:
                print("this is i", i, "this is curent lent", current_data_len)
                print("updatin data insteat")
                # min_update_exp(experience_obj[i], cleaned_data[i])
                print("########################")
            else:
                print("creating data instead")
                # print("data for real creating d", cleaned_data[i])
                min_create_exp(cleaned_data[i], cv)
                print("#####################")


    elif update_data_len < current_data_len:
        # Some of the experiences have been removed
        # update the ones left
        for i in range(current_data_len):
            print("django >>>>>>>>> js")
            if i < update_data_len:
                min_update_exp(experience_obj[i], cleaned_data[i])
            else:
                experience_obj[i].delete()

    return True


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


# function to clean empty fields 
def clean_data(data):
    # data.reverse()
    # print("data inside cleaning function ", data)

    result = []
    for i in range(len(data)):
        # print(data[i]["title"]) 
        # print([data][i]["company"])
        if(data[i]["title"] == "" and data[i]["company"] == ""):
            pass
        else:
            result.append(data[i])
    return result

def min_update_exp(exp, data):
    exp.title = data["title"]
    exp.company = data["company"]
    if data["start"] != "":
        exp.start = data['start']
    if data["end"] != "":
        exp.end = data["end"]

    exp.description = data["description"]

    exp.save()
    # print("updated", exp)
    return True

def min_create_exp(data, cv):
    print("data for creating", data)
    title = data["title"]
    company = data["company"]
    if data["start"] != "":
        start = data['start']
    if data["end"] != "":
        end = data["end"]
    description = data["description"]

    exp = Experience.objects.create(cv=cv, title=title, company=company, start=start, end=end, description=description)

    exp.save()
    return True


