import React, {useEffect, useContext, useState} from "react";
import {observer} from 'mobx-react-lite'
import TextField from "@material-ui/core/TextField";
import SelectBox from "./SelectBox";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import StoreContext, {ClientStoreContext} from '../../Helpers/storeProvider'
import Loader from '../Clients/Loader/Loader'
import axios from 'axios'
const UpdateClient = observer(() => {

  const [owners, setOwners] = React.useState([]);
  const labelStyle = {
    color: "black",
    paddingTop: "2%"
  };

  const innerDivStyle = {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    marginLeft: "3vw"
};

const headerStyle = {
    textAlign: "left",
    marginLeft: "3vw"
  };

  const clients = useContext(StoreContext)
  console.log(clients);
  const [state, setState] = React.useState({
    id: -1,
    fullName: "",
    chosenOwner: "",
    chosenEmailType: "",

  });
  // let owners = [];
  const ClientStore = useContext(ClientStoreContext)
  useEffect(() => {

    axios.get('http://localhost:4000/allOwners')
    .then(response => {
      console.log("in componentDidMount: in first then. response is ", response);
      const data = response.data.map(client => client.name)
      clients.owners = data
      // clients.setOwners(data)
      // setOwners(data)
        let counter = 0
        clients.owners.forEach(owner => {console.log("owner is ", owner); counter++;})
        // owners.forEach(owner => {console.log("owner is ", owner); counter++;})
        // console.log('owners are ', owners);
        console.log('counter is ', counter);
    })
    axios.get('http://localhost:4000/allClients')
    .then(response => {
      console.log("in componentDidMount: in first then. response is ", response);
      const data = response.data
      const tempClients = []
      data.forEach(client => tempClients.push(new ClientStore(client)))
      clients.list = tempClients;
      
      console.log(data.length);

    })


    // setTimeout(() => {
    //   console.log('in componentDidMount:');
      
    //     owners = clients.getOwners()
    //     clients.owners = owners

    //     let counter = 0
    //     clients.owners.forEach(owner => {console.log("owner is ", owner); counter++;})
    //     console.log('owners are ', owners);
    //     console.log('counter is ', counter);

    // }, 100)
  }, [])

  const handleTransfer = (fieldToUpdate, value, route) => {

    const {firstName, surname} = state
    const clientId = clients.findClientIdByName(firstName, surname)
    const transferInfo = {
      clientId,
      [fieldToUpdate]: value
    }

    console.log('transfer data is ', transferInfo, ' and route is ', route );
    axios.put(`http://localhost:4000/transfer/${route}`, transferInfo);
  }

  const handleChange = event => {
    const {name, value} = event.target
    console.log(`name is ${name}, and value is ${value}`);
    setState({
      ...state,
      [name]: value
    });
  }

  const displayClients = () => {


    
    return (
      <div>
          {clients.list
          .filter(client => {
            const clientFullName = `${client.firstName} ${client.surname}`.toLowerCase();
            return clientFullName.startsWith(state.fullName.toLowerCase())
          })
          .map(client => {
              return (
                  <>
                  <div key={client.email} style={{maxWidth:"130px", width:"130px",float:"left"}}>
                    <span style={{position: "absolute", left:"0px",fontSize:"0.37em"}} 
                        onClick={() => setState({...state, fullName: `${client.firstName} ${client.surname}`, id: client.id})}>
                         {`${client.firstName} ${client.surname}`}
                      </span>
                  </div>
                  <br />
                  </>
              );
          })}
      </div>
  )
        }
  

  console.log('clients length is ', owners.length);
  
  return (
    <>
    {clients.owners.length === 0 ? 
      <Loader />
      :
    <div>
      <h2 style={headerStyle}>Update Client</h2>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Client Name:</FormLabel>
        <TextField id="standard-basic" label="Name" name={"fullName"} value={state.fullName} onChange={handleChange}/>
        {displayClients()}
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Transfer ownership to:</FormLabel>
        <SelectBox label={"Owner"} options={clients.owners} handleChange={handleChange} value={state.chosenOwner} name={"chosenOwner"}/>
        <Button variant="contained" onClick={() => handleTransfer('newOwnerName', state.chosenOwner, 'transfer')}>Transfer</Button>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Send Email: </FormLabel>
        <SelectBox label={"Type"} options={["A", "B", "C"]} handleChange={handleChange} value={state.chosenEmailType} name={"chosenEmailType"}/>
        <Button variant="contained" onClick={() => handleTransfer('emailTypeToUpdate', state.chosenEmailType, 'emailType')}>Send</Button>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Declare Sale! </FormLabel>
        <Button variant="contained" onClick={() => handleTransfer('isSold', true, 'setSold')}>Declare</Button>
      </div>
    </div>
    }
    </>
  );
});

export default UpdateClient;
