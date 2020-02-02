import React from "react";
import TextField from "@material-ui/core/TextField";
import SelectBox from "./SelectBox";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const AddClient = () => {
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

  return (
    <div>
      <h2 style={headerStyle}>Add Client:</h2>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>First Name: </FormLabel>
        <TextField id="standard-basic" />
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Surname: </FormLabel>
        <TextField id="standard-basic" />
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Country: </FormLabel>
        <TextField id="standard-basic" />
      </div>
      <div style={innerDivStyle}>
        <FormLabel style={labelStyle}>Owner: </FormLabel>
        <TextField id="standard-basic" />
        <br />
      </div>
      <Button variant="contained" color="primary">
        Add New Client
      </Button>
    </div>
  );
};

export default AddClient;
