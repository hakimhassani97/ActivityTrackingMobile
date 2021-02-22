import React from 'react';
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import firebase from 'firebase'
import { initAuth } from '../Helpers/Auth';

class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {uid: initAuth(firebase.database()), firstname:'', lastname:'', age:'', gender:'Male', weight:''}
    }
    componentDidMount = ()=>{
        this.loadUser()
    }
    loadUser = ()=>{
        return firebase.database().ref('users/'+this.state.uid+'/profile').once('value').then((snapshot) => {
            var {firstname, lastname, age, gender, weight} = (snapshot.val() && snapshot.val()) || {firstname:'', lastname:'', age:'', gender:'', weight:''};
            this.setState({firstname, lastname, age, gender, weight})
        })
    }
    saveUser = ()=>{
        firebase.database().ref('users/'+this.state.uid+'/profile').set({
            firstname:this.state.firstname, lastname:this.state.lastname, age:this.state.age, gender:this.state.gender, weight:this.state.weight
        })
    }
    render (){
        return (
            <div style={{marginTop:'60px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={require('../Images/avatar.jpg').default} style={{marginBottom:'1rem', height:'100px', width:'100px'}}></Avatar>
                <TextField onChange={(e)=>{this.setState({firstname:e.target.value})}} id="firstname" value={this.state.firstname} label="First name" variant="outlined" style={{marginBottom:'1rem', width:'70%'}} />
                <TextField onChange={(e)=>{this.setState({lastname:e.target.value})}} id="lastname" value={this.state.lastname} label="Last name" variant="outlined" style={{marginBottom:'1rem', width:'70%'}} />
                <TextField onChange={(e)=>{this.setState({age:e.target.value})}} id="age" value={this.state.age} label="Age" variant="outlined" style={{marginBottom:'1rem', width:'70%'}} />
                <FormControl variant="outlined" style={{marginBottom:'1rem', width:'70%'}}>
                    <InputLabel id="genderLabel">Gender</InputLabel>
                    <Select
                        labelId="genderLabel"
                        id="demo-simple-select-outlined"
                        value={this.state.gender}
                        onChange={(e)=>{this.setState({gender:e.target.value})}}
                        >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                </FormControl>
                <TextField onChange={(e)=>{this.setState({weight:e.target.value})}} id="weight" value={this.state.weight} label="Weight" variant="outlined" style={{marginBottom:'1rem', width:'70%'}} />
                <Button onClick={()=>{this.saveUser()}} variant="contained" href="#outlined-buttons" color="primary" style={{marginBottom:'1rem', width:'70%'}}>
                    Save
                </Button>
            </div>
        );
    }
}

export default Profile;
