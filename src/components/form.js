import React, {useState, useEffect, Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.onChangeActivityStart = this.onChangeActivityStart.bind(this);
        this.onChangeActivityFinish = this.onChangeActivityFinish.bind(this);
        this.onChangeDistance = this.onChangeDistance.bind(this);
        this.onChangeActivityType = this.onChangeActivityType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            activityStart: '',
            activityFinish: '',
            distance: '',
            activityType: ''
        }
        this.baseState = this.state;
    }

    //componentDidMount() {
    //   this.setState({
     //       activityType: ['true']
   //     })
   // }

    onChangeActivityStart (date) {
        this.setState({
            activityStart: date
        })
    }

    onChangeActivityFinish (date) {
        this.setState({
            activityFinish: date
        })

    }  onChangeDistance (e) {
        this.setState({
            distance: e.target.value
        })

    }  onChangeActivityType (e) {
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
        console.log (activity)
        this.setState(this.baseState);
       // axios.post('http://localhost:5000/', activity)
       //     .then(res => console.log(res.data));
       //  window.location.reload(true);
       // alert('Send to database..')

    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.onSubmit}>

                    <span className="form-group">
                    <label>Add new activity:</label>
                    <DatePicker className="form-group"
                        selected={this.state.activityStart}
                        onChange={this.onChangeActivityStart}
                        placeholderText={"Start time"}
                        showTimeSelect
                        timeIntervals={1}
                        dateFormat="HH:mm"
                    />
                    </span>

                    <span className="form-group">
                    <DatePicker className="form-group"
                        selected={this.state.activityFinish}
                        onChange={this.onChangeActivityFinish}
                        placeholderText="Finish time"
                        showTimeSelect
                       // timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="HH:mm" //DD/MM/YYYY HH:mm:ss d MMM Y HH:mm
                    />
                    </span>

                    <span className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.distance}
                            onChange={this.onChangeDistance}
                            placeholder="Distance"
                        />
                    </span>

                    <span className="form-group">
                        <select onChange={this.onChangeActivityType}>>
                            <option selected disabled>Select activity type</option>
                            <option value="Run">Run</option>
                            <option value="Ride">Ride</option>
                            value={this.state.activityType}
                            required
                        </select>
                    </span>

                    <span className="form-group">
                        <input
                            type="submit"
                            value="Save"
                            className="button"
                            />
                    </span>

                </form>
            </div>
        )
    }
}
