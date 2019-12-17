import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import './Login.scss';
import {AUTH_STORE} from "../../../store/stores";
import {AuthStore} from "../../../store/AuthStore";
import {inject} from "mobx-react";

interface LoginProps {
    [AUTH_STORE]?: AuthStore;
}

const Login: React.FC<LoginProps> = ({authStore}) => {

    const [email, setEmail]       = useState('theron95@gmail.com');
    const [password, setPassword] = useState('secret');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        authStore.login(email, password);
    };

    return (
        <div className = "d-flex justify-content-center mt-5 p-5">
            <Form className = "login" onSubmit = {handleSubmit}>
                <Form.Group controlId = "email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type = "email"
                                  placeholder = "Enter email"
                                  value = {email} required
                                  onChange = {(event: any) => setEmail(event.target.value)}/>
                </Form.Group>

                <Form.Group controlId = "password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type = "password"
                                  placeholder = "Password"
                                  value = {password} required
                                  onChange = {(event: any) => setPassword(event.target.value)}/>
                </Form.Group>
                <Button variant = "primary" type = "submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default inject(AUTH_STORE)(Login);
