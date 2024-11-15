import { useNavigate } from 'react-router-dom';
import { UserRoutesEnum } from '../routes';
import { useEffect, useState } from 'react';
import { InsertUser } from '../../../shared/dtos/InsertUser.dto';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_USER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';

export const useUserInsert = () => {
  const navigate = useNavigate();
  const { request, loading } = useRequests();
  const [disabledButton, setDisabledButton] = useState(true);

  const [user, setUser] = useState<InsertUser>({
    cpf: '',
    email: '',
    name: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    if (user.cpf && user.email && user.name && user.password && user.phone) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setUser((currentUser) => ({
      ...currentUser,
      [name]: event.target.value,
    }));
  };

  const handleInsertAdmin = async () => {
    const result = await request(URL_USER, MethodsEnum.POST, undefined, user);
    if (result) {
      navigate(UserRoutesEnum.USER);
    }
  };

  return {
    loading,
    user,
    handleInsertAdmin,
    handleOnChangeInput,
    disabledButton,
  };
};
