import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { useUser } from '../hooks/useUser';
import { UserType } from '../../login/types/UserType';
import { Input, TableProps } from 'antd';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import {
  DisplayFlexJustifyBetween,
  DisplayFlexJustifyCenter,
} from '../../../shared/styles/display.styled';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import Button from '../../../shared/components/buttons/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { getUserInfoByToken } from '../../../shared/functions/connection/auth';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import { UserRoutesEnum } from '../routes';
import Loading from '../../../shared/components/loading/Loading';

const { Search } = Input;

const listBreadcrumb = [
  {
    name: 'HOME',
  },
  {
    name: 'USUÁRIOS',
  },
];

const columns: TableProps<UserType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    render: (text) => <a>{insertMaskInPhone(text)}</a>,
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf',
    render: (text) => <a>{insertMaskInCpf(text)}</a>,
  },
];

function User() {
  const { users, loading, handleOnChangeSearch } = useUser();

  const userToken = useMemo(() => {
    return getUserInfoByToken();
  }, []);

  const navigate = useNavigate();

  const handleOnClickInsert = () => {
    // navigate(UserRoutesEnum.USER_INSERT);
  };

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      {!users || loading ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
            <LimitedContainer width={240}>
              <Search onSearch={handleOnChangeSearch} placeholder="Buscar usuário" enterButton />
            </LimitedContainer>
            <LimitedContainer width={120}>
              {userToken?.typeUser === UserTypeEnum.Root && (
                <Link to={UserRoutesEnum.USER_INSERT}>
                  <Button onClick={handleOnClickInsert} type="primary">
                    Inserir Admin
                  </Button>
                </Link>
              )}
            </LimitedContainer>
          </DisplayFlexJustifyBetween>
          <Table columns={columns} dataSource={users} />
        </>
      )}
    </Screen>
  );
}

export default User;
