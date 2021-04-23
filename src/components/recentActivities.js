import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

const Activity = props => (
    <tr>
        <td>{moment(props.activity.activityStart).format('MMMM DD')}</td>
        <td>{props.activity.activityType}</td>
        <td>{props.activity.distance} km</td>
        <td>{timeConvert(activityDetails(props.activity.activityStart, props.activity.activityFinish).activityDuration)}</td>
        <td>{activityDetails(props.activity.activityStart, props.activity.activityFinish, props.activity.distance).activitySpeed} km / hour</td>
    </tr>
)
export function activityDetails(timeStart, timeFinish, distance) {
    const admission = moment(timeStart, 'DD-MM-YYYY HH:mm')
    const discharge = moment(timeFinish, 'DD-MM-YYYY HH:mm')
    const duration = (discharge.diff(admission, 'minutes'))
    return {
        activityDuration: duration,
        activitySpeed: (distance/(duration/60)).toFixed(1)
    }
}

function timeConvert(min) {
      const num = min;
      const hours = (num / 60);
      const roundHours = Math.floor(hours);
      const minutes = (hours - roundHours) * 60;
      const roundMinutes = Math.round(minutes);
      if (num >= 60 ) {
          return +roundHours + " h " + roundMinutes + " m";
        }
      return roundMinutes + " minutes";
    }

export default class RecentActivities extends Component {
    constructor(props) {
        super(props)

        this.state = { activities: []}
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
                .then (response => {
                    this.setState({activities: response.data})
                })

                .catch((error) => {
                    console.log(error)
                })
        }
    }

    activityList(){
        const reverseList = [...this.state.activities].reverse()
        return reverseList.map(currentActivity => {
            return <Activity activity={currentActivity} key={currentActivity._id}/>;
        })
    }

    render() {
        return (
            <div className="recentActivities">
            <table className="table table-borderless">
                <tbody>
                    {this.activityList()}
                </tbody>
            </table>
            </div>
        )
    }
}