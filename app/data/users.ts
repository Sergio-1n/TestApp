const users = [
  {
    id: 1,
    name: 'John Wick',
  },
  {
    id: 2,
    name: 'David Beckam',
  },
];

// get all users
export function getUsers() {
  return users;
}

// add new user
export function addUser(name: string) {
  const newUser = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);
  return newUser;
}
