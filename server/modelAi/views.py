from django.contrib.auth import authenticate, login, logout
from django.conf import settings

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ParseError, NotFound
from rest_framework.permissions import IsAuthenticated

from .model_predict import predict

class ModelPredict(APIView):
    def post(self, request):
        try:
            prompt = request.data.get("prompt")
            result = predict(prompt)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

