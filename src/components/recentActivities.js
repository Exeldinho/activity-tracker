import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

const Activity = props => (
    <tr>
        <td>{moment(props.activity.activityStart).format('MMMM DD')}</td>
        <td>{props.activity.activityType}</td>
        <td>{props.activity.distance} km</td>
        <td>{activityDetails(props.activity.activityStart, props.activity.activityFinish).activityDuration} minutes</td>
        <td>{activityDetails(props.activity.activityStart, props.activity.activityFinish, props.activity.distance).activitySpeed} km / hour</td>
    </tr>
)
export function activityDetails(timeStart, timeFinish, distance) {

    let admission = moment(timeStart, 'DD-MM-YYYY HH:mm');
    let discharge = moment(timeFinish, 'DD-MM-YYYY HH:mm');
    let duration = (discharge.diff(admission, 'minutes'))
    return {
        activityDuration: duration,
        activitySpeed: (distance/(duration/60)).toFixed(1),
    };
};


export default class RecentActivities extends Component {
    constructor(props) {
        super(props);

        this.state = { activities: []};
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

    componentDidUpdate(prevProps) {
        if (prevProps.updateChild !== this.props.updateChild) {
            axios.get('http://localhost:5000/')
                .then(response => {
                    this.setState({activities: response.data})

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    };

    activityList(){
        return this.state.activities.map(currentactivity => {
            return <Activity activity={currentactivity} key={currentactivity._id}/>;
        })
    }

    render() {
        return (
            <div className="recentActivities">
            <table class="table">
                <tbody>
                {this.activityList()}
                </tbody>
            </table>

            </div>
        )
    }
}