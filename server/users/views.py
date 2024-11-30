from django.contrib.auth import authenticate, login, logout
from django.conf import settings

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ParseError, NotFound
from rest_framework.permissions import IsAuthenticated


from django.contrib.auth.models import User




class Users(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if User.objects.filter(username=username).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.create_user(username=username, password=password)
            return Response({"result":"Hello"},status=status.HTTP_200_OK)

class LogIn(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            raise ParseError
        # username과 password과 일치한다면 return user
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return Response({"ok": "Welcome to my website!"})
        else:
            return Response(
                {"error": "Wrong password"}, status=status.HTTP_400_BAD_REQUEST
            )
        
class LogOut(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"ok": "Goodbye! See you!"})