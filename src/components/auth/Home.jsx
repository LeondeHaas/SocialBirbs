import React, { useEffect, useState } from "react";
import { firestore } from "../src/config/firebase";
import Header from "../src/componenten/header";
import Login from "./Login";

const Home = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection("users").onSnapshot((snapshot) => {
      const usersData = snapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch the currently logged-in user
      // Implement your own logic here to get the current user
      const currentUser = null; // Replace with your logic to get the current user

      setUser(currentUser);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const filteredResults = users.filter((userData) =>
      userData.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  }, [users, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Header />
      {user ? (
        <div>
          <p>Ingelogde gebruiker: {user.email}</p>
        </div>
      ) : (
        <Login />
      )}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Zoek gebruiker..."
        />
      </div>
      <h2>Gebruikers:</h2>
      <ul>
        {filteredUsers.map((userData, index) => (
          <li key={index}>
            Naam: {userData.username}, E-mail: {userData.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
