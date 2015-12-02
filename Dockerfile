FROM python:3.4-slim

RUN apt-get update && apt-get install -y \
    gcc \
    gettext \
    mysql-client libmysqlclient-dev \
    postgresql-client libpq-dev \
    sqlite3 \
    \
    bzip2 \
    fontconfig \
    libfreetype6-dev \
    nodejs npm \
    \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV DJANGO_VERSION 1.9

RUN pip install mysqlclient psycopg2 django=="$DJANGO_VERSION"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements /usr/src/app/requirements
RUN pip install --no-cache-dir -r requirements/dev.txt

COPY . /usr/src/app

RUN ln -s /usr/bin/nodejs /usr/bin/node && \
    npm install && \
    npm install -g grunt-cli && \
    grunt build

RUN python manage.py migrate

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
