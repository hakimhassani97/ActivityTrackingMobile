import React from 'react';
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import firebase from 'firebase'
import {isLoggedIn} from '../Helpers/Auth'

class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state = {uid: isLoggedIn()?.uid, firstname:'', lastname:'', age:'', gender:'Male', weight:'', img:'', file:null}
    }
    componentDidMount = ()=>{
        this.loadUser()
    }
    loadUser = ()=>{
        return firebase.database().ref('users/'+this.state.uid+'/profile').once('value').then((snapshot) => {
            var {firstname, lastname, age, gender, weight, img} = (snapshot.val() && snapshot.val()) || {firstname:'', lastname:'', age:'', gender:'', weight:'', img:''};
            this.setState({firstname, lastname, age, gender, weight, img})
        })
    }
    saveUser = ()=>{
        firebase.database().ref('users/'+this.state.uid+'/profile').set({
            firstname:this.state.firstname, lastname:this.state.lastname, age:this.state.age, gender:this.state.gender, weight:this.state.weight,
            img:this.state.img
        })
    }
    uploadImg = ()=>{
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { 
            if(e.target.files.length>0){
                var file = e.target.files[0]
                this.setState({file})
                var storageRef = firebase.storage().ref('images/'+this.state.uid);
                storageRef.put(file).then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                    .then(url=>{
                        firebase.database().ref('users/'+this.state.uid+'/profile').update({
                            img:url
                        })
                        this.setState({img:url})
                    })
                });
            }
        }
        input.click()
        input.remove()
    }
    render (){
        return (
            <div style={{marginTop:'60px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'4% 0'}}>
                <Avatar onClick={()=>{this.uploadImg()}} alt="Remy Sharp" src={this.state.img} style={{marginBottom:'1rem', height:'100px', width:'100px'}}></Avatar>
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
                <Button onClick={()=>{this.saveUser()}} variant="contained" color="primary" style={{marginBottom:'1rem', width:'70%'}}>
                    Save
                </Button>
            </div>
        );
    }
}

export default Profile;
