import React from 'react';
import '../App.css';
import firebase from 'firebase'
import { isLoggedIn } from '../Helpers/Auth';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import KitchenIcon from '@material-ui/icons/Kitchen';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Routes from '../Constantes/Routes';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: '100%',
    },
});

const EnhancedTable = ({ rows, openDeleteDialogue }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>First name</StyledTableCell>
                        <StyledTableCell>Last name</StyledTableCell>
                        <StyledTableCell align="right">Age</StyledTableCell>
                        <StyledTableCell align="right">Gender</StyledTableCell>
                        <StyledTableCell align="right">Weight (Kg)</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.key}>
                            <StyledTableCell align="right">
                                <Avatar alt={row.firstname} src={row.img} style={{ marginBottom: '1rem', height: '60px', width: '60px' }}></Avatar>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.firstname}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.lastname}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.age}</StyledTableCell>
                            <StyledTableCell align="right">{row.gender}</StyledTableCell>
                            <StyledTableCell align="right">{row.weight}</StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton aria-label="delete" onClick={() => { openDeleteDialogue(row) }}>
                                    <DeleteIcon fontSize="small" style={{ color: 'red' }} />
                                </IconButton>
                                <Link to={Routes.wstats+'/'+row.key} style={{textDecoration:'none', color:'gray'}}>
                                    <IconButton aria-label="details">
                                        <LinkIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                <Link to={Routes.wsitting+'/'+row.key} style={{textDecoration:'none', color:'gray'}}>
                                    <IconButton aria-label="details">
                                        <EventSeatIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                <Link to={Routes.wstep+'/'+row.key} style={{textDecoration:'none', color:'gray'}}>
                                    <IconButton aria-label="walking">
                                        <DirectionsWalkIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                <Link to={Routes.wtemp+'/'+row.key} style={{textDecoration:'none', color:'gray'}}>
                                    <IconButton aria-label="temperature">
                                        <AcUnitIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                                <Link to={Routes.wdoor+'/'+row.key} style={{textDecoration:'none', color:'gray'}}>
                                    <IconButton aria-label="ref">
                                        <KitchenIcon fontSize="small" />
                                    </IconButton>
                                </Link>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

class WHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = { uid: isLoggedIn()?.uid, rows: [], data: [], search: '', dialogue: false, deletedUser:null }
    }
    componentDidMount = () => {
        firebase.database().ref('users/').on('value', (snapshot) => {
            var data = []
            snapshot.forEach((childSnapshot) => {
                var d = childSnapshot.val()
                data.push({ key: childSnapshot.key, ...d?.profile })
            });
            this.setState({ rows: data, data })
        })
    }
    filterTable = () => {
        var rows = this.state.data.filter((x, i) => {
            if (JSON.stringify(x).includes(this.state.search)) {
                return true
            }
            return false
        })
        this.setState({ rows })
    }
    DeleteDialogue = ({ yes, closeDeleteDialogue, open, user }) => {
        return (
            <Dialog
                open={open}
                onClose={closeDeleteDialogue}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Deleting the user"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the user {user?.firstname+' '+user?.lastname} and all its associated data ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialogue} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={yes} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
    closeDeleteDialogue = () => {
        this.setState({ dialogue: false });
    }
    openDeleteDialogue = (row) => {
        this.setState({deletedUser:row}, ()=>{
            this.setState({ dialogue: true })
        })
    }
    deleteElderly = ()=>{
        firebase.database().ref('users/'+this.state.deletedUser?.key).remove()
        .then(()=>{
            this.setState({ dialogue: false })
        })
    }
    render() {
        return (
            <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'black', padding: '80px 20px' }}>
                <EnhancedTable rows={this.state.rows} openDeleteDialogue={this.openDeleteDialogue}></EnhancedTable>
                <this.DeleteDialogue
                    closeDeleteDialogue={this.closeDeleteDialogue}
                    yes={this.deleteElderly}
                    open={this.state.dialogue}
                    user={this.state.deletedUser}>
                </this.DeleteDialogue>
            </div>
        );
    }
}

export default WHome;
