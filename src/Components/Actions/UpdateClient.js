import React, {useEffect, useContext} from "react";
import TextField from "@material-ui/core/TextField";
import SelectBox from "./SelectBox";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import StoreContext from '../../Helpers/storeProvider'
import axios from 'axios'
const UpdateClient = () => {


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
    firstName: "",
    surname: "",
    chosenOwner: "",
    chosenEmailType: "",

  });
  let owners = [];
  useEffect(() => {
    setTimeout(() => {
      console.log('in componentDidMount:');
      
        owners = clients.getOwners()
        clients.owners = owners

        let counter = 0
        clients.owners.forEach(owner => {console.log("owner is ", owner); counter++;})
        console.log('owners are ', owners);
        console.log('counter is ', counter);

    }, 100)
  }, [])

  const handleTransfer = (fieldToUpdate, value, route) => {

    const {firstName, surname} = state
    const userId = clients.findUserIdByName(firstName, surname)
    const transferInfo = {
      userId,
      [fieldToUpdate]: value
    }

    console.log('transfer data is ', transferInfo, ' and route is ', route );
    


    // axios.put("http://localhost:4000/transfer",newTransactionToAdd);
  }

  const handleChange = event => {
    const {name, value} = event.target
    console.log(`name is ${name}, and value is ${value}`);
    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <div>
      <h2 style={headerStyle}>Update Client</h2>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Client Name:</FormLabel>
        <TextField id="standard-basic" label="Name" name={"firstName"} value={state.firsName} onChange={handleChange}/>
        <TextField id="standard-basic" label="Last Name" name={"surname"} value={state.surname} onChange={handleChange}/>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Transfer ownership to:</FormLabel>
        <SelectBox label={"Owner"} options={clients.owners} handleChange={handleChange} value={state.chosenOwner} name={"chosenOwner"}/>
        <Button variant="contained" onClick={() => handleTransfer('ownerToUpdate', state.chosenOwner, 'owner')}>Transfer</Button>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Send Email: </FormLabel>
        <SelectBox label={"Type"} options={["A", "B", "C"]} handleChange={handleChange} value={state.chosenEmailType} name={"chosenEmailType"}/>
        <Button variant="contained" onClick={() => handleTransfer('emailTypeToUpdate', state.chosenEmailType, 'emailType')}>Send</Button>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Declare Sale! </FormLabel>
        <Button variant="contained">Declare</Button>
      </div>
    </div>
  );
};

export default UpdateClient;
