from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

# Create your models here.
################## custom user model #################

class CustomUserManager(BaseUserManager):
    def create_user(
        self,
        username,
        email,
        password=None,
        **extra_fields
        ):
        
        if not email:
            raise ValueError('Email Field not given')
        if not username:
            raise ValueError('Username must be given')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password) #hashing with bcrypt or PBKDF2.
        user.save(using=self._db)
        return user
    
    def create_superuser(
        self,
        username,
        email,
        password=None,
        **extra_fields
        ):
        
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(username, email, password, **extra_fields)
        

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    password = models.CharField(max_length=128)
    date_joined = models.DateTimeField(default=timezone.now)
    
    objects = CustomUserManager() 
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE) # update User as new custom user model
    full_name = models.CharField(max_length=300,blank=True,null=True)
    about = models.TextField(null=True,blank=True)
    picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    score = models.IntegerField(null=True,blank=True)

    def __str__(self):
        return self.user.username
    
class UserSolvedQuestionList(models.Model):
    user = models.ForeignKey(UserProfile,related_name="examples",on_delete=models.CASCADE)
    Q_slug = models.CharField(max_length=75,null=False,blank=False)
    Q_title = models.CharField(max_length=225,null=False,blank=False)
    Q_difficulty = models.CharField(max_length=75,null=False,blank=False)
    
    def __str__(self):
        return self.Q_title

################# compile code model ###################

class OneCode(models.Model):
    run_time = models.DateTimeField(null=True,blank=True)
    pref_language = models.CharField(max_length=255,null=True)
    code = models.TextField()
    memory_usage = models.BigIntegerField(blank=True,null=True)


############### save link Model #####################

class Savelink(models.Model):
    code = models.TextField()
    pref_language = models.CharField(max_length=255,null=True)
    unique_link = models.CharField(max_length=200,null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    
############## Problem Model ########################    

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
    
################## Blog Model #########################

class Blog(models.Model):
    Title = models.CharField(max_length=256, blank=False, null=False)
    Content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="Blogs")
    
    def __str__(self):
        return self.Title