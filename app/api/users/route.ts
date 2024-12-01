import { getUsers, addUser } from '@/app/data/users';
import { NextResponse } from 'next/server';

// GET all users
export async function GET() {
  const users = getUsers();
  return NextResponse.json(users);
}

// POST: add new user
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const newUser = addUser(body.name);

  return NextResponse.json(newUser, { status: 201 });
}
