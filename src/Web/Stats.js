import React from 'react'
import { Bar } from 'react-chartjs-2'
import firebase from 'firebase'
import KalmanFilter from 'kalmanjs'

var stepIds = []
export default class Stats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: props.match.params?.uid, data: [], steps:0
        }
    }
    loadData = () => {
        firebase.database().ref('users/' + this.state.uid + '/data').orderByChild('date')
            .limitToLast(40)
            .on('value', (snapshot) => {
                var data = {
                    labels: [],
                    datasets: [
                        {
                            type: 'line',
                            label: 'Alpha',
                            backgroundColor: 'rgb(75, 192, 192)',
                            data: [],
                        },{
                            type: 'line',
                            label: 'Beta',
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: [],
                        },{
                            type: 'line',
                            label: 'Gamma',
                            backgroundColor: 'rgb(132, 255, 132)',
                            data: [],
                        },
                    ],
                }
                snapshot.forEach((childSnapshot) => {
                    var d = childSnapshot.val()
                    var ms = new Date(d.date).getSeconds()
                    data.labels.push(ms)
                    data.datasets[0].data.push(d.gyro?.alpha)
                    data.datasets[1].data.push(d.gyro?.beta)
                    data.datasets[2].data.push(d.gyro?.gamma)
                });
                var kf = new KalmanFilter({R: 0.01, Q: 3});
                // data.datasets[0].data = data.datasets[0].data.map(v=>kf.filter(v))
                // data.datasets[1].data = data.datasets[1].data.map(v=>kf.filter(v))
                // data.datasets[2].data = data.datasets[2].data.map(v=>kf.filter(v))
                this.setState({ data })
            })
    }
    componentDidMount = () => {
        this.loadData()
        this.loadSteps()
    }
    loadSteps = ()=>{
        var dd = new Date().toLocaleDateString().replace(/\//g, '-')
        firebase.database().ref('users/' + this.state.uid + '/profile/steps/'+dd)
        .on('value', (snapshot) => {
            var steps = snapshot.val()?.steps || 0
            this.setState({steps})
        })
    }
    render = () => {
        return (
            <>
                <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'black', padding: '80px 20px' }}>
                    <div style={{ height: '80vh', width: '90%' }}>
                        <h4>Steps today : {this.state.steps} Steps</h4>
                        <Bar data={this.state.data} />
                    </div>
                </div>
            </>
        );
    }
}