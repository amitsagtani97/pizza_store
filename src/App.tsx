import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import MyOrders from "./components/Dashboard/MyOrders/MyOrders";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Dashboard}/>
                <Route exact path = "/checkout" component = {Dashboard}/>
                <Route exact path = "/orders" component = {Dashboard}/>
                <Route exact path = "/login" component = {Login}/>
                <Route exact path = "/register" component = {Register}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
