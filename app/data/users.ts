export type User = {
  id: number;
  name: string;
  email: string;
};

export const users: User[] = [
  { id: 1, name: 'John Wick', email: 'john.wick@example.com' },
  { id: 2, name: 'David Beckham', email: 'david.beckham@example.com' },
];
