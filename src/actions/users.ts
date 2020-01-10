import { default as actionCreatorFactory, Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import api, { User } from 'lib/api';

export interface UsersActionPayload {}

const actionCreator = actionCreatorFactory();

export const actions = {
  fetchUsers: actionCreator.async<{}, User[]>('FETCH_USERS'),
};

export const fetchUsers = () => async (
  dispatch: Dispatch<Action<UsersActionPayload>>,
) => {
  const { fetchUsers } = actions;
  dispatch(fetchUsers.started({ params: {} }));
  const users = await api.users.fetch();
  dispatch(fetchUsers.done({ result: users, params: { users } }));
};
