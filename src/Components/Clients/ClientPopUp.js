import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSignUpForm from "./CustomHooks";

const ClientPopUp = ({close}) => {
  // const [register, handleSubmit] = useForm();
  // const [firstName, setFirstName] = useState('')
  // const [surname, setSurname] = useState('')
  // const [country, setCountry] = useState('')

  const signup = () => {
    console.log(`User Created!
               Name: ${inputs.firstName} ${inputs.surname}
               Email: ${inputs.country}`);
    
    close()
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(signup);
  // const onSubmit = (data) => {
  //     // event.preventDefault()
  //     // console.log(`${firstName} ${surname} lives now in ${country}`);
  //     console.log(data)

  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={handleInputChange}
          />
        </span>
        <span>
          Surename:{" "}
          <input
            type="text"
            name="surname"
            value={inputs.surname}
            onChange={handleInputChange}
          />
        </span>
        <span>
          Country:{" "}
          <input
            type="text"
            name="country"
            value={inputs.country}
            onChange={handleInputChange}
          />
        </span>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ClientPopUp;
