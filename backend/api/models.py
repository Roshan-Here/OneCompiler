from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

# Create your models here.

class OneCode(models.Model):
    run_time = models.DateTimeField(null=True,blank=True)
    pref_language = models.CharField(max_length=255,null=True)
    code = models.TextField()
    memory_usage = models.BigIntegerField(blank=True,null=True)
    
class Savelink(models.Model):
    code = models.TextField()
    pref_language = models.CharField(max_length=255,null=True)
    unique_link = models.CharField(max_length=200,null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    
class Tag(models.Model):
    name = models.CharField(max_length=2000,null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class Problem(models.Model):
    Title = models.CharField(max_length=225,null=False,blank=False)
    slug = models.SlugField(max_length=225,blank=True)
    description = models.TextField(null=True, blank=True)  
    difficulty = models.CharField(max_length=75,null=False,blank=False)
    Tags = models.ManyToManyField(Tag)
    
    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.Title.replace(' ','-'))
        super(Problem, self).save(*args,**kwargs)
        
class Example(models.Model):
    # related_name should be same as custom serializer
    problem = models.ForeignKey(Problem,related_name="examples",on_delete=models.CASCADE)
    Input = models.TextField(null=False,blank=False)
    Output = models.TextField(null=False,blank=False)
    Explanation = models.TextField(null=True, blank=True)
    
# Blog

class Blog(models.Model):
    Title = models.CharField(max_length=256, blank=False, null=False)
    Content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Blogs")
    
    def __str__(self):
        return self.Title