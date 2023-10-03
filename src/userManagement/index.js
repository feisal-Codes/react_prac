// UserManagement.jsx

import React, { useEffect, useState } from "react";
import "./style.css";

const UserManagement = ({ users }) => {
  const [filters, setFilters] = useState({
    role: "",
    searchTerm: "",
    order: "",
    regDate: null,
  });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    let { name, value, checked } = e.target;
    let newValue = name === "regDate" ? checked : value;
    if (name === "role" && checked) {
      setFilters({
        role: value,
        searchTerm: "", // Clear search term
        order: "", // Clear sorting order
        regDate: null, // Clear registration date filter
      });
    } else {
      // Update filters for other cases
      setFilters((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const applyFilters = () => {
    let sortedData = [];
    let filtered = users.filter((user) => {
      if (filters.role) {
        return (
          filters.role === "default" ||
          user.role.toLowerCase() === filters.role.toLowerCase()
        );
      } else {
        return user;
      }
    });
    setData(filtered);

    if (filters.regDate) {
      sortedData = [...filtered].sort((a, b) =>
        a.registrationDate.localeCompare(b.registrationDate)
      );
      setData(sortedData);
      return;
    }

    if (filters.order !== "default") {
      sortedData = [...filtered].sort((a, b) => {
        if (filters.order === "asc") {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else if (filters.order === "dec") {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }
      });
      setData(sortedData);
    } else {
      setData(filtered);
    }
  };

  const applySearch = () => {
    if (filters.searchTerm) {
      let searchedData = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      });
      setData(searchedData);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  useEffect(() => {
    applySearch();
  }, [filters.searchTerm]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search user by name or email"
          onChange={handleChange}
          value={filters.searchTerm}
          name="searchTerm"
        />
        <h3>Filter based on roles</h3>
        <div>
          <input
            onChange={handleChange}
            value="default"
            type="radio"
            name="role"
            id="default"
          />
          <label htmlFor="default">Default</label>
        </div>
        <div>
          <input
            onChange={handleChange}
            value="admin"
            type="radio"
            name="role"
            id="admin"
          />
          <label htmlFor="admin">Admin</label>
        </div>
        <div>
          <input
            type="radio"
            onChange={handleChange}
            value="moderator"
            name="role"
            id="moderator"
          />
          <label htmlFor="moderator">Moderator</label>
        </div>
        <div>
          <input
            type="radio"
            onChange={handleChange}
            value="user"
            name="role"
            id="user"
          />
          <label htmlFor="user">User</label>
        </div>
      </div>

      <div>
        <h3>Sort Users</h3>
        <div>
          <input
            type="checkbox"
            onChange={handleChange}
            value="regDate"
            name="regDate"
          />
          <label htmlFor="regDate">Registration Date</label>
        </div>
        <div>
          <input
            type="checkbox"
            onChange={handleChange}
            name="order"
            id="order"
            value="default"
            checked={
              filters.order === "dec" ||
              filters.order === "" ||
              filters.order === "asc"
                ? false
                : true
            }
          />
          <label htmlFor="order">Default Order</label>
        </div>
        <div>
          <input
            type="checkbox"
            onChange={handleChange}
            name="order"
            id="asc"
            value="asc"
            checked={
              filters.order === "dec" ||
              filters.order === "" ||
              filters.order === "default"
                ? false
                : true
            }
          />
          <label htmlFor="asc">Ascending Order</label>
        </div>
        <div>
          <input
            checked={
              filters.order === "asc" ||
              filters.order === "" ||
              filters.order === "default"
                ? false
                : true
            }
            type="checkbox"
            value="dec"
            onChange={handleChange}
            name="order"
            id="desc"
          />
          <label htmlFor="desc">Descending Order</label>
        </div>
      </div>
      <div className="container">
        {data?.length > 0 &&
          data.map((user, index) => (
            <div key={index} className="userCard">
              <h3 className="userName">{user.name}</h3>
              <p className="userInfo">{user.email}</p>
              <p className="userInfo">{user.role}</p>
              <p className="userInfo">{user.registrationDate}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserManagement;
