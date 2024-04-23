from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status,serializers
from rest_framework import generics
from rest_framework.response import Response
from .serializer import OneCodeSerializer, SaveLinkSerializer, ProblemSerializer, ProblemDataSmallSerializer
from .models import OneCode, Savelink, Problem
from django.http import JsonResponse
from .Compile import run_my_code, get_memory_usage
import asyncio
import psutil
import time
import re
import uuid
# Create your views here.


def getRoutes(request):
    return JsonResponse("Starting..... ", safe=False)

class GetRunCode(generics.CreateAPIView):
    serializer_class = OneCodeSerializer
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
    
    def perform_create(self, serializer):
        unique_code = str(uuid.uuid4())
        print(unique_code)
        serializer.save(unique_link=unique_code)
        
class RetriveSaveLink(generics.RetrieveAPIView):
    queryset = Savelink.objects.all()
    serializer_class = SaveLinkSerializer
    lookup_field = 'unique_link'
    
class SaveLinkList(generics.ListAPIView):
    queryset = Savelink.objects.all().order_by('-created')
    serializer_class = SaveLinkSerializer
    
class DeleteSaveLink(generics.DestroyAPIView):
    queryset = Savelink.objects.all()
    serializer_class = SaveLinkSerializer
    lookup_field = 'unique_link'
    
    def perform_destroy(self, instance):
        return super().perform_destroy(instance)


# to delete all unwanted datas while developing!
class DestroyAllSavedData(APIView):
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
    
class RetriveProblemSmallData(generics.ListAPIView):
    queryset = Problem.objects.all() 
    serializer_class = ProblemDataSmallSerializer