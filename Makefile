manage = python manage.py
install = pip install

docker:
	docker build .
superuser:
	${manage} createsuperuser
install-dev:
	${install} -r requirements/dev.txt
install-prod:
	${install} -r requirements/prod.txt
migrate:
	${manage} migrate
run:
	${manage} runserver
shell:
	${manage} shell
test:
	${manage} test
