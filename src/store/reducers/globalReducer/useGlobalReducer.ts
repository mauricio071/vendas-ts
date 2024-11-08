import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { UserType } from '../../../modules/login/types/UserType';
import { setNotificationAction, setUserAction } from '.';
import { NotificationEnum } from '../../../shared/types/NotificationType';

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { user, notification } = useAppSelector((state) => state.globalReducer);

  const setUser = (user: UserType) => {
    dispatch(setUserAction(user));
  };

  const setNotification = (message: string, type: NotificationEnum, description?: string) => {
    dispatch(
      setNotificationAction({
        message,
        type,
        description,
      }),
    );
  };

  return {
    user,
    notification,
    setUser,
    setNotification,
  };
};
