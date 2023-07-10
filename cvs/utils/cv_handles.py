from ..models import CV, Profile, PersonalInfomation, Education, Experience, Skill, Language, Contact, Achievement, Project


def create_personalInfo(data, cv):
    print(data)
    first_name = data["firstName"]
    last_name = data["lastName"]
    image = data.get("image")
    headline = data["headline"]
    summary = data.get("summary") or ""
    location = data["location"]
    pob = data["pob"]
    dob = data["dob"]
    phone = data["phone"]
    email = data["email"]

    if dob != "":
        personal_obj = PersonalInfomation.objects.create(cv=cv, firstName=first_name, lastName=last_name, image=image, summary=summary, dob=dob, pob=pob, location=location, headline=headline, phone=phone, email=email)
    else:
        personal_obj = PersonalInfomation.objects.create(cv=cv, firstName=first_name, lastName=last_name, image=image, summary=summary, pob=pob, location=location, headline=headline, phone=phone, email=email)
        
    personal_obj.save()
    return True



def create_education(data):
    print(data)

def create_experience(data, cv):
    # get_data 
    title = data["title"]
    role = data["role"]
    company = data["company"]
    start = data["start"]
    end = data["end"]
    description = data["description"]

    exp_obj = Experience.objects.create(cv=cv, title=title, role=role, company=company, start=start, end=end, description=description)
    exp_obj.save
    return True


def create_skills(data, cv):
    pass

def create_language(data, cv):
    pass

def create_project(data, cv):
    pass

def create_achieve(data, cv):
    pass