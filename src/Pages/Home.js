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

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {recording: false}
    }
    startAccel = ()=>{
        if(this.state.recording === false){
            this.setState({recording: true}, ()=>{
                window.addEventListener('deviceorientation', e =>{
                    let k = db.ref('users/'+uid+'/').push().key
                    db.ref('users/'+uid+'/'+k).set({
                        gyro: {alpha:e.alpha, beta:e.beta, gamma:e.gamma}
                    });
                });
                window.addEventListener('devicemotion', e =>{
                    let k = db.ref('users/'+uid+'/').push().key
                    db.ref('users/'+uid+'/'+k).set({
                        name: 'hakim',
                        accel: {acceleration:e.acceleration, accelerationIncludingGravity:e.accelerationIncludingGravity, rotationRate:e.rotationRate}
                    });
                }, false);
            })
        }else{
            this.setState({recording: false}, ()=>{
                window.ondeviceorientation = null
                window.ondevicemotion = null
            })
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
