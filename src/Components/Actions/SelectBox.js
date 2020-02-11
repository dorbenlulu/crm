import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

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
  const [state, setState] = React.useState({
    age: "",
    name: "hai"
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  //   React.useEffect(() => {
  //     setLabelWidth(inputLabel.current.offsetWidth);
  //   }, []);

  // const handleChange = name => event => {
  //   console.log(`name is ${name}, and value is ${event.target.value}`);
  //   setState({
  //     ...state,
  //     [name]: event.target.value
  //   });
  // };

  const {label, options, name, value} = props
  options.forEach(option => console.log(option))
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
