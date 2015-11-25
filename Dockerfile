FROM django

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    bzip2 \
    fontconfig \
    libfreetype6-dev \
    nodejs npm \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY requirements /usr/src/app/requirements
RUN pip install --no-cache-dir -r requirements/dev.txt

COPY . /usr/src/app

RUN ln -s /usr/bin/nodejs /usr/bin/node && \
    npm install && \
    npm install -g grunt-cli && \
    grunt

RUN python manage.py migrate

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
