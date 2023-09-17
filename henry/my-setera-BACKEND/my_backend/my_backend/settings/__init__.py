import os
from pathlib import Path
from django.core.exceptions import ImproperlyConfigured

from dotenv import load_dotenv

load_dotenv()
mode = os.getenv("ENVIRONMENT")
print("Running mode is : ",mode)

if not mode:
    raise ImproperlyConfigured("No Mode specified for use of project")

if mode in ["dev", "stage"]:
    from .development import *
elif mode == "production":
    from .production import *
else:
    raise ImproperlyConfigured(
        "Specify MODE in env_web file, that in which mode you are starting the project"
        " development/production mode"
    )
