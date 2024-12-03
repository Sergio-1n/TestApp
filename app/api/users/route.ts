'use server';

import { User, users } from '@/app/data/users';
import { NextResponse } from 'next/server';

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
