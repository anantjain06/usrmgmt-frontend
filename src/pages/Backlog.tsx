// src/components/BacklogRefinement.tsx
import React, { useEffect, useState } from "react";
import { Table, Form, Container, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINTS } from "../config/ApiConstant";

interface BacklogItem {
    id: number;
    title: string;
    estimate: number;
    priority: "Low" | "Medium" | "High";
    owner: string;
    sprint?: string;
}

const initialData: BacklogItem[] = [
    { id: 1, title: "Implement login", estimate: 3, priority: "High", owner: "Alice" },
    { id: 2, title: "Set up CI pipeline", estimate: 5, priority: "Medium", owner: "Bob" },
    { id: 3, title: "Write unit tests", estimate: 2, priority: "Low", owner: "Charlie" },
];

const BacklogRefinement: React.FC = () => {
    const [items, setItems] = useState<BacklogItem[]>(initialData);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        title: "",
        estimate: 1,
        priority: "Medium",
        owner: ""
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleUpdate = (id: number, field: keyof BacklogItem, value: string | number) => {
        setItems(prev =>
            prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const handleAdd = () => {
        axios.post(API_ENDPOINTS.BACKLOG_ADD, newItem)
          .then(res => {
            setItems([res.data, ...items]);
            setShowModal(false);
            setNewItem({ title: "", estimate: 1, priority: "Medium", owner: "" });
            setSuccessMessage("✅ Backlog item added successfully!");
      
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
          })
          .catch(err => console.error("Add Error:", err));
    };

    useEffect(() => {
        axios.get(API_ENDPOINTS.BACKLOG_GET)
          .then(res => setItems(res.data))
          .catch(err => console.error("API Error:", err));
      }, []);

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center my-2">
                <h2 className="mb-4">🗂️ Backlog Refinement</h2>
                <Button  variant="primary" onClick={() => setShowModal(true)}>Add Backlog</Button>
            </div>
           
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Estimate</th>
                        <th>Priority</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={item.title}
                                    onChange={e => handleUpdate(item.id, "title", e.target.value)}
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    value={item.estimate}
                                    onChange={e => handleUpdate(item.id, "estimate", parseInt(e.target.value))}
                                />
                            </td>
                            <td>
                                <Form.Select
                                    value={item.priority}
                                    onChange={e => handleUpdate(item.id, "priority", e.target.value)}
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={item.owner}
                                    onChange={e => handleUpdate(item.id, "owner", e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Backlog Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                value={newItem.title}
                                onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Estimate</Form.Label>
                            <Form.Control
                                type="number"
                                value={newItem.estimate}
                                onChange={e => setNewItem({ ...newItem, estimate: parseInt(e.target.value) })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                value={newItem.priority}
                                onChange={e => setNewItem({ ...newItem, priority: e.target.value })}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                value={newItem.owner}
                                onChange={e => setNewItem({ ...newItem, owner: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BacklogRefinement;