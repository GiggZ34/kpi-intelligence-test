#!/bin/bash

usage() { echo "Usage: $0 [-s <45|90>] [-p <string>]" 1>&2; exit 1; }
run="default"
while getopts ":s" o; do
    case "${o}" in
        s)
            run="sleep"
            ;;
    esac
done
shift $((OPTIND-1))

case "${run}" in
    "sleep")
        sleep infinity
        ;;
    *)
        python manage.py migrate --noinput
        python manage.py init_data
        python manage.py collectstatic --noinput
        python manage.py runserver 0.0.0.0:8000
        ;;
esac