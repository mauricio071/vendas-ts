import { useEffect, useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { URL_USER_ALL } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { UserType } from '../../login/types/UserType';

export const useUser = () => {
  const { users, setUsers } = useUserReducer();
  const [usersWithKeys, setUsersWithKeys] = useState<UserType[]>([]);
  const { request, loading } = useRequests();

  useEffect(() => {
    request(URL_USER_ALL, MethodsEnum.GET, setUsers);
  }, []);

  useEffect(() => {
    const usersWithKeys = users.map((user) => ({
      ...user,
      key: user.id,
    }));
    setUsersWithKeys(usersWithKeys);
  }, [users]);

  const handleOnChangeSearch = (value: string) => {
    if (!value) {
      setUsersWithKeys([...users]);
    } else {
      setUsersWithKeys(users.filter((user) => user.name.includes(value)));
    }
  };

  return {
    users: usersWithKeys,
    loading,
    handleOnChangeSearch,
  };
};
