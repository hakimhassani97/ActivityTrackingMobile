import React from 'react';
import '../App.css';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <button style={{ backgroundColor: 'InfoBackground', height: '100px', borderRadius: '50%', fontWeight: 'bolder', boxShadow: '0 0 solid black' }}>
                    Gyroscope
                </button>
            </header>
        </div>
    );
}

export default Home;
