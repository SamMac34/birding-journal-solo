
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "my_collection" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"bird_id" INT NOT NULL,
	"location" VARCHAR (1000),
	"date" DATE,
	"time" TIME,
	"notes" VARCHAR (1000)
);

CREATE TABLE "birds" (
	"id" SERIAL PRIMARY KEY,
	"common_name" VARCHAR (100),
	"sci_name" VARCHAR (100),
	"region" VARCHAR (100),
	"family" VARCHAR (100),
	"order" VARCHAR (100),
	"image" VARCHAR (500)
);

CREATE TABLE "my_wishlist" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"bird_id" INT NOT NULL
);