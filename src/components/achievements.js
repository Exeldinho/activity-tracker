import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import {activityDetails} from "./recentActivities";

const Activity = props => (
    <tbody>
        <tr>
           <td colSpan="3" className="table_header">Longest {props.activity.activityType}:</td>
        </tr>
        <tr>
           <td>{moment(props.activity.activityStart).format('MMM DD')}</td>
           <td>{props.activity.distance} km</td>
           <td>{activityDetails(props.activity.activityStart, props.activity.activityFinish).activityDuration} m</td>
        </tr>
    </tbody>
)

export default class Achievements extends Component {
    constructor(props) {
        super(props)
        this.state = {activities: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then (response => {
                this.setState ({activities: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.updateChild !== this.props.updateChild) {
            axios.get('http://localhost:5000/')
                .then(response => {
                    this.setState({activities: response.data})
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    activityRecords(activityType) {
        let max = 0
        this.state.activities.forEach(activity => {
            if (activity.distance > max && activity.activityType === activityType) {
                max = activity.distance
              }
        })

        return this.state.activities.filter(activity => activity.distance === max).map(filteredActivity => {
                 return <Activity activity={filteredActivity} key={filteredActivity._id}/>
        })
    }

    render() {
        return (
            <div className="Achievements">
                    <table className="table table-borderless">
                        {this.activityRecords("Ride")}
                        {this.activityRecords("Run")}
                    </table>
            </div>
        )
    }
}

