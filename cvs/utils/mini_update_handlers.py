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

# function to clean empty fields 
def clean_data_exps(data):
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
    start = None
    end = None
    print("data for creating", data)
    title = data["title"]
    company = data["company"]
    if data["start"] != "":
        start = data['start']
    if data["end"] != "":
        end = data["end"]
    description = data["description"]

    if start and end:
        exp = Experience.objects.create(cv=cv, title=title, company=company, start=start, end=end, description=description)
    else: 
        exp = Experience.objects.create(cv=cv, title=title, company=company, description=description)

    

    exp.save()
    return True


def clean_data_education(data):

    result = []
    for i in range(len(data)):
        # print(data[i]["title"]) 
        # print([data][i]["company"])
        if(data[i]["name"] == "" and data[i]["major"] == ""):
            pass
        else:
            result.append(data[i])
    return result


def min_update_education(education, data):
    education.name = data["name"]
    education.major = data["major"]
    if data["start"] != "":
        education.start = data['start']
    if data["end"] != "":
        education.end = data["end"]
    education.institution = data["institution"]
    education.description = data["description"]

    education.save()
    # print("updated",  education)
    return True

def min_create_education(data, cv):
    start = None
    end = None
    print("data for creating", data)
    name = data["name"]
    major = data["major"]
    if data["start"] != "":
        start = data['start']
    if data["end"] != "":
        end = data["end"]
    institution = data["institution"]
    description = data["description"]

    if start and end:
        education = Education.objects.create(cv=cv, name=name, major=major, start=start, end=end, institution=institution, description=description)
    else:
        education = Education.objects.create(cv=cv, name=name, major=major, institution=institution, description=description)
    
    education.save()
    return True


# Achievements
def clean_data_achievement(data):
    result = []
    for i in range(len(data)):
        if(data[i]["name"] == "" and data[i]["description"] == ""):
            pass
        else:
            result.append(data[i])
    if len(result) > 0:
        return result
    else: 
        return None


def min_update_achievement(achievement, data):
    achievement.name = data["name"]
    achievement.link = data["link"]
    # if data["date"] != "":
    #     achievement.start = data['date']
    achievement.organization = data["organization"]
    achievement.description = data["description"]

    achievement.save()
    # print("updated",  education)
    return True

def min_create_achievement(data, cv):
    date = None
    print("data for creating", data)
    name = data["name"]
    date = data["date"]
    organization = data["organization"]
    description = data["description"]
    if date:
        achievement = Achievement.objects.create(cv=cv, name=name, date=date, organization=organization, description=description)
    else:
        achievement = Achievement.objects.create(cv=cv, name=name, organization=organization, description=description)
    
    achievement.save()
    return True

# Languages
def clean_data_language(data):
    result = []
    for i in range(len(data)):
        if(data[i]["name"] == ""):
            pass
        else:
            result.append(data[i])
    if len(result) > 0:
        return result
    else: 
        return None


def min_update_language(language, data):
    language.name = data["name"]
    language.level = data["level"]
    

    language.save()
    # print("updated",  education)
    return True

def min_create_language(data, cv):
    print("data for creating", data)
    name = data["name"]
    level = data["level"]
   
    language = Language.objects.create(cv=cv, name=name, level=level)

    language.save()
    return True

# Skill
def clean_data_skill(data):
    result = []
    for i in range(len(data)):
        if(data[i]["name"] == ""):
            pass
        else:
            result.append(data[i])
    if len(result) > 0:
        return result
    else: 
        return None


def min_update_skill(skill, data):
    skill.name = data["name"]
    skill.level = data["level"]
    

    skill.save()
    # print("updated",  education)
    return True

def min_create_skill(data, cv):
    print("data for creating", data)
    name = data["name"]
    level = data["level"]
   
    skill = Skill.objects.create(cv=cv, name=name, level=level)

    skill.save()
    return True