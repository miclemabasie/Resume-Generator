from ..models import CV, Profile, PersonalInfomation, Education, Experience, Skill, Language, Contact, Achievement, Project


def update_personalInfo(data, user_cv):
    # Get the personal info associated with this CV
    personal_info_obj = PersonalInfomation.objects.get(cv=user_cv)
    # Update individual objects in that instance
    personal_info_obj.first_name = data["firstName"]
    personal_info_obj.last_name = data["lastName"]
    personal_info_obj.image = data.get("image")
    personal_info_obj.headline = data["headline"]
    personal_info_obj.bio = data.get("summary") or ""
    personal_info_obj.location = data["location"]
    personal_info_obj.pob = data["pob"]
    personal_info_obj.dob = data["dob"]
    personal_info_obj.phone = data["phone"]
    personal_info_obj.email = data["email"]

    personal_info_obj.save()
    return None



def update_education(data, user_cv):
    # Get the education models related to this CV
    education_obj = Education.objects.get(cv=cv)
    # udate individual data of this instance
    education_obj.name = data["title"]
    education_obj.start = data["start"]
    education_obj.end = data["end"]
    education_obj.institution = data["institution"]

def update_experience(data, cv):
    print(data)

def update_skills(data, cv):
    pass

def update_language(data, cv):
    pass

def update_project(data, cv):
    pass

def update_achieve(data, cv):
    pass