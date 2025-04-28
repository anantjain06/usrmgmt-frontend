import React, { useState } from 'react';
import { Navbar, Nav, Col, Button } from "react-bootstrap";
import { FaBars } from 'react-icons/fa';
import '../../css/Sidebar.css';
import { menuItems } from '../../config/GlobalConstant';


const SideBar = () => {

    const [isExpanded, setIsExpanded] = useState(true);
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`d-flex sidebar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <Col className={`sidebar bg-dark text-white p-0`} xs={isExpanded ? 12 : 6}>
                <Navbar className="flex-column align-items-start p-2">
                    {/* Toggle Button */}
                    <Button
                        variant="light"
                        className="toggle-btn mb-3"
                        onClick={toggleSidebar}
                        aria-controls="sidebar-menu"
                    >
                        <FaBars />
                    </Button>

                    {/* Sidebar Menu */}
                    <Nav className="flex-column" id="sidebar-menu">
                        {menuItems.map(({ label, icon: Icon, path }) => (
                            <Nav.Item key={path}>
                                <Nav.Link href={path} className="text-white d-flex align-items-center">
                                    <Icon className="menu-icon me-2" />
                                    {isExpanded && <span className="menu-label">{label}</span>}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>
                </Navbar>
            </Col>
        </div>
    );
}

export default SideBar