import React from 'react';
import '../App.css';
import {db} from '../index'

class Home extends React.Component {
    startAccel = ()=>{
        window.addEventListener('deviceorientation', e =>
            console.log(e.alpha, e.beta, e.gamma)
        );

        let k = db.ref('users/').push().key
        db.ref('users/'+k).set({
            username: 'hakimhassani97',
            email: 'hakimhassani97@gmail.com',
            gyro: Math.random()
        });
        
    }
    render (){
        return (
            <div className="App">
                <header className="App-header">
                    <button style={{ backgroundColor: 'InfoBackground', height: '100px', border:'0', borderRadius: '50%', fontWeight: 'bolder', boxShadow: '0 0 solid black' }}
                        onClick={this.startAccel}>
                        Start Gyroscope
                    </button>
                </header>
            </div>
        );
    }
}

export default Home;
