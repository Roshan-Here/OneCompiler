from django.contrib.auth.models import User
from rest_framework import serializers
from .models import OneCode, Savelink, Problem,Tag, Example, Blog


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
    
    
# class ProblemSerializer(serializers.ModelSerializer):
#     examples = ExapleSerializer(many=True)
#     Tags = serializers.ListField(child=serializers.CharField())
#     # Tags = serializers.SerializerMethodField()
#     # Tags = serializers.ListField(child=serializers.CharField(max_length=2000))
#     # Tags = serializers.ListField(child=serializers.CharField(max_length=2000), write_only=True)
#     # tags = serializers.ListField(child=serializers.CharField(max_length=2000))
    
class ProblemSerializer(serializers.ModelSerializer):
    """
    used to load_problems.py
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
    "Title": "Minimum Height Trees",
    "slug": "",
    "description": "A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree. Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).Return a list of all MHTs' root labels. You can return the answer in any order. The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.",
    "difficulty": "easy",
    "examples": [
{
"Input" : "n = 4, edges = [[1,0],[1,2],[1,3]]",
"Output" : "[1]",
"Explanation" : "As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT."
},
{
"Input" : "n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]",
"Output" : "[3,4]",
"Explanation" : "As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT."
}
]
}

"""

# jwt

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only":True}}
        
    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        return user
    
    
    
# BlogSerializer

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["id","Title", "Content","created_at","author"]
        extra_kwargs = {"author":{"read_only":True}}
    