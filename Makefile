manage = python manage.py
install = pip install

docker:
	docker build .
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
test:
	grunt test
	${manage} test
dev-bootstrap: install-dev migrate install-js build-js createsuperuser
