'use client';

import { useState, useEffect } from 'react';
import { fetchUsers } from '../lib/actions/fetchUsers';

type User = {
  id: number;
  name: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Fetch all users on load
  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        setError('Failed to load users');
      }
    }

    loadUsers();
  }, []);

  // Add new user
  const addUser = async () => {
    setError('');

    if (!name) {
      setError('Name is required');
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const newUser = await response.json();
      setUsers(prevUsers => [...prevUsers, newUser]);
      setName('');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Failed to add user');
    }
  };

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>Add New User</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
    </main>
  );
}
