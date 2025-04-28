import { useNavigate } from "react-router";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row, Container } from "react-bootstrap";
import { API_ENDPOINTS } from "../config/ApiConstant";
import axios from "axios";
import { LoginResponse } from "../types/AuthTypes";


export default function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState<string>("email@example.com");
    const [password, setPassword] = useState<string>("email@example.com");
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            //navigate("/home"); // Redirect to dashboard if already logged in
        }
    }, [token, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            // Clear any existing errors
            setError(null);

            // Make the API call
            const response = await axios.post<LoginResponse>(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            // Store the token in localStorage or context
            localStorage.setItem("token", response.data.token);
            console.log("Navigating to Home", response.data.message); // Debug log
            navigate("/home"); // Navigate to the Home screen
        }
        catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || "Invalid credentials.");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value); // Update state when input value changes
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value); // Update state when input value changes
    };

    return (
        <Container fluid className="d-flex vh-100">
            <Row className="m-auto">
                <Col>
                    <Form onSubmit={handleLogin}>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3">
                                Email
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control defaultValue="email@example.com" onChange={handleEmailChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3">
                                Password
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                            </Col>
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="primary" type="submit">Login</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}