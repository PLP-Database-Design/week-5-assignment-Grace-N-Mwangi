// import our dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId)
})

// Question 1: Retrieve all patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error 
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        // res.status(200).render('data', { data })
        res.status(200).send(data)
    })
})

// Question 2: Retrieve all providers
app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    
    db.query(getProviders, (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get providers");
        }

        res.status(200).send(data); // Send the data as a JSON response
    });
});
  
// Question 3: Filter patients by First Name
app.get('/get-patients-by-firstname', (req, res) => {
    const { first_name } = req.query; // Get first name from query parameter
    const getPatientsByFirstName = "SELECT first_name FROM patients";

    db.query(getPatientsByFirstName, [first_name], (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get patients by first name");
        }

        res.status(200).send(data); // Send the filtered patients
    });
});

// Question 4: Retrieve all providers by their specialty
app.get('/get-providers-by-specialty', (req, res) => {
    const { specialty } = req.query; // Get provider specialty from query parameter
    const getProvidersBySpecialty = "SELECT first_name, last_name, provider_specialty FROM providers";

    db.query(getProvidersBySpecialty, [specialty], (err, data) => {
        if (err) {
            return res.status(400).send("Failed to get providers by specialty");
        }

        res.status(200).send(data); // Send the filtered providers
    });
});


// start and listen to the server
app.listen(3300, () => {
    console.log(`server is running on port 3300...`)
})