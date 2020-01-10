import { actions as sketchActions } from 'actions/sketch';
import { actions as usersActions } from 'actions/users';

export default {
  ...sketchActions,
  ...usersActions,
};
