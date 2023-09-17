# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.11.1

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# Make a directory in your Docker container
RUN mkdir /my_backend

# Set the working directory to /my_backend
# NOTE: all the directives that follow in the Dockerfile will be executed in
# that directory.
WORKDIR /my_backend

# Copy requirements file to host
COPY ./requirements.txt /my_backend/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

COPY ./my_backend /my_backend

RUN python manage.py collectstatic --noinput

# RUN celery -A my_backend beat -l INFO 

# RUN celery -A my_backend worker -l info

