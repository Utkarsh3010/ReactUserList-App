import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css"; // Import CSS file for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reqres.in/api/users?page=2");
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-item">
            <img src={user.avatar} alt={user.first_name} className="avatar" />
            <p className="user-id">ID: {user.id}</p>
            <p className="user-name">Name: {user.first_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
