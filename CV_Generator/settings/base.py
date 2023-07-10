from pathlib import Path

import environ

import os

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# False if not in os.environ because of casting above
# DEBUG = env("DEBUG")
DEBUG = True
# Raises Django's ImproperlyConfigured
# exception if SECRET_KEY not in os.environ
# SECRET_KEY = env("SECRET_KEY")
SECRET_KEY = "dkalfjalkdsjfalksdjflkasjdflkasjdfkl;ajsdfl;kasjdflka;j"


ALLOWED_HOSTS = ["localhost", "abasie.pythonanywhere.com"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Application definition

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.sites",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]


LOCAL_APPS = ["users.apps.UsersConfig", "cvs.apps.CvsConfig"]

THIRD_PARTY_APPS = [
    "crispy_forms",
    "crispy_bootstrap5",
    "django_extensions",
    "rest_framework",
    # allauth authentication apps
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    # allauth providers
    "allauth.socialaccount.providers.google",
]

CRISPY_TEMPLATE_PACK = "bootstrap5"
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

SITE_ID = 1
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = "email"
CCOUNT_LOGOUT_REDIRECT_URL = "/"
AUTH_USER_MODEL = "users.User"
ACCOUNT_UNIQUE_EMAIL = True
TEMPLATE_DIRS = [BASE_DIR / "templates/account"]
LOGIN_REDIRECT_URL = "/"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "CV_Generator.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    "django.contrib.auth.backends.ModelBackend",
    # `allauth` specific authentication methods, such as login by e-mail
    "allauth.account.auth_backends.AuthenticationBackend",
]

WSGI_APPLICATION = "CV_Generator.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")


MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# import logging
# import logging.config
# from django.utils.log import DEFAULT_LOGGING

# logger = logging.getLogger(__name__)

# LOG_LEVEL = "INFO"

# logging.config.dictConfig(
#     {
#         "version": 1,
#         "disable_existing_loggers": False,
#         "formatters": {
#             "console": {
#                 "format": "%(asctime)s %(name)-12s %(levelname)-8s %(message)s"
#             },
#             "file": {"format": "%(asctime)s %(name)-12s %(levelname)-8s %(message)s"},
#             "django.server": DEFAULT_LOGGING["formatters"]["django.server"],
#         },
#         "handlers": {
#             "console": {
#                 "class": "logging.StreamHandler",
#                 "formatter": "console",
#             },
#             "file": {
#                 "level": "INFO",
#                 "class": "logging.FileHandler",
#                 "formatter": "file",
#                 "filename": "cv_logs/cv.log",
#             },
#             "django.server": DEFAULT_LOGGING["handlers"]["django.server"],
#         },
#         "loggers": {
#             "": {"level": "INFO", "handlers": ["console", "file"], "propagate": False},
#             "apps": {"level": "INFO", "handlers": ["console"], "propagate": False},
#             "django.server": DEFAULT_LOGGING["loggers"]["django.server"],
#         },
#     }
# )
