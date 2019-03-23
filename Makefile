

run:
	ts-node main.ts

watch:
	nodemon --exec ts-node main.ts

test:
	npm run test

deploy:
	nohup make run &