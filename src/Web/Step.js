import React from 'react'
import { Bar } from 'react-chartjs-2'
import firebase from 'firebase'

export default class Step extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: props.match.params?.uid, data: [],
        }
    }
    loadData = () => {
        firebase.database().ref('users/' + this.state.uid + '/profile/steps')
            .limitToLast(15)
            .on('value', (snapshot) => {
                var data = {
                    labels: [],
                    datasets: [
                        {
                            type: 'line',
                            label: '',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 2,
                            fill: false,
                            data: [],
                        },{
                            type: 'bar',
                            label: 'Number of steps in the last 15 days',
                            backgroundColor: 'rgba(255, 159, 64)',
                            // backgroundColor: [
                            //     'rgba(255, 99, 132, 0.2)',
                            //     'rgba(54, 162, 235, 0.2)',
                            //     'rgba(255, 206, 86, 0.2)',
                            //     'rgba(75, 192, 192, 0.2)',
                            //     'rgba(153, 102, 255, 0.2)',
                            //     'rgba(255, 159, 64, 0.2)'
                            // ],
                            data: [],
                        },
                    ],
                }
                snapshot.forEach((childSnapshot) => {
                    var d = childSnapshot.val()
                    data.labels.push(childSnapshot.key)
                    data.datasets[0].data.push(d.steps)
                    data.datasets[1].data.push(d.steps)
                });
                this.setState({ data })
            })
    }
    componentDidMount = () => {
        this.loadData()
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
                    <div style={{ height: '80vh', width: '90%' }}>
                        <Bar data={this.state.data} options={options} />
                    </div>
                </div>
            </>
        );
    }
}