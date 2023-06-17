from django.contrib import admin
from .models import (
    CV,
    Profile,
    PersonalInfomation,
    Education,
    Experience,
    Skill,
    Language,
    Contact,
    Project,
    Achievement,
)


class EducationInline(admin.TabularInline):
    model = Education
    extra = 2  # displays only one extra form
    fields = ["name", "major", "institution", "start", "end"]
    # readonly_fields = ["created_at"]
    verbose_name_plural = "Educational Background"
    can_delete = False


class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 2  # displays only one extra form
    fields = ["title", "description", "start", "end", "company", "role"]
    verbose_name_plural = "Experiences"
    can_delete = False


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 2  # displays only one extra form
    fields = ["name", "level"]
    verbose_name_plural = "Skills"
    can_delete = False


class LanguageInline(admin.TabularInline):
    model = Language
    extra = 2  # displays only one extra form
    fields = ["lang_name", "level"]
    verbose_name_plural = "Languages"
    can_delete = False


class ContactInline(admin.TabularInline):
    model = Contact
    extra = 2  # displays only one extra form
    fields = ["linkedin", "github", "website", "links"]
    verbose_name_plural = "Contact Info"
    can_delete = False


class ProjectInline(admin.TabularInline):
    model = Project
    extra = 2  # displays only one extra form
    fields = ["name", "link", "description"]
    verbose_name_plural = "Projects"
    can_delete = False


class AchievementInline(admin.TabularInline):
    model = Achievement
    extra = 1  # displays only one extra form
    fields = ["name", "date", "organization", "description"]
    verbose_name_plural = "Your Achievements"
    can_delete = False


class PersonalInfomationInline(admin.TabularInline):
    model = PersonalInfomation
    extra = 1  # displays only one extra form
    fields = ["first_name", "last_name", "summary", "dob", "location", "pob"]
    verbose_name_plural = "Personal Information"
    can_delete = False


class CVAdmin(admin.ModelAdmin):
    inlines = [
        EducationInline,
        ExperienceInline,
        SkillInline,
        LanguageInline,
        ContactInline,
        AchievementInline,
        PersonalInfomationInline,
    ]


admin.site.register(CV, CVAdmin)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "phone", "cv"]
