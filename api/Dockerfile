FROM python:3.9

WORKDIR /code

COPY . /code/

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# print current directory
RUN pwd

# print the content of the current directory
RUN ls -la

# Add a command so that the container can run & wait for the incoming requests
#CMD ["python", "main.py"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]