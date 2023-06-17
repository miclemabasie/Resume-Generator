from ..models import CV, Profile, PersonalInfomation, Education, Experience, Skill, Language, Contact, Achievement, Project


def update_personalInfo(data, object):
    datafirst_name = data["firstName"]
    last_name = data["lastName"]
    image = data.get("image")
    headline = data["headline"]
    bio = data.get("summary") or ""
    location = data["location"]
    pob = data["pob"]
    dob = data["dob"]
    phone = data["phone"]
    email = data["email"]


    personal_obj = PersonalInfomation.objects.create(cv=cv, first_name=first_name, last_name=last_name, image=image, bio=bio, dob=dob, pob=pob, location=location, headline=headline, phone=phone, email=email)
    # personal_obj.save()
    return personal_obj



def update_education(data):
    print(data)

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