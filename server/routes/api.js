const express = require("express");
const router = express.Router();
const moment = require('moment')
// const Transaction = require("../model/s/Transaction");
const dataController = require('../controllers/dataController')
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("mysql://root:123456@localhost/crm");
const data = require("./data");
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });
  
router.get('/allClients', dataController.getAllClients)
router.get('/allOwners', dataController.getAllOwners)
router.put('/transfer', dataController.changeOwner)
router.put('/emailType', dataController.updateEmailType)
router.put('/setSold', dataController.setSold)




router.get('/populateClients', async (req, res) => {

    for(client of data) {

        const findCountryId = `
        SELECT id 
        FROM countries
        Where name = "${client.country}"`

        const findOwnerId = `
        SELECT id 
        FROM owners
        WHERE name = "${client.owner}"`

        const findEmailTypeId = `
        SELECT id
        FROM email_type
        WHERE type = "${client.emailType}"`
        try {
            const countryId = await sequelize.query(findCountryId)
            console.log(`country Id is `, countryId[0][0].id);
            
            const ownerId = await sequelize.query(findOwnerId)
            console.log(`owner Id is `, ownerId[0][0].id); 
    
            const emailTypeId = await sequelize.query(findEmailTypeId)
            console.log(`email type Id is `, emailTypeId[0][0].id);
            

            // const isoString = client.firstContact.toString()
            // const isoDate =  new Date(isoString)
            // const mySQLDateString = isoDate.toJSON().slice(0, 19).replace('T', ' ');
            const insertNewClientQuery = `
            INSERT INTO clients
            VALUES(null, "${client.name}", "${client.email}", "${moment(new Date(client.firstContact)).format("YYYY-MM-DD HH:mm:ss")}", ${emailTypeId[0][0].id}, ${client.sold ? 1 : 0}, ${ownerId[0][0].id}, ${countryId[0][0].id});`
            console.log(`client first contact is ${client.firstContact}`);
            
            
            // name, email, firstContacted, email type, sold, owner, country
            const result = await sequelize.query(insertNewClientQuery)
            console.log(`result is ${result}`);
             
            // console.log('moment is ', moment(new Date(client.firstContact)).format('l').toString());
            // break;
 
        } catch (err) {
            console.log(err);
            res.send(err)
            return
        }
    }

    res.status(200).send("All clients inside")
    // res.status(200).send("test paseed successfully")
})

router.get("/populatedb", (req, res) => {

    let owners = [], countries = [], emailType = []
    data.forEach(client => {
        // owners.push(client.owner)
        // countries.push(client.country)
        // emailType.push(client.emailType)


    })

    owners = owners.filter(
        (owner, index, arr) => arr.indexOf(owner) === index
      );

    countries = countries.filter((country, i, arr) => arr.indexOf(country) === i)
    emailType = emailType.filter((email, i, arr) => arr.indexOf(email) === i)

    countries.forEach((country, i) => {
        const insertCountry = `
        INSERT INTO countries 
        VALUES(null, "${country}")`

        sequelize.query(insertCountry).then(result => {
            console.log(`inserted country at index ${i}. result is ${result}`);
        })
    })

    owners.forEach((owner, i) => {
        const insertCountry = `
        INSERT INTO owners 
        VALUES(null, "${owner}")`

        sequelize.query(insertCountry).then(result => {
            console.log(`inserted owner at index ${i}. result is ${result}`);
        })
    })

    
    emailType.forEach((email, i) => {
        const insertCountry = `
        INSERT INTO email_type 
        VALUES(null, "${email}")`

        sequelize.query(insertCountry).then(result => {
            console.log(`inserted owner at index ${i}. result is ${result}`);

            if ( i === emailType.length - 1) {
                res.status(200).send("Populated seccessfully")
            }
        })
    })
});

router.get("/createTables", (req, res) => {



    // const owners = data.filter()
    // name, email, firstContacted, email type, sold, owner, country
  const createTables = `
  CREATE TABLE clients(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80),
    email  VARCHAR(80),
    first_contact Date,
    email_type int(25),
    sold boolean,
    owner_id INT,
    country_id INT,
    FOREIGN KEY (email_type) REFERENCES email_type(id),
    FOREIGN KEY (country_id) REFERENCES countries(id),
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);
  `;
 
  sequelize.query(createTables).spread(function(results, metadata) {
    console.log(results);
    res.status(200).send("all ok");
  });

//   sequelize.query("DROP TABLE client;").spread(function(results, metadata) {
//     console.log(results);
//     res.status(200).send("all ok");
//   });
});

module.exports = router;
// const createTables = `
// CREATE TABLE countries(
//   id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(20)
// );

// CREATE TABLE email_type(
//     INT int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     type VARCHAR(30)
//     );

// CREATE TABLE owners(
//     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(20)
// );

// CREATE TABLE client(
//     id VARCHAR(80) NOT NULL PRIMARY KEY,
//     name VARCHAR(80),
//     email  VARCHAR(80),
//     contact VARCHAR(80),
//     sold boolean,
//     email_type int(25),
//     country_id INT,
//     owner_id INT,
//     FOREIGN KEY (email_type) REFERENCES email_type(id),
//     FOREIGN KEY (country_id) REFERENCES countries(id),
//     FOREIGN KEY (owner_id) REFERENCES owners(id)
// );
// `;
