from ..models import CV, Profile, PersonalInfomation, Education, Experience, Skill, Language, Contact, Achievement, Project


def create_personalInfo(data, cv):
    print(data)
    first_name = data["firstName"]
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
    personal_obj.save()
    return None



def create_education(data):
    print(data)

def create_experience(data, cv):
    print(data)

def create_skills(data, cv):
    pass

def create_language(data, cv):
    pass

def create_project(data, cv):
    pass

def create_achieve(data, cv):
    pass