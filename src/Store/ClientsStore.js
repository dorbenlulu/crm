import {action, observable, computed} from 'mobx'
import {ClientStore} from './ClientStore'

export class ClientsStore {
    @observable list = []
    @observable owners = []
    
    @computed get getClients(){ return this.list}
    @computed get getNumOfClients(){ return this.list.length}
    
    @action
    getOwners = () => {
        this.owners = this.list.map(client => client.owner).filter((owner, index, arr) => arr.indexOf(owner) === index)
        console.log(this.owners)
        return this.owners
    }
    @action 
    addClient = (clientToAdd) => {
        this.list.push(new ClientStore(clientToAdd))
    }

    @action
    updateSurname = (id, newSurname) => {
        const index = this.list.findIndex(client => client.id === id)
        this.list[index].surname = newSurname
    }

    @action
    updateFirstName = (id, newFirstName) => {
        const index = this.list.findIndex(client => client.id === id)
        this.list[index].firstName = newFirstName
    }

    @action
    updateCountry = (id, newCountry) => {
        const index = this.list.findIndex(client => client.id === id)
        this.list[index].country = newCountry
    }

    findClientIdByName = (firstName, surname) => {
        const foundClient = this.list.find(client => client.firstName === firstName && client.surname === surname)
        return foundClient;
    }
}