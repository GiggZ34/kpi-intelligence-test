sleep 5
python manage.py migrate --noinput
python manage.py init_data
python manage.py collectstatic --noinput
sh -c "gunicorn --bind=[::]:${PORT} --workers=5 --threads=10 back.wsgi"
