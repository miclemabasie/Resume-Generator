from rest_framework import serializers
from .models import CV, Skill, PersonalInfomation, Experience 

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfomation
        fields = [
            "firstName",
            "lastName",
            "summary",
            "dob",
            "location",
            "headline",
            "pob",
            "phone",
            "email",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name", "level"]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["title", "company", "start", "end", "description"]


class CVModelSerializer(serializers.ModelSerializer):
    personal_info = PersonalInfoSerializer()
    skills = SkillSerializer()
    experiences = ExperienceSerializer(many=True)

    class Meta:
        model = CV
        fields = ["name", "personal_info", "skills", "experiences"]
