.PHONY: install build

install:
	npm install
	npm install -g grunt
build: install
	grunt

