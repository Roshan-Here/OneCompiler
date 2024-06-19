"""
function to upload images to cloudinary and remove from local db
"""
import os

from django.conf import settings

# import cloudinary
# import cloudinary.uploader
# from cloudinary.utils import cloudinary_url
from dotenv import load_dotenv

def Upload_to_Cloudinary(url):
    cloudinary.config( 
        cloud_name = os.environ.get('CL_CLOUD_NAME'), 
        api_key = os.environ.get('CL_API_KEY'), 
        api_secret = os.environ.get('CL_API_SECRET'), # Click 'View Credentials' below to copy your API secret
        secure=True
    )
    # configuring clodinary
    cloud_config = settings.CLOUDINARY_CONFIG
    print(cloud_config)
    # UPLOADING PART
    upload_item = f"settings.MEDIA_ROOT/{url}"
    print(upload_item) #dumb not working cloudinary python version.
    
    
"""
Boolean Checker
"""

def str2bool(value: str, true_values: tuple[str, ...] = ("y", "yes", "t", "true", "on", "1"), 
             false_values: tuple[str, ...] = ("n", "no", "f", "false", "off", "0"), 
             lowercase=True, strip_whitespace=True):
    value = value.strip() if strip_whitespace else value
    value = value.lower() if lowercase else value
    return value in true_values
