from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status,serializers
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .serializer import (
                OneCodeSerializer,
                SaveLinkSerializer,
                ProblemSerializer,
                ProblemDataSmallSerializer,
                ProblemMinumumDataSerializer,
                # UserSerializer,
                CustomUserSerializer,
                UserProfileSerializer,
                LoginSerializer,
                SpecialUserProfileSerializer,
                UserDetailsUpdateSerializer,
                SpecialDataUpdateSerializer,
                BlogSerializer
                )

from .models import (
                OneCode,
                Savelink,
                Problem,
                CustomUser,
                UserProfile,
                Blog)

from django.http import JsonResponse
from .Compile import run_my_code, get_memory_usage
import asyncio
import psutil
import time
import re
import uuid
# Create your views here.


################### CUSTOM USER MODEL ###################

class UserRegisterView(generics.CreateAPIView):
    # post view
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]


    def get(self, request, *args, **kwargs):
        user_profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(user_profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileUpdateView(generics.UpdateAPIView):
    """
    Used to update all the user filed on single step, including usersolvedquestionlist
    """
    serializer_class = UserProfileSerializer
    # parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
    
    
    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class UserRequiedFieldsUpdateView(generics.UpdateAPIView):
    """
    Used to Update Specified field only! not giving access to change username, email, score, usersolvedquestionlist
    """
    serializer_class = UserDetailsUpdateSerializer
    # parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)
    
    
    # def update(self, request, *args, **kwargs):
    #     user_profile = self.get_object()
    #     serializer = self.get_serializer(user_profile, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #     return Response(serializer.data)

    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     context.update({"request": self.request})
    #     return context

class UserSpecialFieldUpdater(generics.UpdateAPIView):
    """
    Used to update score, and usersolvedquestionlist
    """
    serializer_class = SpecialDataUpdateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

class UserProfileViewWithoutJWT(generics.RetrieveAPIView):
    """
    Used to View User Profile Public || any one  can view
    """
    queryset = UserProfile.objects.all()
    serializer_class = SpecialUserProfileSerializer
    permission_classes = [AllowAny]
    lookup_field = 'user__username' # userprofile model has no attribute username, so taking username from user object
    
    def get_object(self):
        username = self.kwargs['username']
        return get_object_or_404(UserProfile, user__username=username)
    
    
class UserProfileDelete(generics.DestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)
    
    def perform_destroy(self, instance):
        user = instance.user
        instance.delete()  # to delete the picture file
        user.delete()
    
################### Inital view #############

def getRoutes(request):
    return JsonResponse("Starting..... ", safe=False)

################# Compiler view ###############

class GetRunCode(generics.CreateAPIView):
    serializer_class = OneCodeSerializer
    permission_classes = [AllowAny]
    def create(self,request,*args,**kwargs):
        print(request.data)
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            lang = serializer.validated_data['pref_language']
            code = serializer.validated_data['code']
            """
            code to get run time, and memory of executing code!
            """
            start_memory = get_memory_usage()
            
            start_time = time.time()
            try:
                output = str(asyncio.run(run_my_code(lang,code)))
            except Exception as e:
                output = f"Err: {e}"
            end_time = time.time()
        
            end_memory = get_memory_usage()
            
            run_time = f"{str(end_time - start_time)} Sec"
            memory_usage = end_memory - start_memory
            memory_usage_mb = f"{str(memory_usage/(1024*1024))} Mb"
            print(run_time,start_memory,end_memory)
        
            print("valid data")
            find_err =  re.search(r'(?i)(SyntaxError|syntax error|error|exception|warning|fatal error|undefined reference|segmentation fault|runtime error|compilation error|invalid syntax): (.+)', output,re.DOTALL)
            if find_err:
                find_err = find_err.group()
                response_data = {
                'preffered language' : lang,
                'code': code,
                'Error' : find_err,
                'run time' : run_time,
                'memory usage' : memory_usage_mb,
                }
            else:            
                response_data = {
                    'preffered language' : lang,
                    'code': code,
                    'Compiled Output' : output,
                    'run time' : run_time,
                    'memory usage' : memory_usage_mb,
                }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"Req":"bad daata"},status=status.HTTP_400_BAD_REQUEST)
        
        
        
# sample data

# {
# "pref_language": "go", 
# "code": """
#   package main

# import "fmt"

# func main() {
#     fmt.Println("hello world")
# }
# """
# }

class CreateSaveLink(generics.CreateAPIView):
    queryset = Savelink.objects.all()
    serializer_class = SaveLinkSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        unique_code = str(uuid.uuid4())
        print(unique_code)
        serializer.save(unique_link=unique_code)
        
class RetriveSaveLink(generics.RetrieveAPIView):
    queryset = Savelink.objects.all()
    serializer_class = SaveLinkSerializer
    permission_classes = [AllowAny]
    lookup_field = 'unique_link'
    
class SaveLinkList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Savelink.objects.all().order_by('-created')
    serializer_class = SaveLinkSerializer
    
class DeleteSaveLink(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Savelink.objects.all()
    serializer_class = SaveLinkSerializer
    lookup_field = 'unique_link'
    
    def perform_destroy(self, instance):
        return super().perform_destroy(instance)


# to delete all unwanted datas while developing!
class DestroyAllSavedData(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,*args,**kwargs):
        try:
            Savelink.objects.all().delete()
            return Response({"message": "All data deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#######################################
            #PROBLEM
#######################################

class ProblemCreate(generics.ListCreateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
    
    
class RetriveAllProblemData(generics.ListAPIView):
    """
    Used to Retrive all the problem data
    """
    queryset = Problem.objects.all() 
    serializer_class = ProblemDataSmallSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]

class RetriveAllMinProblemData(generics.ListAPIView):
    """
    Used to retive all data for Table purpose
    """
    queryset = Problem.objects.all() 
    serializer_class = ProblemMinumumDataSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

class RetriveIndividalProblemData(generics.RetrieveAPIView):
    """
    Used to retive all Individal data of problems
    """
    queryset = Problem.objects.all() 
    serializer_class = ProblemDataSmallSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "slug"
    # permission_classes = [AllowAny]
    


    
class DestroyAllProblemData(APIView):
    permission_classes = [AllowAny]    
    def delete(self,request,*args,**kwargs):
        try:
            Problem.objects.all().delete()
            return Response({"message": "All data deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    
########################################
                #user 
########################################

# class CreateUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]
    
    
########################################
                #Blog 
########################################

class BlogListView(generics.ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        queryset = Blog.objects.fliter(author=user)
        return queryset
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
            
class BlogDeleteView(generics.DestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        queryset = Blog.objects.fliter(author=user)
        return queryset