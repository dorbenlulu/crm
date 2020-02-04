const validationHandler = require('../validations/validationHandler')
const queries = require('../db/queries')
// const cloud = require('../../../../../Vicki's Home Assignment/bThere-home-assignment/server/cloud/cloudHandler')




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
        console.log("in changeOwner(): error is ", err);
        next(err);
    }
}

exports.changeOwner = async (req, res, next) => {
    const {clientId, newOwnerName} = req.body
    console.log(`in changeOwner(): clientId is ${clientId}, and newOwnerName is ${newOwnerName} `);
    
    try {
        const ownerId = await queries.getOwnerIdByName(newOwnerName)
        await queries.updateOwnerInClient(clientId, ownerId)
        res.status(200).send({message: "client's owner updated successfully"})
    } catch (err) {
        console.log("in changeOwner(): error is ", err);
        next(err);
    }
}

exports.updateEmailType = async (req, res, next) => {
    const {clientId, emailTypeToUpdate} = req.body
    console.log(`in updateEmailType(): clientId is ${clientId}, and emailTypeToUpdate is ${emailTypeToUpdate} `);
    
    try {
        const emailTypeId = await queries.getEmailTypeId(emailTypeToUpdate)
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





// Old Code Below!
let counter = async function(){
    const counter = await cloud.countItems()
    return counter+1
}

exports.getData = async (req, res, next) => {
    queries.getData(results => {
        try {
            res.send(results)
        } catch(err) {
            next(err)
        }
    })
}

exports.storeData = async (req, res, next) => {
    try {
        validationHandler(req)
        cloud.renewBuffer()
        cloud.storeToCloud(req.body.base64, await counter(), req.body.description)
        res.send({message: 'Image was uploaded successfully!'})
    } catch(err) {
        next(err)
    }
}