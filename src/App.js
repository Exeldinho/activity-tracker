import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from './components/form';
import RecentActivities from "./components/recentActivities";
import Achievements from "./components/achievements";
import Totals from "./components/totals";

class App extends React.Component {
    render() {
        return (
            <div class="container">
            <header>Activity tracker</header>
                <Form/>
                <div class="row">
                    <div class="col-md-8">
                    <RecentActivities/>
                    </div>
                    <div class="col-md-4">
                        <Achievements/>
                        <Totals/>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
