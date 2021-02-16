import React from 'react';
import '../App.css';
import {db} from '../index'

class Home extends React.Component {
    startAccel = ()=>{
        // window.addEventListener('deviceorientation', e =>{
        //     let k = db.ref('users/').push().key
        //     db.ref('users/'+k).set({
        //         gyro: {alpha:e.alpha, beta:e.beta, gamma:e.gamma}
        //     });
        // });
        window.addEventListener('devicemotion', e =>{
            let k = db.ref('users/').push().key
            db.ref('users/'+k).set({
                accel: {acceleration:e.acceleration, accelerationIncludingGravity:e.accelerationIncludingGravity, rotationRate:e.rotationRate}
            });
        });
    }
    render (){
        return (
            <div className="App">
                <header className="App-header">
                    <button style={{ backgroundColor: 'InfoBackground', height: '20vh', width:'20vh', border:'0', borderRadius: '50%', fontWeight: 'bolder', fontSize:'30px', boxShadow: '0 0 solid black' }}
                        onClick={this.startAccel}>
                        Start
                    </button>
                </header>
            </div>
        );
    }
}

export default Home;
