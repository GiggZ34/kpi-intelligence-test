FROM node:23-alpine3.20 as build

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli@17.3.11 --unsafe-perm \
    && npm install \
    && ng build front

FROM nginx:1.27.3-alpine

EXPOSE $FRONT_PORT

RUN apk update && apk add --no-cache envsubst

COPY --from=build  /app/dist/front/browser /usr/share/nginx/html
COPY --from=build  /app/nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=build  /app/entrypoint.sh  /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]

