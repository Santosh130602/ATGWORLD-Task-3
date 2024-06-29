import React, { useState, useEffect } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { FaUserTie } from 'react-icons/fa'; 
import "../App.css"

const UserCard = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
  }, []);
  const shouldUsePlaceholder = (avatarUrl) => {
    return avatarUrl.includes('https://cdn.fakercloud.com/avatars/');
  };

  return (
    <Card className="mb-4">
      {isLoading ? (
        <div className="row no-gutters">
        <div className="col-md-2 p-4">
        <FaUserTie size={90} className='avatar-icon' />
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Card.Text>
              <div className=' loading border mt-3' style={{"height":"30px","background":"#b5bac0"}} ></div>
            </Card.Text>
            <Card.Text>
            <div className='loading border' style={{"height":"30px","background":"#b5bac0"}} ></div>
            </Card.Text>
          </Card.Body>
        </div>
      </div>
        
      ) : (
        <div className="row no-gutters">
          <div className="col-md-2 p-4">
            {shouldUsePlaceholder(user.avatar) ? (
              <FaUserTie size={90} className='avatar-icon' /> 
            ) : (
              <Card.Img className='cardimg' src={user.avatar} alt={user.username} />
            )}
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Text>
                <strong>Username:</strong>&nbsp; {user.profile.username}
              </Card.Text>
              <Card.Text>
                <strong>Bio:</strong>&nbsp; {user.Bio}
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserCard;
