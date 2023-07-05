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

    def get_exp(self):
        experiences = []
        for exp in self.experiences.all():
            experiences.append(exp)
        
        return exp


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    image = models.ImageField(upload_to="profile")
    phone = models.CharField(max_length=20)
    cv = models.ForeignKey(
        CV, related_name="prifile", on_delete=models.SET_NULL, null=True, blank=True
    )


class PersonalInfomation(models.Model):
    cv = models.OneToOneField(
        CV, related_name="personal_info", on_delete=models.CASCADE
    )
    firstName = models.CharField(verbose_name=_("First Name"), max_length=255)
    lastName = models.CharField(verbose_name=_("Last Name"), max_length=255)
    image = models.ImageField(verbose_name=_("Image"), upload_to="images")
    summary = models.CharField(
        verbose_name=_("Bio"), max_length=300, blank=True, null=True
    )
    dob = models.DateTimeField(verbose_name=_("Date Of Birth"))
    location = models.CharField(verbose_name=_("Location"), max_length=100)
    headline = models.CharField(verbose_name=_("Headline"), max_length=100)
    pob = models.CharField(verbose_name=("Place of Birht"), max_length=200)
    phone = models.CharField(
        max_length=20, verbose_name=_("Phone"), null=True, blank=True
    )
    email = models.EmailField(verbose_name=_("Email"), null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def get_valid_dob_format(self):
        dob = self.dob.strftime("%Y:%m:%d")
        dob = dob.split(':')
        dob = "-".join(dob)
        return f"00{dob}"


class Education(models.Model):
    cv = models.ForeignKey(CV, related_name="education", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Name"), max_length=50)
    start = models.DateTimeField(verbose_name=_("Start"))
    end = models.DateTimeField(verbose_name=_("End"))
    major = models.CharField(
        verbose_name=_("Major"), max_length=100, blank=True, null=True
    )
    institution = models.CharField(verbose_name=_("Institution"), max_length=200)
    description = models.CharField(
        verbose_name=_("Description"), max_length=300, blank=True, null=True
    )

    # return a valid date to javascript
    def get_valid_start_format(self):
        start = self.start.strftime("%Y:%m:%d")
        start = start.split(':')
        start = "-".join(start)
        return f"00{start}"

    def get_valid_end_format(self):
        end = self.end.strftime("%Y:%m:%d")
        end = end.split(':')
        end = "-".join(end)
        return f"00{end}"

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
    achievements = models.CharField(
        verbose_name=_("Your Achievements"), max_length=300, blank=True, null=True
    )
    description = models.CharField(
        verbose_name=_("Description"), max_length=300, blank=True, null=True
    )

    # return a valid date to javascript
    def get_valid_start_format(self):
        start = self.start.strftime("%Y:%m:%d")
        start = start.split(':')
        start = "-".join(start)
        return f"00{start}"

    def get_valid_end_format(self):
        end = self.end.strftime("%Y:%m:%d")
        end = end.split(':')
        end = "-".join(end)
        return f"00{end}"


class Skill(models.Model):
    cv = models.ForeignKey(CV, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Skill Name"), max_length=100)
    level = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )


class Language(models.Model):
    cv = models.ForeignKey(CV, related_name="languages", on_delete=models.CASCADE)
    name = models.CharField(verbose_name=_("Language"), max_length=100)
    level = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )


class Contact(models.Model):
    cv = models.ForeignKey(CV, related_name="contact", on_delete=models.CASCADE)
    linkedin = models.EmailField(verbose_name=_("LinkedIn"), blank=True, null=True)
    github = models.CharField(
        verbose_name=_("Github"), max_length=20, blank=True, null=True
    )
    website = models.CharField(
        verbose_name=_("Website"), max_length=20, blank=True, null=True
    )
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
    date = models.DateTimeField(verbose_name=_("Date"), null=True, blank=True)
    organization = models.CharField(
        verbose_name=_("Orgranization"), max_length=100, blank=True, null=True
    )
    description = models.CharField(
        verbose_name=_("Describe your achievement"),
        null=True,
        blank=True,
        max_length=300,
    )
    link = models.CharField(
        verbose_name=_("Link"), max_length=100, blank=True, null=True
    )

    def get_valid_date_format(self):
        date = self.date.strftime("%Y:%m:%d")
        date = date.split(':')
        date = "-".join(date)
        return f"00{date}"