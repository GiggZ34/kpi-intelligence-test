FROM python:3.9.21-alpine3.20

WORKDIR /app

RUN apk update && apk add --no-cache \
    postgresql-dev gcc musl-dev linux-headers

COPY . .

RUN pip install -r requirements.txt \
    && chmod +x ./entrypoint.sh

ENTRYPOINT [ "/bin/sh", "/app/entrypoint.sh" ]