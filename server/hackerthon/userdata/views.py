from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from .models import UserData
from .serializers import UserDataSerializer
from .api.data_crawling import get_user_data

# Create your views here.

class UserDataCrawler(APIView):
    def post(self, request):
        user_url = request.data.get("user_url")
        crawling_result = get_user_data(user_url)
        return Response(crawling_result,status=HTTP_200_OK)