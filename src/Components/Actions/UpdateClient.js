import React, {useEffect, useContext} from "react";
import {observer} from 'mobx-react-lite'
import TextField from "@material-ui/core/TextField";
import SelectBox from "./SelectBox";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import StoreContext, {ClientStoreContext} from '../../Helpers/storeProvider'
import Loader from '../Clients/Loader/Loader'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import axios from 'axios'
const UpdateClient = observer(() => {

  // const [owners, setOwners] = React.useState([]);
  const labelStyle = {
    color: "black",
    paddingTop: "2%"
  };

  const clientLabelStyle = {
    color: "black",
    paddingTop: "0%"
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
      const data = response.data
      clients.owners = data
      // clients.setOwners(data)
      // setOwners(data)
        let counter = 0
        clients.owners.forEach(owner => {console.log("owner is ", owner); counter++;})
        // owners.forEach(owner => {console.log("owner is ", owner); counter++;})
        // console.log('owners are ', owners);
        console.log('counter is ', counter);
        return axios.get('http://localhost:4000/allClients')
    })
    .then(response => {
      console.log("in componentDidMount: in first then. response is ", response);
      const data = response.data
      const tempClients = []
      data.forEach(client => tempClients.push(new ClientStore(client)))
      clients.list = tempClients;
      
      console.log(data.length);

    })
  }, [])

  const handleTransfer = (fieldToUpdate, value, route) => {

    const {firstName, surname} = state
    const clientId = clients.findClientIdByName(firstName, surname)
    const transferInfo = {
      clientId: state.id,
      [fieldToUpdate]: value
    }

    console.log('transfer data is ', transferInfo, ' and route is ', route );
    // axios.put(`http://localhost:4000/transfer/${route}`, transferInfo);
  }

  const handleChange = event => {
    const {name, value} = event.target
    console.log(`name is ${name}, and value is ${value}`);
    setState({
      ...state,
      [name]: value
    });
  }

  // console.log('clients length is ', owners.length);
  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      padding: 20,
      width: "20vw"
    })
  }

  const ownerOptions = clients.owners.map(owner => {
    return {
      id: owner.id,
      value: owner.name
    }
  })

  const emailTypeOptions = [
    {
      value: "A",
      id: 4
    },
    {
      value: "B",
      id: 1
    },
    {
      value: "C",
      id: 5
    },
    {
      value: "D",
      id: 3
    }
  ]
  return (
    <>
    {clients.owners.length === 0 ? 
      <Loader />
      :
    <div>
      <h2 style={headerStyle}>Update Client</h2>
      <div style={innerDivStyle}>
        <FormLabel style={clientLabelStyle}>Client Name:</FormLabel>
        {/* <TextField id="standard-basic" label="Name" name={"fullName"} value={state.fullName} onChange={handleChange}/> */}
        {/* <FixedSizeList height={400} width={300} itemSize={46} itemCount={700}>
          {displayClients}
        </FixedSizeList> */}
        {/* {displayClients()} */}
        <Select name="fullName" placeholder={state.fullName} value={state.fullName} styles={customStyles} options={clients.list.map(cl => {return {id: cl.id, value: `${cl.firstName} ${cl.surname}`, label: `${cl.firstName} ${cl.surname}`}})} onChange={val => setState({...state, fullName: val.value, id: val.id})} />
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Transfer ownership to:</FormLabel>
        <SelectBox label={"Owner"} options={ownerOptions} handleChange={handleChange} value={state.chosenOwner} name={"chosenOwner"}/>
        <Button variant="contained" onClick={() => handleTransfer('newOwnerId', state.chosenOwner, 'transfer')}>Transfer</Button>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Send Email: </FormLabel>
        <SelectBox label={"Type"} options={emailTypeOptions} handleChange={handleChange} value={state.chosenEmailType} name={"chosenEmailType"}/>
        <Button variant="contained" onClick={() => handleTransfer('emailTypeId', state.chosenEmailType, 'emailType')}>Send</Button>
      </div>
      <div style={innerDivStyle}>
        {/* <FormLabel style={labelStyle}>Declare Sale! </FormLabel> */}
        <Button variant="contained" onClick={() => handleTransfer('isSold', true, 'setSold')}>Declare Sale!</Button>
      </div>
    </div>
    }
    </>
  );
});

export default UpdateClient;
