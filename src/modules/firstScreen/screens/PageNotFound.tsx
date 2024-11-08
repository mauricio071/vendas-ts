import { Result } from 'antd';
import Button from '../../../shared/components/buttons/button/Button';
import { useNavigate } from 'react-router-dom';
import { LoginRoutesEnum } from '../../login/routes';
import { ContainerPageNotFound } from '../styles/pageNotFound.styles';

function PageNotFound() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  return (
    <ContainerPageNotFound>
      <Result
        status="404"
        title="404"
        subTitle="Desculpe, a página que você está visitando não existe."
        extra={
          <Button onClick={handleOnClick} type="primary">
            Página de Login
          </Button>
        }
      />
    </ContainerPageNotFound>
  );
}

export default PageNotFound;
