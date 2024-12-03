'use server';

import { NextResponse } from 'next/server';

type User = {
  id: number;
  name: string;
  email: string;
};

const users: User[] = [
  { id: 1, name: 'John Wick', email: 'john.wick@example.com' },
  { id: 2, name: 'David Beckham', email: 'david.beckham@example.com' },
];

// GET all users
export async function GET() {
  return NextResponse.json(users);
}

// POST: add a new user
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }
    );
  }

  const newUser: User = {
    id: users.length + 1,
    name: body.name,
    email: body.email,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
