from rest_framework import serializers
from .models import CV, Skill, PersonalInfomation  # import your models here


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


class CVModelSerializer(serializers.ModelSerializer):
    personal_info = PersonalInfoSerializer()
    skills = SkillSerializer()

    class Meta:
        model = CV
        fields = ["name", "personal_info", "skills"]
