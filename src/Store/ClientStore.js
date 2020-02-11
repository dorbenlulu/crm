import {action, observable} from 'mobx'
import moment from 'moment'
// import {createContext} from 'react'

// "_id": "5b9f48a2406b2cd74c55c663",
// "name": "Perkins Cunningham",
// "email": "perkinscunningham@imant.com",
// "firstContact": "2018-11-26T22:00:00.000Z",
// "emailType": "B",
// "sold": true,
// "owner": "Emily Durham",
// "country": "Romania"

export class ClientStore {
    @observable id
    @observable firstName
    @observable surname
    @observable email
    @observable firstContact
    @observable emailType
    @observable sold
    @observable owner
    @observable country

    constructor(newClient) {
        // console.log(newClient);
        
        this.id = newClient.id 
        this.firstName = newClient.name.split(' ')[0]
        this.surname = newClient.name.split(' ')[1]
        this.email = newClient.email
        this.emailType = newClient.emailType
        this.sold = newClient.sold
        this.owner = newClient.owner
        this.country = newClient.country
        this.firstContact = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }

    @action 
    updateFirstName = (firstName) => {
        this.firstName = firstName
    }

    @action
    updateSurname = (surname) => {
        this.surname = surname
    }

    @action
    updateCountry = (country) => {
        this.country = country
    }
}