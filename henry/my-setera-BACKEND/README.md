
INSERT DUMMY DATAIN DATABASE USER COMMNAD 
step 1 -  python3 manage.py userrole
step 2 - python3 manage.py datagen




-USE THIS COMMNAD FOR EXPORT APPS TABLE(DATA) IN TO FIXTURE FILE
python3 manage.py dumpdata users  -o  apps/users/fixtures/role.json
python3 manage.py dumpdata organization  -o  apps/users/fixtures/organization.json

- USE THIS COMMAND TO INSERT FIXTURE IN YOUR DATABASE 
python3 manage.py loaddata apps/users/fixtures/organization.json
python3 manage.py loaddata apps/users/fixtures/role.json




 
-Use for docker  django terminal
step 1 - docker ps (get  the  CONTAINER Id )

step2 - docker exec -it 6bea846e0d3d bash


celery -A my_backend beat -l INFO     #automate task beat

celery -A my_backend worker -l info   #celery worker 

   


#. apps.tasks.tasks.test_fun
  . my_backend.celery.debug_task


celery -A my_backend  purge


celery -A my_backend beat -l debug -S django_celery_beat.schedulers.DatabaseScheduler




## Generate local certificates

<!-- openssl req -x509 -nodes -newkey rsa:4096 -keyout localhost.key -out localhost.crt -days 365 -subj '/CN=localhost' -->

# Commands for running docker containers

### Please update the host name and certificates as per the environment in docker-compose files 
## for dev environment

./dev.sh

## for stage environment

./stage.sh

## for production environment

./prod.sh 
