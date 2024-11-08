import { Link } from 'react-router-dom';
import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/styles/display.styled';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import { UserRoutesEnum } from '../routes';
import { useUserInsert } from '../hooks/useUserInsert';

function UserInsert() {
  const { user, handleInsertAdmin, handleOnChangeInput, disabledButton } = useUserInsert();

  const listBreadcrumb = [
    {
      name: 'HOME',
    },
    {
      name: 'USUÁRIOS',
      navigateTo: UserRoutesEnum.USER,
    },
    {
      name: 'INSERIR',
    },
  ];

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            value={user.name}
            onChange={(event) => handleOnChangeInput(event, 'name')}
            title="Nome"
            placeholder="Nome"
            margin="0px 0px 16px 0px"
          />
          <Input
            value={user.phone}
            onChange={(event) => handleOnChangeInput(event, 'phone')}
            title="Telefone"
            placeholder="Telefone"
            margin="0px 0px 16px 0px"
          />
          <Input
            value={user.email}
            onChange={(event) => handleOnChangeInput(event, 'email')}
            title="Email"
            placeholder="Email"
            margin="0px 0px 16px 0px"
          />
          <Input
            value={user.cpf}
            onChange={(event) => handleOnChangeInput(event, 'cpf')}
            title="CPF"
            placeholder="CPF"
            margin="0px 0px 16px 0px"
          />
          <Input
            value={user.password}
            onChange={(event) => handleOnChangeInput(event, 'password')}
            title="Senha"
            placeholder="Senha"
            margin="0px 0px 16px 0px"
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer width={120} margin="0px 16px">
              <Link to={UserRoutesEnum.USER}>
                <Button danger>Cancelar</Button>
              </Link>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button onClick={handleInsertAdmin} disabled={disabledButton} type="primary">
                Inserir Admin
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
}

export default UserInsert;
