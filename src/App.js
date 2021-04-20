import React from 'react';
//import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from './components/form';
import RecentActivities from "./components/recentActivities";
import Achievements from "./components/achievements";
import Totals from "./components/totals";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Form/>

            </div>
        );
    }
}

//<RecentActivities/>
//<Achievements/>
//<Totals/>

export default App;
