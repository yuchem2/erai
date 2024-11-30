from django.urls import path
from . import views

urlpatterns = [
    path("", views.UserDataCrawler.as_view()),
]
