import React from 'react'
import firebase from 'firebase'

export default class Door extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: props.match.params?.uid, data: [], refdoor: 'closed', window: 'closed'
        }
    }
    componentDidMount = () => {
        this.loadSteps()
    }
    loadSteps = ()=>{
        firebase.database().ref('users/' + this.state.uid + '/raspberry/')
        .limitToLast(1)
        .on('value', (snapshot) => {
            snapshot.forEach((child)=>{
                var refdoor = child.val()?.stick?.direction=='' ? 'closed' : 'open'
                this.setState({refdoor})
            })
        })
        firebase.database().ref('users/' + this.state.uid + '/raspberry/')
        .limitToLast(1)
        .on('value', (snapshot) => {
            snapshot.forEach((child)=>{
                var door = child.val()?.gyroscope?.yaw>=0 && child.val()?.gyroscope?.yaw<=180 ? 'closed' : 'open'
                this.setState({door})
            })
        })
    }
    render = () => {
        return (
            <>
                <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'black', padding: '80px 20px' }}>
                    <div style={{ height: '80vh', width: '90%' }}>
                        <h4>Refrigerator's door state : {this.state.refdoor}</h4>
                        <img src={this.state.refdoor=='open' ? require('../Images/refo.jpg').default : require('../Images/refc.jpg').default} style={{height:'100px'}} />
                        <h4>Window state : {this.state.door}</h4>
                        <img src={this.state.door=='open' ? require('../Images/wo.jpg').default : require('../Images/wc.jpg').default} style={{height:'100px'}} />
                    </div>
                </div>
            </>
        );
    }
}