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
        python main.py
        ;;
esac