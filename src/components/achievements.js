import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

const Activity = props => (
    <tr>
        Longest ride
    <td>Date</td>
    <td>5 km</td>
    <td>1h 35m</td>
Longest run:
    <td>Date</td>
    <td>6 km</td>
    <td>30 m</td>
</tr>
);

export default class Achievements extends Component {
    constructor(props) {
        super(props);

        this.state = {activities: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then (response => {
                this.setState ({activities: response.data})
                console.log({activities: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    activityRecords(activityType){
        let max = 0;
        this.state.activities.forEach(activity => {
                if (activity.distance > max && activity.activityType === activityType) {
                    max = activity.distance;
                }
        })
        return max
    }


        //return this.state.activities.map(currentactivity => {
       //     return <Activity activity={currentactivity} key={currentactivity._id}/>;
    //    })


    render() {
        return (
            <div className="recentActivities">
                <table className="table">
                    <tbody>

                    {this.activityRecords("Run")}
                    </tbody>
                </table>

            </div>
        )
    }
}

