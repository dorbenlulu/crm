import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const {label, options, name, value} = props
  return (
    <label>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
        <Select
          native
          value={value}
          onChange={props.handleChange}
          inputProps={{
            name: name,
            id: "age-native-simple"
          }}
        >
        <option value="" />
        {options.map((option, i) => <option key={option.id} value={option.id}>{option.value}</option> )}
        </Select>
      </FormControl>
    </label>
  );
}