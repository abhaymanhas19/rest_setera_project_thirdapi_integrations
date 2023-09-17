from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from django.conf import settings


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "my_backend.settings")

app = Celery("my_backend")

app.config_from_object("django.conf:settings", namespace="CELERY")

# CELERY_TIMEZONE = "Europe/Helsinki"

app.conf.update(timezone="Europe/Helsinki")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


app.conf.beat_schedule = {
    "ExpirePlan": {
        "task": "ExpirePlan",
        "schedule": 20.0,  # every 20 seconds it will be called
        #'args': (2,) you can pass arguments also if rquired
    },

    "sync_oraganizationdata": {
            "task": "sync_oraganizationdata",
            "schedule": 3600.0,  # every 1 second it will be called
            #'args': (2,) you can pass arguments also if required
    },

}


@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
