import React, { useContext } from "react";
import StoreContext from '../../Helpers/storeProvider'
import useSignUpForm from "./CustomHooks";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
const ClientPopUp = ({ client, close }) => {

  const clients = useContext(StoreContext)
  const signup = async () => {
    
    const clientToUpdate = {
      id: client.id,
      firstName: inputs.firstName ? inputs.firstName : client.firstName,
      surname: inputs.surname ? inputs.surname : client.surname,
      country: inputs.country ? inputs.country : client.country
    };
    
    console.log(`form details are
               Name: ${inputs.firstName} ${inputs.surname}
               Country: ${inputs.country}`);
    console.log(`clientToUpdate is
               Name: ${clientToUpdate.firstName} ${clientToUpdate.surname}
               Country: ${clientToUpdate.country}`);
    try {
      const response = await axios.put(
        "http://localhost:4000/updateClient",
        clientToUpdate
      );
      console.log("response is ", response.data);
      const updatedClient = response.data
      const index = clients.list.findIndex(client => client.id === updatedClient.id)
      clients.list[index].firstName = updatedClient.fullName.split(' ')[0]
      clients.list[index].surname = updatedClient.fullName.split(' ')[1]
      clients.list[index].country = updatedClient.countryName

    } catch (err) {
      console.log("In Popup. Error is ", err);
    }
    close();
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);
  // const onSubmit = (data) => {
  //     // event.preventDefault()
  //     // console.log(`${firstName} ${surname} lives now in ${country}`);
  //     console.log(data)

  // }

  const detailContainer = {
    margin: "5%",
  };


  console.log("client is ", client);
  return (
    <div>
      <div>
        <h3>
          Update {client.firstName} {client.surname}'s details:
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={detailContainer}>
          <TextField
            id="standard-basic"
            label="First Name"
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div style={detailContainer}>
          <TextField
            id="standard-basic"
            label="Surname"
            type="text"
            name="surname"
            value={inputs.surname}
            onChange={handleInputChange}
          />
        </div>
        <div style={detailContainer}>
          <TextField
            id="standard-basic"
            label="Country"
            type="text"
            name="country"
            value={inputs.country}
            onChange={handleInputChange}
          />
        </div>
        {/* <button type="submit">Update</button> */}

        <Button type="submit" color="secondary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default ClientPopUp;
