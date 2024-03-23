from rest_framework import serializers
from .models import OneCode


class OneCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneCode
        fields = ['code',]
    
    def validate(self,data):
        code = data.get('code')
        print(code)
        return data
