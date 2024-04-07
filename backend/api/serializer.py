from rest_framework import serializers
from .models import OneCode, Savelink


class OneCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OneCode
        fields = ['pref_language','code']
    
    def validate(self,data):
        pref_lang = data.get('pref_language')
        code = data.get('code')
        print(code,pref_lang)
        return data
    
class SaveLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Savelink
        fields = ['code','pref_language','unique_link']
