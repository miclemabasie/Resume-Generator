from django.contrib import admin
from .models import (
    CV,
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
    fields = ["name", "institution", "start", "end"]
    # readonly_fields = ["created_at"]
    verbose_name_plural = "Educational Background"
    can_delete = False


class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 2  # displays only one extra form
    fields = ["title", "start", "end", "company", "role"]
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
    fields = ["email", "phone", "links"]
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
    fields = ["name", "description"]
    verbose_name_plural = "Educational Background"
    can_delete = False


class CVAdmin(admin.ModelAdmin):
    inlines = [
        EducationInline,
        ExperienceInline,
        SkillInline,
        LanguageInline,
        ContactInline,
        AchievementInline,
    ]


admin.site.register(CV, CVAdmin)


@admin.register(PersonalInfomation)
class PersonalInfomationAdmin(admin.ModelAdmin):
    list_display = ["first_name", "last_name", "image", "dob", "location", "pob"]
