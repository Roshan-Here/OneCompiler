###################### AS I SAID, I IMPROVISE ON EACH COMMIT ###################
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    OneCode,
    Savelink,
    Problem,Tag,
    Example,
    Blog,
    CustomUser,
    UserProfile,
    UserSolvedQuestionList
    )


##################### CUSTOM USER SERIALIZERS ###################

class UserSolvedQuestionListSerializer(serializers.ModelSerializer):
    """
    Used for listing Solved Problems
    """
    class Meta:
        model = UserSolvedQuestionList
        fields = ['Q_slug','Q_title','Q_difficulty']


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Used to Create and Update all the UserProfile fields
    """
    usersolvedquestionlist = UserSolvedQuestionListSerializer(many=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    picture_url = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = ['username','email','full_name','about','score','picture', 'picture_url','usersolvedquestionlist']
     
    def get_picture_url(self, obj):
        request = self.context.get('request')
        if request and hasattr(obj.picture, 'url'):
            return request.build_absolute_uri(obj.picture.url)
        return None
    
    def update(self, instance, validated_data):
        solved_questions_data = validated_data.pop('usersolvedquestionlist', None)
        if solved_questions_data:
            for solved_question_data in solved_questions_data:
                Q_slug = solved_question_data.get('Q_slug')
                if not instance.usersolvedquestionlist.filter(Q_slug=Q_slug).exists():
                    UserSolvedQuestionList.objects.create(user=instance, **solved_question_data)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance
    
class UserDetailsUpdateSerializer(serializers.ModelField):
    """
    Special Updater for UserSide Update, name, & about, score amd usersolvedquestionlist will be updated without user knowledge  
    """
    picture_url = serializers.SerializerMethodField()
    # usersolvedquestionlist = UserSolvedQuestionListSerializer(many=True)
    
    class Meta:
        model = UserProfile
        fields = ['full_name','about','picture', 'picture_url']
         
    def get_picture_url(self, obj):
        request = self.context.get('request')
        if request and hasattr(obj.picture, 'url'):
            return request.build_absolute_uri(obj.picture.url)
        return None
    
    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
        
    #     instance.save()
    #     return instance
    
    

class SpecialDataUpdateSerializer(serializers.ModelSerializer):
    """
    Used to update score and usersolvedquestionlist
    """
    usersolvedquestionlist = UserSolvedQuestionListSerializer(many=True, required=False)
    
    class Meta:
        model = UserProfile
        fields = ['score', 'usersolvedquestionlist']

    def update(self, instance, validated_data):
        solved_questions_data = validated_data.pop('usersolvedquestionlist', None)
        
        if solved_questions_data:
            for solved_question_data in solved_questions_data:
                Q_slug = solved_question_data.get('Q_slug')
                if not instance.usersolvedquestionlist.filter(Q_slug=Q_slug).exists():
                    UserSolvedQuestionList.objects.create(user=instance, **solved_question_data)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance


class SpecialUserProfileSerializer(serializers.ModelSerializer):
    """
    Useed to retrive user data without jwt
    """
    usersolvedquestionlist = UserSolvedQuestionListSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    picture_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['username', 'full_name', 'about', 'score', 'picture_url', 'usersolvedquestionlist']

    def get_picture_url(self, obj):
        request = self.context.get('request')
        if request and hasattr(obj.picture, 'url'):
            return request.build_absolute_uri(obj.picture.url)
        return None   


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Used to Register the User
    """
    userprofile = UserProfileSerializer(required=False)
    
    class Meta:
        model = CustomUser
        fields = ['email','username','password','userprofile']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        userprofile_data = validated_data.pop('userprofile', None)
        user = CustomUser.objects.create_user(**validated_data)
        if userprofile_data:
            UserProfile.objects.create(user=user, **userprofile_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    """
    Used to Login the User to provide jwt tokens
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return {
                'username': user.username,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        raise serializers.ValidationError("Invalid Credentials")
    
    
################## COMPILE MODEL SERIALIZER #####################

class OneCodeSerializer(serializers.ModelSerializer):
    """
    Compilation model
    """
    class Meta:
        model = OneCode
        fields = ['pref_language','code']
    
    def validate(self,data):
        pref_lang = data.get('pref_language')
        code = data.get('code')
        print(code,pref_lang)
        return data
    
class SaveLinkSerializer(serializers.ModelSerializer):
    """
    Save Text/Code into Link
    """
    class Meta:
        model = Savelink
        fields = ['code','pref_language','unique_link']
        
##################### Problem Serializer ####################    
    
class TagSerilalizer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            "name"
        ]

class ExapleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Example
        fields = [
            "Input",
            "Output",
            "Explanation"
        ]    
    
    
class ProblemSerializer(serializers.ModelSerializer):
    """
    used to load_problems.py with this command :
    python manage.py load_problems api\json\ required_format.json
    required_format contains the scrapped data of leetcode problems
    """
    examples = ExapleSerializer(many=True)
    Tags = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = Problem
        fields = [
            'id',
            'Title',
            'slug',
            'description',
            'difficulty',
            'Tags',
            'examples',
        ]

    def create(self, validated_data):
        tags_data = validated_data.pop('Tags')
        examples_data = validated_data.pop('examples')
        
        problema = Problem.objects.create(**validated_data)
        
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            problema.Tags.add(tag)
        
        for example_data in examples_data:
            Example.objects.create(problem=problema, **example_data)
        
        return problema


    # def create(self, validated_data):
    #     tags_data = validated_data.pop('Tags')
    #     examples_data = validated_data.pop('examples')
        
    #     problem = Problem.objects.create(**validated_data)
        
    #     for tag_name in tags_data:
    #         tag, created = Tag.objects.get_or_create(name=tag_name)
    #         problem.Tags.add(tag)
        
    #     for example_data in examples_data:
    #         Example.objects.create(problem=problem, **example_data)
        
    #     return problem

    # def get_Tags(self, obj):
    #     # Returns the tags as a list of strings
    #     return [tag.name for tag in obj.Tags.all()]

    # def create(self, validated_data):
    #     examples_data = validated_data.pop("examples", [])
    #     tags_data = validated_data.pop("Tags", [])
    #     problema = Problem.objects.create(**validated_data)
    #     for tag_name in tags_data:
    #         tag, _ = Tag.objects.get_or_create(name=tag_name)
    #         problema.Tags.add(tag)

    #     examples = [Example.objects.create(problem=problema, **e_data) for e_data in examples_data]
    #     return problema
    
    
class ProblemDataSmallSerializer(serializers.ModelSerializer):
    """
    Used to retrive all data of problems
    """
    examples = ExapleSerializer(many=True)
    # Tags = TagSerilalizer(many=True)
    Tags = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields = [
            "id",
            "Title",
            "slug",
            "description",
            "difficulty",
            "Tags",
            "examples",
        ]

    def get_Tags(self, obj):
        return [tag.name for tag in obj.Tags.all()]


class ProblemMinumumDataSerializer(serializers.ModelSerializer):
    """
    Used to retrive all minimum data of problems
    """
    Tags = serializers.SerializerMethodField()
    class Meta:
        model = Problem
        fields = [
            "id",
            "Title",
            "slug",
            "difficulty",
            "Tags",
        ]

    def get_Tags(self, obj):
        return [tag.name for tag in obj.Tags.all()]


"""
SAMPLE DATA
{
"Title": "Add Two Numbers",
"slug": "add-two-numbers",
"description": "You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum\u00a0as a linked list.\n\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\n\n\u00a0\n\n",
"difficulty": "Medium",
"Tags": [
    "Linked List",
    "Math",
    "Recursion"
],
"examples": [
    {
    "Input": "** l1 = [2,4,3], l2 = [5,6,4]",
    "Output": "** [7,0,8]",
    "Explanation": "** 342 + 465 = 807."
    }
]
}

"""

# jwt

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["id","username","password"]
#         extra_kwargs = {"password": {"write_only":True}}
        
#     def create(self, validate_data):
#         user = User.objects.create_user(**validate_data)
#         return user
    
    
    
################### BlogSerializer ###################

class BlogSerializer(serializers.ModelSerializer):
    """
    this part is not including in version 1.
    """
    class Meta:
        model = Blog
        fields = ["id","Title", "Content","created_at","author"]
        extra_kwargs = {"author":{"read_only":True}}
    