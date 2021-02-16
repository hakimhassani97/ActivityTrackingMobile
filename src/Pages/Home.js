import React from 'react';
import '../App.css';
import {db, uid} from '../index'

if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientation is supported");
} else if (window.OrientationEvent) {
    console.log("MozOrientation is supported");
}
if (window.DeviceMotionEvent) {
    console.log("DeviceMotionEvent is supported");
}

let k

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
            k = db.ref('users/'+uid+'/').push().key
            db.ref('users/'+uid+'/'+k).set({
                accel: {acceleration: Math.random(), accelerationIncludingGravity: Math.random(), rotationRate: Math.random()},
                ...obj
            });
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
                </header>
            </div>
        );
    }
}

export default Home;
