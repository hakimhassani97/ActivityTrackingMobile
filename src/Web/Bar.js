import React from "react";
import { Chart } from "react-charts";
import firebase from 'firebase'

export default class Bar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            uid: props.match.params?.uid, data:[],
            axes:[{ primary: true, type: 'time', position: 'bottom' },{ type: 'linear', position: 'left', hardMax:1, hardMin:0 },]
        }
    }
    loadData = ()=>{
        firebase.database().ref('users/'+this.state.uid+'/data').orderByChild('date')
        .limitToLast(40)
        .on('value', (snapshot) => {
            var data = [{
                label: 'Alpha',
                data: [],
            },
            {
                label: 'Beta',
                data: [],
            },]
            snapshot.forEach((childSnapshot) => {
                var d = childSnapshot.val()
                data[0].data.push({ primary: new Date(d.date), secondary: d.gyro?.alpha<90 ? 1 : 0 },)
                data[1].data.push({ primary: new Date(d.date), secondary: d.gyro?.alpha>=90 ? 1 : 0 },)
            });
            this.setState({data})
        })
    }
    componentDidMount = ()=>{
        this.loadData()
    }
    render = ()=>{
        return (
            <>
                <div className="App" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'black', padding: '80px 20px' }}>
                    <div style={{ height: '80vh', width: '90%' }}>
                        <Chart data={this.state.data} series={({type: "bar"})} axes={this.state.axes} tooltip />
                    </div>
                </div>
            </>
        );
    }
}