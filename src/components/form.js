import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import RecentActivities from "./recentActivities";
import Achievements from "./achievements";
import Totals from "./totals";

export default class Form extends Component {
    constructor(props) {
        super(props)

        this.onChangeActivityStart = this.onChangeActivityStart.bind(this)
        this.onChangeActivityFinish = this.onChangeActivityFinish.bind(this)
        this.onChangeDistance = this.onChangeDistance.bind(this)
        this.onChangeActivityType = this.onChangeActivityType.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            activityStart: '',
            activityFinish: '',
            distance: '',
            activityType: '',
            updateChild: ''
        }
    }

        componentDidMount() {
            this.setState ({ updateChild: false})
        }

        onChangeActivityStart (date) {
            this.setState({
                activityStart: date
            })
        }

        onChangeActivityFinish (date) {
            this.setState({
                activityFinish: date
            })

        }

        onChangeDistance (e) {
            this.setState({
                distance: e.target.value
            })

        }

        onChangeActivityType (e) {
            this.setState({
                activityType: e.target.value
            })
        }

        onSubmit(e) {
            e.preventDefault()

            const activity = {
                activityStart: this.state.activityStart,
                activityFinish: this.state.activityFinish,
                distance: this.state.distance,
                activityType: this.state.activityType
            }
             axios.post('http://localhost:5000/', activity)
                .then (res => {
                    this.setState({
                        activityStart: '',
                        activityFinish: '',
                        distance: '',
                        activityType: '',
                        updateChild: true,
                    })
                })
            window.location.reload(true)
          }

        render() {
            return (
                <div className="form">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-inline">

                            <label>Add new activity:</label>

                            <div className="col-auto">

                                <DatePicker className="form-group"
                                            type="date"
                                            selected={this.state.activityStart}
                                            onChange={this.onChangeActivityStart}
                                            placeholderText={"Start time"}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={1}
                                            dateFormat="HH:mm"
                                />
                            </div>

                            <div className="col-auto">
                                <DatePicker className="form-group"
                                            selected={this.state.activityFinish}
                                            onChange={this.onChangeActivityFinish}
                                            placeholderText="Finish time"
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={1}
                                            dateFormat="HH:mm"
                                />
                            </div>

                            <div className="col-auto">
                        <input
                            type="text"
                            size="5"
                            className="form-group"
                            value={this.state.distance}
                            onChange={this.onChangeDistance}
                            placeholder="Distance"
                            required
                        />
                    </div>

                            <div className="col-auto">
                        <select className = "form-group" onChange={this.onChangeActivityType}>>
                            <option selected disabled>Select activity type</option>
                            <option value="Run">Run</option>
                            <option value="Ride">Ride</option>
                            type="text"
                            value={this.state.activityType}
                            required
                        </select>
                    </div>

                            <div className="col-auto">
                        <input
                            type="submit"
                            value="Save"
                            className="btn btn-primary form-group"
                        />
                    </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-md-8">
                            <RecentActivities updateChild={this.state.updateChild}/>
                        </div>
                        <div className="col-md-4">
                            <Achievements updateChild={this.state.updateChild}/>
                            <Totals updateChild={this.state.updateChild}/>
                        </div>
                    </div>
                </div>
            )
        }
    }


