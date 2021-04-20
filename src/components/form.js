import React, {Component} from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.onChangeActivityStart = this.onChangeActivityStart.bind(this);
        this.onChangeActivityFinish = this.onChangeActivityFinish.bind(this);
        this.onChangeDistance = this.onChangeDistance.bind(this);
        this.onChangeActivityType = this.onChangeActivityType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            activityStart: new Date(),
            activityFinish: new Date(),
            distance: 0,
            activityType: []
        }
    }

    componentDidMount() {
        this.setState({
            activityType: ['true']
        })
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

       // window.location = '/';
    }

    render() {
        return (
            <div className="form">





                <p>Form component</p>
            </div>
        )
    }
}
