import React from 'react'
import { Bar } from 'react-chartjs-2'
import firebase from 'firebase'

export default class Sitting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: props.match.params?.uid, data: [],
        }
    }
    smoothOut = (vector, variance) => {
        function avg(v) {
            console.log(v)
            return v.reduce((a,b) => a+b, 0)/v.length;
        }
        var t_avg = avg(vector) * variance;
        var ret = Array(vector.length);
        for (var i = 0; i < vector.length; i++) {
            (function () {
                var prev = i > 0 ? ret[i - 1] : vector[i];
                var next = i < vector.length ? vector[i] : vector[i - 1];
                ret[i] = avg([t_avg, avg([prev, vector[i], next])]);
            })();
        }
        return ret;
    }
    smoothArray = (array, smoothing)=>{
        var newArray = [];
        for (let i = 0; i < array.length; i++) {
            var sum = 0;
    
            for (let index = i - smoothing; index <= i + smoothing; index++) {
                var thisIndex = index < 0 ? index + array.length : index % array.length;
                sum += array[thisIndex];
            }
            newArray[i] = sum/((smoothing*2)+1);
        }
    
        return newArray;
    }
    smooth = (a, k)=>{
        for (let i=2;i<a.length-2;i++){
            if(a[i-1]==1 && a[i-2]==1 && a[i+1]==1 && a[i+2]==1 && a[i]!=1) a[i]=1
            else if(a[i-1]==-1 && a[i-2]==-1 && a[i+1]==-1 && a[i+2]==-1 && a[i]!=-1) a[i]=-1
        }
        return a
    }
    loadData = () => {
        firebase.database().ref('users/' + this.state.uid + '/data').orderByChild('date')
            .limitToLast(40)
            .on('value', (snapshot) => {
                var data = {
                    labels: [],
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Sitting position',
                            backgroundColor: 'rgb(75, 192, 192)',
                            data: [],
                        },{
                            type: 'bar',
                            label: 'Standing position',
                            backgroundColor: 'rgb(255, 99, 132)',
                            data: [],
                        },
                    ],
                }
                snapshot.forEach((childSnapshot) => {
                    var d = childSnapshot.val()
                    var ms = new Date(d.date).getSeconds()
                    data.labels.push(ms)
                    data.datasets[0].data.push(d.gyro?.alpha < 90 ? 1 : 0)
                    data.datasets[1].data.push(d.gyro?.alpha < 90 ? 0 : -1)
                });
                data.datasets[0].data = this.smooth(data.datasets[0].data, 2)
                data.datasets[1].data = this.smooth(data.datasets[1].data, 2)
                this.setState({ data })
            })
    }
    componentDidMount = () => {
        this.loadData()
    }
    render = () => {
        return (
            <>
                <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'black', padding: '80px 20px' }}>
                    <div style={{ height: '80vh', width: '90%' }}>
                        <Bar data={this.state.data} />
                    </div>
                </div>
            </>
        );
    }
}