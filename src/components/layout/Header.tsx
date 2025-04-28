import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/ApiConstant";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../services/httpService";


const Header = () => {
    const [user, setUser] = useState<{ firstName: string | null; lastName: string | null }>({
        firstName: null,
        lastName: null,
    });
    const { logout } = useAuth();

    useEffect( () => {
        async function getUserResponse() {
            const token = localStorage.getItem("token");
            try {
              const response = await axiosInstance.get(API_ENDPOINTS.USER, {
                headers: {
                  Authorization: `Bearer ${token}`, // Send token in Authorization header
                },
              });
                setUser({
                    firstName: response.data.first_name || '',
                    lastName: response.data.last_name || '',
                });
              return response.data; // This is the user's data
            } catch (error) {
              //console.error("Failed to fetch user data:", error);
            }
        }
        getUserResponse();
    }, [""]);
    const userFullName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "User Name";


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#home">Logo</Navbar.Brand>
                <Navbar>
                    <Nav>
                        <NavDropdown title={userFullName} id="basic-nav-dropdown">
                            <NavDropdown.Item  onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            </Container>
        </Navbar>
    );
};

export default Header;