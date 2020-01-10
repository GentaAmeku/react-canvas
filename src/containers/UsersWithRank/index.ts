import { connect } from 'react-redux';
import { compose, setDisplayName, pure, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typescript-fsa';
import Users, { UsersProps } from 'components/Users';
import { fetchUsers, UsersActionPayload } from 'actions/users';
import { State } from 'reducers';
import { User } from 'lib/api';

interface StateProps {
  users: User[];
}

interface DispatchProps {
  fetchUsers: () => void;
}

type EnhancedUsersWithRankProps = StateProps & DispatchProps;

const mapStateToProps = (state: State) => ({
  users: state.users.data,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, Action<UsersActionPayload>>,
) =>
  bindActionCreators(
    {
      fetchUsers: () => fetchUsers(),
    },
    dispatch,
  );

const echance = compose(
  setDisplayName('WithUsersRank'),
  connect<StateProps, DispatchProps, UsersProps>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle<EnhancedUsersWithRankProps, {}>({
    componentDidMount() {
      this.props.fetchUsers();
    },
  }),
  pure,
);

export default echance(Users);
