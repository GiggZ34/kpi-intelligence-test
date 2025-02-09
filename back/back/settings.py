"""
Django settings for back project.

Generated by 'django-admin startproject' using Django 4.2.18.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-wcl(=0xc7hp3gw^pyt9xt*cz0hkf#r7(6__z=m4q&j!phy3@6)"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

CORS_ORIGIN_ALLOW_ALL = True

# Application definition

INSTALLED_APPS = [
	"django.contrib.admin",
	"django.contrib.auth",
	"django.contrib.contenttypes",
	"django.contrib.sessions",
	"django.contrib.messages",
	"django.contrib.staticfiles",
	"rest_framework",
	"rest_framework.authtoken",
	"django_filters",
	"corsheaders",
	"drf_spectacular",
	"drf_spectacular_sidecar",
	"silk",
	"back",
	"api",
]

MIDDLEWARE = [
	"corsheaders.middleware.CorsMiddleware",
	"django.middleware.security.SecurityMiddleware",
	"django.contrib.sessions.middleware.SessionMiddleware",
	"django.middleware.common.CommonMiddleware",
	"django.middleware.csrf.CsrfViewMiddleware",
	"django.contrib.auth.middleware.AuthenticationMiddleware",
	"django.contrib.messages.middleware.MessageMiddleware",
	"django.middleware.clickjacking.XFrameOptionsMiddleware",
	"silk.middleware.SilkyMiddleware",
]

ROOT_URLCONF = "back.urls"

REST_FRAMEWORK = {
	"DEFAULT_PAGINATION_CLASS": "utils.common.PageNumberPagination",
	"PAGE_SIZE": 500,
	"DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
	"DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
	"DEFAULT_AUTHENTICATION_CLASSES": [],
	"TEST_REQUEST_RENDERER_CLASSES": [
		"rest_framework.renderers.MultiPartRenderer",
		"rest_framework.renderers.JSONRenderer",
		"rest_framework.renderers.TemplateHTMLRenderer",
	],
}

STORAGES = {
	"default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
	"staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}

SPECTACULAR_SETTINGS = {
	"TITLE": "SCHOOL INVEST TRACKER API",
	"VERSION": "0.1.0",
	"COMPONENT_SPLIT_REQUEST": True,
}

TEMPLATES = [
	{
		"BACKEND": "django.template.backends.django.DjangoTemplates",
		"DIRS": [],
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

WSGI_APPLICATION = "back.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
	"default": {
		"ENGINE": "django.db.backends.postgresql",
		"NAME": os.getenv("POSTGRES_NAME"),
		"USER": os.getenv("POSTGRES_USER"),
		"PASSWORD": os.getenv("POSTGRES_PASSWORD"),
		"HOST": os.getenv("POSTGRES_HOST"),
		"PORT": os.getenv("BACK_CONNECT_DB_PORT"),
	}
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, STATIC_URL)

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
