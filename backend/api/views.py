from django.shortcuts import render
from rest_framework import status,serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import OneCodeSerializer
from .models import OneCode
from django.http import JsonResponse
from .Compile import run_my_code, get_memory_usage
import asyncio
import psutil
import time

# Create your views here.


def getRoutes(request):
    return JsonResponse("Starting..... ", safe=False)

class GetRunCode(APIView):
    def post(self,request,*args,**kwargs):
        print(request.data)
        serializer = OneCodeSerializer(data = request.data)
        if serializer.is_valid():
            lang = request.data['pref_language']
            code = request.data['code']
            """
            code to get run time, and memory of executing code!
            """
            start_memory = get_memory_usage()
            
            start_time = time.time()
            output = str(asyncio.run(run_my_code(lang,code)))
            end_time = time.time()
        
            end_memory = get_memory_usage()
            
            run_time = f"{str(end_time - start_time)} Sec"
            memory_usage = end_memory - start_memory
            memory_usage_mb = f"{str(memory_usage/(1024*1024))} Mb"
            print(run_time,start_memory,end_memory)
        
            print("valid data")
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