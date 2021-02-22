import React from 'react';
import '../App.css';
import firebase from 'firebase'
import PlayArrow from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import Pause from '@material-ui/icons/Pause';
import { IconButton } from '@material-ui/core';
import { initAuth } from '../Helpers/Auth';
import ThemeConfig from '../Constantes/Theme'

if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientation is supported");
} else if (window.OrientationEvent) {
    console.log("MozOrientation is supported");
}
if (window.DeviceMotionEvent) {
    console.log("DeviceMotionEvent is supported");
}

let k
let lastInsert = new Date()
let frequency = 100
// let data = []

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {recording: false, uid: initAuth(firebase.database())}
    }
    startAccel = ()=>{
        if(this.state.recording === false){
            this.setState({recording: true}, ()=>{
                window.ondeviceorientation = null
                window.addEventListener('deviceorientation', this.handleOrientation)
            })
        }else{
            this.setState({recording: false})
        }
    }
    handleOrientation = (e)=>{
        if(this.state.recording){
            window.ondevicemotion = null
            window.addEventListener('devicemotion', (v)=>this.handleMotion(v, {
                gyro: {alpha:e.alpha, beta:e.beta, gamma:e.gamma},
                date: new Date().toISOString()
            }));
        }
    }
    handleMotion = (e, obj)=>{
        if(this.state.recording){
            if(new Date() - lastInsert > frequency){
                k = firebase.database().ref('users/'+this.state.uid+'/').push().key
                firebase.database().ref('users/'+this.state.uid+'/'+k).set({
                    accel: {acceleration: Math.random(), accelerationIncludingGravity: Math.random(), rotationRate: Math.random()},
                    ...obj
                });
                lastInsert = new Date()
            }
        }
    }
    render (){
        return (
            <div className="App">
                <header className="App-header" style={{backgroundColor:'white'}}>
                    {/* <Button
                        style={{ backgroundColor: this.state.recording ? ThemeConfig.danger : ThemeConfig.success, height: '20vh', width:'20vh', borderRadius: '50%', fontWeight: 'bolder', fontSize:'30px', color:'white' }}
                        variant="contained"
                        size="small"
                        startIcon={this.state.recording ? <Pause style={{ fontSize: 40 }} /> : <PlayArrow style={{ fontSize: 40 }} />}
                        onClick={this.startAccel}
                    >
                        {this.state.recording ? 'Stop' : 'Start'}
                    </Button> */}
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <IconButton
                            onClick={this.startAccel}
                            style={{backgroundColor: this.state.recording ? ThemeConfig.danger : ThemeConfig.success, color:'white'}}>
                            {this.state.recording ? <Pause style={{ fontSize: 40 }} /> : <PlayArrow style={{ fontSize: 40 }} />}
                        </IconButton>
                    </div>
                </header>
            </div>
        );
    }
}

export default Home;
