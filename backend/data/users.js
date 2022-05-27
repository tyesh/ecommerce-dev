import bcryp from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcryp.hashSync('gol123', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcryp.hashSync('gol123', 10),
  },
  {
    name: 'Jane Doe',
    email: 'janeexample.com',
    password: bcryp.hashSync('gol123', 10),
  },
];

export default users;
