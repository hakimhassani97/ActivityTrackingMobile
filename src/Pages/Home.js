import React from 'react';
import '../App.css';
import 'firebase'

class Home extends React.Component {
    constructor(props){
        super(props)
    }
    render (){
        return (
            <div className="App">
                <header className="App-header">
                    <button style={{ backgroundColor: 'InfoBackground', height: '100px', border:'0', borderRadius: '50%', fontWeight: 'bolder', boxShadow: '0 0 solid black' }}>
                        Gyroscope
                    </button>
                </header>
            </div>
        );
    }
}

export default Home;
