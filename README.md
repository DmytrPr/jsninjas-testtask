## Description

JSNinjas test task. This repo includes back- and front-end in separate folders. To open detailed information about a hero, left click on their card. To remove an image from a hero when editing or when creating one, simply click on that image.

Assumptions:
* The task didn't specify how superhero's powers should be stored, and the presented data example showed them listed as a string with arbitrary separation (both commas and "and" word used) therefor it was chosen to store them as a single string. 
* The task didn't specify any unique fields for heroes, therefor it was assumed that there are none. Two heroes can have same nicknames, same real names and so on. This makes sense, considering two heroes from different franchises can potentially have same names.
* Image size is limited at 1 megabyte and the amount of images per hero is limited at 4 to prevent cluttering  server's disk
* The first aploaded image is assumed to be the front image and is displayed on hero's card.

## Installation

```bash
# server 
$ cd superheroes-server
$ npm i

# client
$ cd superheroes-client
$ npm i
```

## Running the app
Check corresponding .env files(.env for front-end, /config/.env.[production|development] for back-end) for launch parameters.

Before starting up a server, start up a docker container for the database
```bash
# server
$ cd superheroes-server
$ npm run start

# client
$ cd superheroes-client
$ npm run start
```
