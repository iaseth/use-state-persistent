
default: build

build:
	npm run build

lint:
	npm run lint

prepare: clean build

publish: prepare
	npm publish

clean:
	@rm -rf dist
