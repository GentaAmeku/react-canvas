// import axios from 'axios';

// const authedAxios = axios.create({
//   headers: {
//     // token
//     Authentication: 'XXXX',
//   },
// });

export interface User {
  id: string;
  name: string;
}

export default {
  users: {
    async fetch(): Promise<User[]> {
      return [{ id: '1', name: 'hoge' }, { id: '2', name: 'fuga' }];
    },
  },
};
