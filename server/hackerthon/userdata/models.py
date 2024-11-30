from django.db import models

# Create your models here.

class UserData(models.Model):
    """ User's Data Model Definition """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user_url = models.CharField(
        max_length=100,
        default="",
    )
    text_data = models.CharField(
        max_length = 20000,
        default="",
    )
   
    class Meta:
        verbose_name_plural = "User Data"