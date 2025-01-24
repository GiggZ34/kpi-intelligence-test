FROM python:3.9.21-alpine3.20

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "bash", "/entrypoint.sh" ]