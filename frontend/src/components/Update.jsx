import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

const Update = () => {
    const id = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");
    const [updated,setUpdated]=useState(false);
    
    const fetchCurrUser=async()=>{
        try{
            const res = await fetch(`http://localhost:5000/api/users/${id.id}`);
            const a = await res.json();
            setName(a.name);
            setEmail(a.email);
            setAge(a.age);
        }catch(error){
            console.log(error);
        }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const addUser = { name, email, age };
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id.id}`, {
          method: "PATCH",
          body: JSON.stringify(addUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const result = await response.json();
  
        if (!response.ok){
          throw new Error(result.error || "Something went wrong");
        }
  
        // Reset form fields and error on successful submission
        setError("");
        setUpdated(true);
        setTimeout(()=>{
            setUpdated(false);
        },5000);
      } catch (err) {
        // Set the error message
        setError(err.message);
        setUpdated(false);
      }
    };
    
    useEffect(()=>{
        fetchCurrUser();
    },[])
    return (
      <div className="container">
        {/* Display error if exists */}
        {error && <div className="alert alert-danger">{error}</div>}
        {updated && <div className="alert alert-success">{"updated succesfully"}</div>}
        <h2>Update the Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              className="form-control"
              id="age"
              aria-describedby="ageHelp"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  };

export default Update