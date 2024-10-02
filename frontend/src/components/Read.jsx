import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const res = await fetch('http://localhost:5000/api/users');
    const a = await res.json();
    setUsers(a);
    console.log(a);
  };

  const handleDelete=async(userid)=>{
    const res = await fetch(`http://localhost:5000/api/users/${userid}`,{
        method:'DELETE',
    })

    if(res.ok){
        fetchAllUsers();
        console.log('User Deleted Succesfully');
    }else{
        console.log("Failed to delete user");
    }
  }
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>
      {users && users.length > 0 ? (
        <div className="row">
          {users.map((user) => (
            <div key={user._id} className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Age:</strong> {user.age}
                  </p>
                  <button className='btn btn-primary' onClick={()=>handleDelete(user._id)}>Delete</button>
                  <Link to={`/update/${user._id}`}><button className='btn btn-primary'>Update</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Read;
