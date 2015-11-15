manage = python manage.py
install = pip install

createsuperuser:
	${manage} createsuperuser
install-dev:
	${install} -r requirements/dev.txt
migrate:
	${manage} migrate
run:
	${manage} runserver
shell:
	${manage} shell
dev-bootstrap: install-dev migrate createsuperuser
