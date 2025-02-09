#!/bin/bash

# Modify environment.js with the correct URLs
envsubst <  /usr/share/nginx/html/assets/environment.js.template >  /usr/share/nginx/html/assets/environment.js

# Start NGINX
nginx -g 'daemon off;'