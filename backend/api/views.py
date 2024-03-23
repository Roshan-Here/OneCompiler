from django.shortcuts import render
from rest_framework import status,serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import OneCodeSerializer
from .models import OneCode
from django.http import JsonResponse

# Create your views here.


def getRoutes(request):
    return JsonResponse("Starting..... ", safe=False)

class GetRunCode(APIView):
    def post(self,request,*args,**kwargs):
        print(request.data)
        serializer = OneCodeSerializer(data = request.data)
        if serializer.is_valid():
            print("valid data")
            response_data = {
                'code': request.data['code']
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"Req":"bad daata"},status=status.HTTP_400_BAD_REQUEST)