import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';


const Activity = props => (
    <tr><b>Longest {props.activity.activityType}</b>

    <td>{moment(props.activity.activityStart).format('MMM DD')}</td>
    <td>{props.activity.distance}</td>
    <td> minutes</td>
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
            })
            .catch((error) => {
                console.log(error);
            })
    }
    activityRecords(activityType) {
        let max = 0;
        this.state.activities.forEach(activity => {
            if (activity.distance > max && activity.activityType === activityType) {
                max = activity.distance;
            }
        })
        return this.state.activities.filter(activity => activity.distance === max).map(filteredActivity => {
            return <Activity activity={filteredActivity} key={filteredActivity._id}/>; })
           // <li>
           // {console.log(filteredActivity.distance)};
          //  </li>))
    }



      //  {people.filter(person => person.age < 60).map(filteredPerson => (
       //         {filteredPerson.name}
 //   activityListRecords(){
   //     return this.state.activities.map(currentactivity => {
     //       return <Activity activity={currentactivity} key={currentactivity._id}/>;
   //        })


    render() {
        return (
            <div className="recentActivities">
                <table className="table">
                    <tbody>
                    {this.activityRecords("Run")}
                    {this.activityRecords("Ride")}
                    </tbody>
                </table>

            </div>
        )
    }
}

