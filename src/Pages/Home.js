import React from 'react';
import '../App.css';
import {db, uid} from '../index'
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';

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
        this.state = {recording: false}
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
                k = db.ref('users/'+uid+'/').push().key
                db.ref('users/'+uid+'/'+k).set({
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
                <header className="App-header">
                    <button style={{ backgroundColor: this.state.recording ? 'red' : 'green', height: '20vh', width:'20vh', border:'0', borderRadius: '50%', fontWeight: 'bolder', fontSize:'30px', boxShadow: '0 0 solid black', color:'white' }}
                        onClick={this.startAccel}>
                        {this.state.recording ? 'Stop' : 'Start'}
                    </button>
                    <Button
                        variant="contained"
                        color= {this.state.recording ? 'secondary' : 'primary'}
                        size="small"
                        startIcon={this.state.recording ? <Pause></Pause> : <PlayArrow />}
                    >
                        {this.state.recording ? 'Stop' : 'Start'}
                    </Button>
                </header>
            </div>
        );
    }
}

export default Home;
