# O Arauto

## Objectives

In this first phase, the Arauto API will be just a simple JSON API over http to serve rpg tables, paginated and filtered by the given criteria (tags, system, name, online or physical, recruiting).

In this case, is only a Proof of Concept, for studying purposes.

## How to Run

after setting the correct .env file, like the .env.example run the commands

```
npm install && npm run dev
```

## How to Test
```
npm test
```

## The stack

The project uses a simple Node(Express) stack to connect with a MongoDB database and retrieve the data with some model validation made by mongoose. Tests are made with Jest and CI/CD is run by Travis.