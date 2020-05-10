import React, {useState, useEffect, useContext } from 'react';
// import TodoItemClass  from "../stores/TodoItem";
// import {useStore} from "../helpers/use-store";
// import {onEnterPress} from "../helpers/use-enter";
import data from '../../data'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Loader from './Loader/Loader'
import Popup from "reactjs-popup";
import ClientPopUp from './ClientPopUp'
import StoreContext, {ClientStoreContext} from '../../Helpers/storeProvider'
import {observer} from 'mobx-react-lite'
import axios from 'axios'
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});



const Clients = observer((props) => {
    // const [clients, setClients] = useState([])
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const clients = useContext(StoreContext)
    const ClientStore = useContext(ClientStoreContext)
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clients.list.length - page * rowsPerPage);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      axios.get('http://localhost:4000/allClients')
      .then(response => {
        console.log("in componentDidMount: in first then. response is ", response);
        const data = response.data
        const tempClients = []
        data.forEach(client => tempClients.push(new ClientStore(client)))
        clients.list = tempClients;
        console.log(data.length);
      })
    }, [])

    const headlineStyle = {
      fontSize: "1vw"
    }
    return (
        <>
        {clients.list.length === 0 ? <Loader /> :
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
              <TableRow >
                <TableCell align="center" style={headlineStyle}><b>Name</b></TableCell>
                <TableCell align="center" style={headlineStyle}><b>Surname</b></TableCell>
                <TableCell align="center" style={headlineStyle}><b>Country</b></TableCell>
                <TableCell align="center" style={headlineStyle}><b>First Contact</b></TableCell>
                <TableCell align="center" style={headlineStyle}><b>Email</b></TableCell>
                <TableCell align="center" style={headlineStyle}><b>Sold</b></TableCell>
                <TableCell align="center" style={headlineStyle}><b>Owner</b></TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? clients.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : clients.list
            ).map(client => { return (
                <Popup key={client.id} trigger={<TableRow key={client.id} >
                <TableCell component="th" align="center" scope="row">
                  {client.firstName}
                </TableCell>
                <TableCell align="center">{client.surname}</TableCell>
                <TableCell align="center">{client.country}</TableCell>
                <TableCell align="center">{client.firstContact}</TableCell>
                <TableCell align="center">{client.email}</TableCell>
                <TableCell align="center">{client.sold ? "Sold" : "Not sold"}</TableCell>
                <TableCell align="center">{client.owner}</TableCell>
              </TableRow>} modal>{(close) => <ClientPopUp key={client.id} close={close} client={client}/>}
              </Popup>
              
            )})}
  
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={clients.list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
        }
      </>
    );
});

export default Clients