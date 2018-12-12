HOW TO RUN:

Open docker toolbox:
-Go to the location of the file
-Enter this following codes: 
	docker-compose up -d --build
	docker-compose start database
	docker-compose exec backend python app.py db
-Go to your local Host and test the program there