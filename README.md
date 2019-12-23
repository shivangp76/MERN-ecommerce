# Ecommerce Website using MERN Stack

This is an ecommerce website made using the MERN stack - MongoDB, Express.js, React.js, and Node.js. In addition to these technologies, this website utilizes Docker to containerize the frontend and backend.

Use this code at YOUR OWN RISK.

### Installation and Usage

Replace BUSINESS_NAME with your business name. Make sure you replace any spaces with another character. For example, Home Depot could become Home-Depot.

    docker-compose -f docker-compose-prod.yml build && docker-compose -f docker-compose-prod.yml up
    docker exec -it BUSINESS_NAME_mongodb mongo

After installing the project, use a text editor such as Atom and search the entire project for "BUSINESS_NAME" (without quotes) and replace it with your business name. Make sure you replace any spaces with another character. For example, Home Depot could become Home-Depot.

Also,
* add the appropriate values to the .env file.
* search for STRIPE_KEY and add your stripe key
* search for ADDRESS and add your company's address

### Improvements that can be made

-   Send the order fax later depending on the pickup time for the order
-   Tell the customer their estimated wait time
-   Add data redundancy for mongo
