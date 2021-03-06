import React, {Component} from 'react';
import axios from 'axios';


export default class Totals extends Component {
    constructor(props) {
        super(props)
        this.state = {activities: []}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then(response => {
                this.setState({activities: response.data})
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
        let total = 0
        this.state.activities.forEach(activity => {
            if (activity.activityType === activityType) {
                total += activity.distance
            }
        })
        return total
    }

    render() {
        return (
            <div className="totals">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td className="table_header">Total ride distance:</td>
                            <td>{this.activityRecords("Ride")} km</td>
                        </tr>
                        <tr>
                            <td className="table_header"> Total run distance:</td>
                            <td>{this.activityRecords("Run")} km</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


