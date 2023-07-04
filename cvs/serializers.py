from rest_framework import serializers
from .models import CV, Skill, PersonalInfomation, Experience, Education, Achievement, Language

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


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["name", "level"]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["title", "company", "start", "end", "description"]

class EducationSerializer(serializers.ModelSerializer):
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()

    def get_start(self, obj):
        return obj.get_valid_start_format()
    
    def get_end(self, obj):
        return obj.get_valid_end_format()
    class Meta:
        model = Education
        fields = ["name", "major", "start", "end", "institution", "description"]

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ["name", "date", "organization", "description", "link"]

class CVModelSerializer(serializers.ModelSerializer):
    personal_info = PersonalInfoSerializer()
    skills = SkillSerializer(many=True)
    experiences = ExperienceSerializer(many=True)
    education = EducationSerializer(many=True)
    achievements = AchievementSerializer(many=True)
    languages = LanguageSerializer(many=True)
    class Meta:
        model = CV
        fields = ["name", "achievements", "personal_info", "skills", "experiences", "education", "languages"]
