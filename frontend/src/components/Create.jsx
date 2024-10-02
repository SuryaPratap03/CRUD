import React, { useState } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age };

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      // Reset form fields and error on successful submission
      setError("");
      setName("");
      setAge(0);
      setEmail("");
    } catch (err) {
      // Set the error message
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      {/* Display error if exists */}
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="mb-4">Enter the User Data</h2>
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
            required
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
            required
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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
