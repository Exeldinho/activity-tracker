import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Activity = props => (
    <tr>
        <td>{props.activity.activityStart}</td>
        <td>{props.activity.activityType}</td>
        <td>{props.activity.distance} km</td>
        <td>minutes</td>
        <td>km/hour</td>
    </tr>
)





export default class RecentActivities extends Component {
    constructor(props) {
        super(props);

        this.state = {activities: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then (response => {
                this.setState ({activities: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    activityList(){
        return this.state.activities.map(currentactivity => {
            return <Activity activity={currentactivity} key={currentactivity._id}/>;
        })
    }

    render() {
        return (
            <div className="recentActivities">
            <table className="table">

                <tbody>
                {this.activityList()}
                </tbody>
            </table>

            </div>
        )
    }
}