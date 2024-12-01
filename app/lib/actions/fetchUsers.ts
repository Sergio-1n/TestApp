// lib/actions/fetchUsers.ts
export async function fetchUsers() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}
