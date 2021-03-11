import React from 'react'
import { Bar } from 'react-chartjs-2'
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default class Temp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: props.match.params?.uid, data: [], steps:0, open:false, saverity:'error', msg:''
        }
    }
    loadData = () => {
        var yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        firebase.database().ref('users/' + this.state.uid + '/raspberry').orderByChild('date')
            .startAt(yesterday.toISOString()).endAt(new Date().toISOString())
            .limitToLast(40)
            .on('value', (snapshot) => {
                var data = {
                    labels: [],
                    datasets: [
                        {
                            type: 'line',
                            label: 'Temperature (°c)',
                            backgroundColor: 'rgb(75, 192, 192, 0.5)',
                            data: [],
                        },
                        {
                            type: 'line',
                            label: 'Humidity',
                            backgroundColor: 'rgb(255, 99, 132, 0.5)',
                            data: [],
                        },
                    ],
                }
                snapshot.forEach((childSnapshot) => {
                    var d = childSnapshot.val()
                    var ms = new Date(d.date).getSeconds()
                    data.labels.push(ms)
                    data.datasets[0].data.push(d.temperature)
                    data.datasets[1].data.push(d.humidity)
                    if(!this.state.open){
                        let msg = ''
                        if(d.temperature > 30 || d.temperature<10){
                            msg += 'Dangerous levels : Temperature = '+parseInt(d.temperature)
                        }
                        if(d.humidity > 30 || d.humidity<10){
                            if(msg=='') msg += 'Dangerous levels :'
                            else msg += ' and'
                            msg += ' Humidity = '+parseInt(d.humidity)
                        }
                        if(msg!='') this.setState({open:true, msg})
                    }
                });
                this.setState({ data })
            })
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open:false});
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
        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        }
        return (
            <>
                <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'black', padding: '80px 20px' }}>
                    <div style={{ maxHeight: '80vh', width: '90%' }}>
                        <Bar data={this.state.data} options={options} />
                    </div>
                    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <MuiAlert onClose={this.handleClose} elevation={6} variant="filled" severity={this.state.saverity}>{this.state.msg}</MuiAlert>
                    </Snackbar>
                </div>
            </>
        );
    }
}