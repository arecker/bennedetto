manage = python manage.py
install = pip install

createsuperuser:
	${manage} createsuperuser
install-dev:
	${install} -r requirements/dev.txt
install-js:
	npm install
build-js:
	grunt
migrate:
	${manage} migrate
run:
	${manage} runserver
shell:
	${manage} shell
dev-bootstrap: install-dev migrate install-js build-js createsuperuser
