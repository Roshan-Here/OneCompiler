from rest_framework import serializers
from .models import OneCode


class OneCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneCode
        fields = ['pref_language','code']
    
    def validate(self,data):
        pref_lang = data.get('pref_language')
        code = data.get('code')
        print(code,pref_lang)
        return data
