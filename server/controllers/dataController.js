const validationHandler = require('../validations/validationHandler')
const queries = require('../db/queries')

exports.getAllClients = async (req, res, next) => {
    console.log(`in getAllClients(): Going to fetch all clients...`);
    
    try {
        const clients = await queries.getAllClientsFromDb()
        res.status(200).send(clients)
    } catch (err) {
        console.log("in changeOwner(): error is ", err);
        next(err);
    }
}

exports.getAllOwners = async (req, res, next) => {
    console.log(`in getAllOwners(): Going to fetch all owners...`);
    
    try {
        const owners = await queries.getAllOwnersFromDb()
        res.status(200).send(owners)
    } catch (err) {
        console.log("in getAllOwners(): error is ", err);
        next(err);
    }
}

exports.getAllCountries = async (req, res, next) => {
    console.log(`in getAllCountries(): Going to fetch all countries...`);
    
    try {
        const countries = await queries.getAllCountriesFromDb()
        res.status(200).send(countries)
    } catch (err) {
        console.log("in getAllCountries(): error is ", err);
        next(err);
    }
}

exports.changeOwner = async (req, res, next) => {
    const {clientId, newOwnerId} = req.body
    console.log(`in changeOwner(): clientId is ${clientId}, and newOwnerId is ${newOwnerId} `);
    
    try {
        // const ownerId = await queries.getOwnerIdByName(newOwnerName)
        await queries.updateOwnerInClient(clientId, newOwnerId)
        res.status(200).send({message: "client's owner updated successfully"})
    } catch (err) {
        console.log("in changeOwner(): error is ", err);
        next(err);
    }
}

exports.updateEmailType = async (req, res, next) => {
    const {clientId, emailTypeId} = req.body
    console.log(`in updateEmailType(): clientId is ${clientId}, and emailTypeToUpdate is ${emailTypeToUpdate} `);
    
    try {
        // const emailTypeId = await queries.getEmailTypeId(emailTypeToUpdate)
        await queries.updateEmailTypeInClient(clientId, emailTypeId)
        res.status(200).send({message: "client's email type updated successfully"})
    } catch (err) {
        console.log("in updateEmailType(): error is ", err);
        next(err);
    }
}

exports.setSold = async (req, res, next) => {
    const {clientId, isSold} = req.body
    console.log(`in setSold(): clientId is ${clientId}, and isSold is ${isSold} `);
    
    try {
        await queries.setSoldInClient(clientId, isSold)
        res.status(200).send({message: "client's owner updated successfully"})
    } catch (err) {
        console.log("in setSold(): error is ", err);
        next(err);
    }
}

exports.addNewClient = async (req, res, next) => {
    const clientToAdd = req.body
    console.log(`in addNewClient(): Client to add is `, clientToAdd);
    try {
        const countryId = await queries.findOrInsertCountry(clientToAdd.country)
        clientToAdd.countryId = countryId
        const result = await queries.addNewClientToDb(clientToAdd)
        console.log("new client id is: ", result);
        res.status(200).send({message: "user uploaded succesfully"})
    } catch (err) {
        console.log("in addNewClient(): error is ", err);
        next(err);
    }
}

exports.getTopSales = async (req, res, next) => {

    try {
        const salesByOwners = await queries.findSalesByOwners()
        const salesByCountries = await queries.findSalesByCountries()
        const salesByEmailType = await queries.findSalesByEmailType()
        console.log("top owners are: ", salesByOwners);
        res.status(200).send({salesByOwners, salesByCountries, salesByEmailType})
    } catch (err) {
        console.log("in getTopSales(): error is ", err);
        next(err);
    }
}
