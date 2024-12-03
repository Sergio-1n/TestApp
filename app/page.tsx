'use client';

import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Fetch all users on load
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('/api/users', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error('Failed to load users');
        }

        const data: User[] = await response.json();
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

    if (!name || !email) {
      setError('Name and email are required');
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      const newUser: User = await response.json();
      setUsers(prevUsers => [...prevUsers, newUser]);
      setName('');
      setEmail('');
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Failed to add user');
    }
  };

  return (
    <main className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Users</h1>

      <h2 className='text-lg font-semibold mb-2'>Add New User</h2>
      {error && <p className='text-red-500 mb-2'>{error}</p>}

      <div className='space-y-4 mb-6'>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2'
        />
        <button
          onClick={addUser}
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Add User
        </button>
      </div>

      <ul className='space-y-4'>
        {users.map(user => (
          <li
            key={user.id}
            className='p-6 border border-gray-300 rounded-lg shadow-lg bg-white'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-lg font-semibold text-gray-800'>
                  {user.name}
                </p>
                <p className='text-sm text-gray-500'>{user.email}</p>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium'></span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
