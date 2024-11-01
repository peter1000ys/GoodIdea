FROM spark:python3

USER root

WORKDIR /backend

COPY ./backend /backend

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt

RUN useradd -s /bin/bash -m ubuntu

RUN chown -R ubuntu:1000 /backend
RUN chmod -R 755 /backend

USER ubuntu

EXPOSE 8080
EXPOSE 11000

CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
