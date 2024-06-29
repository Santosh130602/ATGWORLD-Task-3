import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Form, Button, Modal, Spinner, Alert ,Card} from 'react-bootstrap';
import UserCard from './components/usersmallcart'; 
import { FaUserTie } from "react-icons/fa";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
        setAllUsers(response.data || []);
        setUsers(response.data || []);
      } catch (error) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredUsers = allUsers.filter(user => user.profile.username.toLowerCase().includes(searchQuery.toLowerCase()));
    setUsers(filteredUsers);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = allUsers.filter(user => user.profile.username.toLowerCase().includes(e.target.value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (username) => {
    setSearchQuery(username);
    setSuggestions([]);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const shouldUsePlaceholder = (avatarUrl) => {
    return avatarUrl.includes('https://cdn.fakercloud.com/avatars/');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="text-center my-5 ">Users list</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="mb-4 d-flex">
        <Form.Control
          type="text"
          placeholder="Search User"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button variant="primary" className="ml-2" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {suggestions.length > 0 && (
        <div className="mb-4">
          <h5>Suggestions:</h5>
          <ul className="list-group">
            {suggestions.map((user) => (
              <li key={user.id} className="list-group-item" onClick={() => handleSuggestionClick(user.profile.username)}>
                {user.profile.username}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} onClick={() => handleUserClick(user)}>
                <td>
                  <UserCard user={user} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="1" className="text-center">No data to show</td>
            </tr>
          )}
        </tbody>
      </Table>
      {selectedUser && (
        <Modal show={isModalOpen} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title><strong>User Id:</strong> &nbsp; {selectedUser.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='contentainer' style={{ display: "flex" }}>

            <div className='contentainer-cantent'>
              <p><strong>Username:</strong> {selectedUser.profile.username}</p>
              <p><strong>First Name:</strong> {selectedUser.profile.firstName} {selectedUser.profile.lastName}</p>
             {/* <p><strong>Last Name:</strong> {selectedUser.profile.lastName}</p> */}
              <p><strong>Bio:</strong> {selectedUser.Bio}</p>
              <p><strong>Job Title:</strong> {selectedUser.jobTitle}</p>
              <p><strong>Email:</strong> {selectedUser.profile.email}</p>
            </div>
            {/* <div>
              <img src={selectedUser.avatar} alt={selectedUser.profile.username} style={{ maxWidth: '100%' }} />
            </div> */}
            <div className='contentainer-img'>
              <hr className='hrcard'></hr>
            {shouldUsePlaceholder(selectedUser.avatar) ? (
              <FaUserTie size={90} className='avatar-icon' /> 
            ) : (
              // <img src={selectedUser.avatar} alt={selectedUser.username} />
              <Card.Img className='cardimg-1' src={selectedUser.avatar} alt={selectedUser.username} />
            )}
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default App;

