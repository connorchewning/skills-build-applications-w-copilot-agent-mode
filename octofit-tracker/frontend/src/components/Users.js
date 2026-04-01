import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const baseUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Fetching users from:', baseUrl);
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [baseUrl]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id || i}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
