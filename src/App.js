import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from './components/form';

class App extends React.Component {
    render() {
        return (
            <div class="container">
            <header>Activity tracker</header>
                <Form/>
            </div>
        );
    }
}

export default App;
