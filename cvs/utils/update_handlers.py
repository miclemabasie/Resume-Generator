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
from . mini_update_handlers import *


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


def update_education(data, cv, user):    
    # Get Experience obj for this user_cv
    print("Data from javascrip", data)
    education_obj = Education.objects.filter(cv__user=user)
    cleaned_data = clean_data_education(data)

    # get the len of the two datasets (Database and Javascript)
    update_data_len = len(cleaned_data)
    current_data_len = len(education_obj)

    print(update_data_len, current_data_len)

    # if update_data_len < current_data_len => means user has removed some experiecnes
    if update_data_len == current_data_len:
        for i in range(update_data_len):
            min_update_education(education_obj[i], cleaned_data[i])

    elif update_data_len > current_data_len:
        print("The len of javascript is greated than that of django")
        for i in range(update_data_len):
            if i < current_data_len:
                min_update_education(education_obj[i], cleaned_data[i])
            else:
                min_create_education(cleaned_data[i], cv)
    elif update_data_len < current_data_len:
        # Some of the experiences have been removed
        # update the ones left
        for i in range(current_data_len):
            print("django >>>>>>>>> js")
            if i < update_data_len:
                min_update_education(education_obj[i], cleaned_data[i])
            else:
                education_obj[i].delete()

    return True


def update_experience(data, cv, user):
    # Get Experience obj for this user_cv
    print("Data from javascrip")
    experience_obj = Experience.objects.filter(cv__user=user)
    cleaned_data = clean_data_exps(data)

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
                min_update_exp(experience_obj[i], cleaned_data[i])
                print("########################")
            else:
                print("creating data instead")
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


def update_skills(data, cv, user):
    # Get Skill obj for this user_cv
    print("Data from javascrip", data)
    skill_obj = Skill.objects.filter(cv__user=user)
    cleaned_data = clean_data_skill(data)

    if cleaned_data:
        print("valid skill data", data)
        # get the len of the two datasets (Database and Javascript)
        update_data_len = len(cleaned_data)
        current_data_len = len(skill_obj)

        print(update_data_len, current_data_len)

        # if update_data_len < current_data_len => means user has removed some achievements
        if update_data_len == current_data_len:
            for i in range(update_data_len):
                min_update_skill(skill_obj[i], cleaned_data[i])

        elif update_data_len > current_data_len:
            print("The len of javascript is greated than that of django")
            for i in range(update_data_len):
                if i < current_data_len:
                    min_update_skill(skill_obj[i], cleaned_data[i])
                else:
                    min_create_skill(cleaned_data[i], cv)
        elif update_data_len < current_data_len:
            # Some of the achievements have been removed
            # update the ones left
            for i in range(current_data_len):
                print("django >>>>>>>>> js")
                if i < update_data_len:
                    min_update_skill(skill_obj[i], cleaned_data[i])
                else:
                    skill_obj[i].delete()
        return True 
    else:
        print("No valid data was found on the page")
        return None  



def update_language(data, cv, user):
    # Get Language obj for this user_cv
    print("Data from javascrip", data)
    language_obj = Language.objects.filter(cv__user=user)
    cleaned_data = clean_data_language(data)

    if cleaned_data:
        print("valid lang data", data)
        # get the len of the two datasets (Database and Javascript)
        update_data_len = len(cleaned_data)
        current_data_len = len(language_obj)

        print(update_data_len, current_data_len)

        # if update_data_len < current_data_len => means user has removed some achievements
        if update_data_len == current_data_len:
            for i in range(update_data_len):
                min_update_language(language_obj[i], cleaned_data[i])

        elif update_data_len > current_data_len:
            print("The len of javascript is greated than that of django")
            for i in range(update_data_len):
                if i < current_data_len:
                    min_update_language(language_obj[i], cleaned_data[i])
                else:
                    min_create_language(cleaned_data[i], cv)
        elif update_data_len < current_data_len:
            # Some of the achievements have been removed
            # update the ones left
            for i in range(current_data_len):
                print("django >>>>>>>>> js")
                if i < update_data_len:
                    min_update_language(language_obj[i], cleaned_data[i])
                else:
                    language_obj[i].delete()
        return True 
    else:
        print("No valid data was found on the page")
        return None  

def update_project(data, user_cv):
    # get project obj for this user CV
    project_obj = Project.objects.get(cv=user_cv)
    # udate project obj data
    project_obj.name = data["name"]
    project_obj.description = data["description"]
    project_obj.link = data["link"]

    project_obj.save()
    return None


def update_achieve(data, cv, user):
   # Get Experience obj for this user_cv
    print("Data from javascrip", data)
    achievement_obj = Achievement.objects.filter(cv__user=user)
    cleaned_data = clean_data_achievement(data)

    if cleaned_data:
        print("valid ach data", data)
        # get the len of the two datasets (Database and Javascript)
        update_data_len = len(cleaned_data)
        current_data_len = len(achievement_obj)

        print(update_data_len, current_data_len)

        # if update_data_len < current_data_len => means user has removed some achievements
        if update_data_len == current_data_len:
            for i in range(update_data_len):
                min_update_achievement(achievement_obj[i], cleaned_data[i])

        elif update_data_len > current_data_len:
            print("The len of javascript is greated than that of django")
            for i in range(update_data_len):
                if i < current_data_len:
                    min_update_achievement(achievement_obj[i], cleaned_data[i])
                else:
                    min_create_achievement(cleaned_data[i], cv)
        elif update_data_len < current_data_len:
            # Some of the achievements have been removed
            # update the ones left
            for i in range(current_data_len):
                print("django >>>>>>>>> js")
                if i < update_data_len:
                    min_update_achievement(achievement_obj[i], cleaned_data[i])
                else:
                    achievement_obj[i].delete()
        return True 
    else:
        print("No valid data was found on the page")
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

