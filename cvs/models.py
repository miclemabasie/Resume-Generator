from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator

User = get_user_model()


class CV(models.Model):
    user = models.ForeignKey(User, related_name="cvs", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("CV Name"), max_length=50)
    template_used = models.CharField(
        verbose_name=_("Current Template"), max_length=50, blank=True, null=True
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class PersonalInfomation(models.Model):
    cv = models.ForeignKey(CV, related_name="profile", on_delete=models.CASCADE)
    first_name = models.CharField(verbose_name=_("First Name"), max_length=255)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=255)
    image = models.ImageField(verbose_name=_("Image"), upload_to="images")
    bio = models.TextField(verbose_name=_("Bio"))
    dob = models.DateTimeField(verbose_name=_("Date Of Birth"))
    location = models.CharField(verbose_name=_("Location"), max_length=100)
    pob = models.CharField(verbose_name=("Place of Birht"), max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


class Education(models.Model):
    cv = models.ForeignKey(CV, related_name="education", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Name"), max_length=50)
    start = models.DateTimeField(verbose_name=_("Start"))
    end = models.DateTimeField(verbose_name=_("End"))
    institution = models.CharField(verbose_name=_("Institution"), max_length=200)


class Experience(models.Model):
    cv = models.ForeignKey(CV, related_name="experiences", on_delete=models.CASCADE)
    title = models.CharField(verbose_name=_("title"), max_length=200)
    start = models.DateTimeField(verbose_name=_("Start"))
    end = models.DateTimeField(verbose_name=_("End"))
    company = models.CharField(
        verbose_name=_("Company"), max_length=50, null=True, blank=True
    )
    role = models.CharField(
        verbose_name=_("Role"), max_length=50, null=True, blank=True
    )


class Skill(models.Model):
    cv = models.ForeignKey(CV, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Skill Name"), max_length=100)
    level = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )


class Language(models.Model):
    cv = models.ForeignKey(CV, related_name="languages", on_delete=models.CASCADE)
    lang_name = models.CharField(verbose_name=_("Language"), max_length=100)
    level = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )


class Contact(models.Model):
    cv = models.ForeignKey(CV, related_name="contact", on_delete=models.CASCADE)
    email = models.EmailField(verbose_name=_("Email"))
    phone = models.CharField(verbose_name=_("Phone"), max_length=20)
    links = models.CharField(verbose_name=_("Links"), max_length=200)


class Project(models.Model):
    cv = models.ForeignKey(CV, related_name="projects", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Project Name"), max_length=100)
    link = models.CharField(verbose_name=_("Link"), max_length=100)
    description = models.TextField(
        verbose_name=_("Describe your project"), null=True, blank=True
    )


class Achievement(models.Model):
    cv = models.ForeignKey(CV, related_name="achievements", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Achievement"), max_length=100)
    description = models.TextField(
        verbose_name=_("Describe your achievement"), null=True, blank=True
    )
