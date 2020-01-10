import * as React from 'react';
import { User } from 'lib/api';

export interface UsersProps {
  users: User[];
}

const Users: React.SFC<UsersProps> = ({ users }) => (
  <div>
    Users!!
    {users.map(v => (
      <p key={v.id}>{v.name}</p>
    ))}
  </div>
);

export default Users;
