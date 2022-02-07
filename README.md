## About
Repo for a CRUD server to Create, Read, Update and Delete cats as resources. Done as part of a take-home assignment for DFinity Foundation.
Made using Node.js and Express.js. 
The cat objects are stored in a MongoDB database hosted on the cloud using MongoDB Atlas.


## Live server
- [Heroku Server Address] - https://dfinity-cats.herokuapp.com/

## You can also use local installation in place of the HEROKU endpoint

1. Clone repo
2. run `npm install` 

## Usage 

1. run `npm run dev` or `npm run start`
2. You can now interact with the APIs on localhost:8000 using tools like POSTMAN

## Endpoints

1. POST /cats

Input:
Takes in a JSON body of the format below
{
    "catName": "testName",
    "catColor": "testColor",
    "catBreed": "testBreed"
}

Output:
JSON response with a unique id for the cat

2. GET /cats

Input: None
Output: List of all cat objects in the database

3. GET /cats/:id

Input: Unique Object Id for the cat as part of the URL param
Output: JSON body with information regarding the cat

4. PUT /cats/:id

Input: 
Unique Object Id for the cat as part of the URL param
Takes in a JSON request body similar to POST call
{
    "catName": "updatedTestName",
    "catColor": "testColor",
    "catBreed": "testBreed"
}
Output: JSON body with updated information regarding the cat

5. DELETE /cats/:id

Input: Unique Object Id for the cat as part of the URL param
Output: None(200 status code)

## POSTMAN Collection
There is a POSTMAN collection included in this repo which can be used for interacting with the HEROKU server. You will have to change the URL if you are running a local server.