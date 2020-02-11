
import React, {useState, useContext, useEffect} from "react";
import {observer} from 'mobx-react-lite'
import TextField from "@material-ui/core/TextField";
import SelectBox from "./SelectBox";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Select from 'react-select';
import StoreContext, {ClientStoreContext} from '../../Helpers/storeProvider'
import axios from 'axios'

const AddClient = observer(() => {

  const [state, setState] = React.useState({
    firstName: "",
    surname: "",
    country: "",
    owner: "",
    countries: []
  });

  const clients = useContext(StoreContext)

  useEffect(() => {

    axios.get('http://localhost:4000/allCountries')
    .then(response => {
      console.log("in componentDidMount: in first then. response is ", response);
      const data = response.data.map(country => country.name)
      setState({...state, countries: data})
      // clients.setOwners(data)
      // setOwners(data)
        // let counter = 0
        // clients.owners.forEach(owner => {console.log("owner is ", owner); counter++;})
        // owners.forEach(owner => {console.log("owner is ", owner); counter++;})
        // console.log('owners are ', owners);
        // console.log('counter is ', counter);
    })
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const clientToAdd = {
      name: `${state.firstName} ${state.surname}`,
      country: state.country,
      ownerId: state.owner
    }
    const response = await axios.post('http://localhost:4000/addNewClient', clientToAdd)
  }

  const handleChange = event => {
    const {name, value} = event.target
    setState({...state, [name]: value})
  }

  const labelStyle = {
    color: "black",
    paddingTop: "1%"
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h2 style={headerStyle}>Add Client:</h2>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>First Name: </FormLabel>
        <TextField id="standard-basic" name="firstName" value={state.firstName} onChange={handleChange}/>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Surname: </FormLabel>
        <TextField id="standard-basic" name="surname" value={state.surname} onChange={handleChange} />
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Country: </FormLabel>
        <TextField id="standard-basic" name="country" value={state.country} onChange={handleChange}/>
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Owner: </FormLabel>
        <SelectBox label={"Owner"} options={ownerOptions} handleChange={handleChange} value={state.owner} name={"owner"}/>
        {/* <TextField id="standard-basic" /> */}
        <br />
      </div>
      <div style={{position: "absolute"}}>
      <Button variant="contained" color="primary" type="submit" style={{left: "3vw"}}>
        Add New Client
      </Button>
      </div>
      </form>
    </div>
  );
});

export default AddClient;
