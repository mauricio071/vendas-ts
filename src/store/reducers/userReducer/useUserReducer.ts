import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setUsersAction } from '.';
import { UserType } from '../../../modules/login/types/UserType';

export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { users } = useAppSelector((state) => state.userReducer);

  const setUsers = (currentUsers: UserType[]) => {
    dispatch(setUsersAction(currentUsers));
  };

  return {
    setUsers,
    users,
  };
};
