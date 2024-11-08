import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/styles/display.styled';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import { useInsertCategory } from '../hooks/useInsertCategory';
import { CategoryRoutesEnum } from '../routes';

function CategoryInsert() {
  const { name, loading, handleOnChangeName, disabledButton, insertCategory } = useInsertCategory();
  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(CategoryRoutesEnum.CATEGORY);
  };

  const listBreadcrumb = [
    {
      name: 'HOME',
    },
    {
      name: 'CATEGORIAS',
      navigateTo: CategoryRoutesEnum.CATEGORY,
    },
    {
      name: 'INSERIR CATEGORIA',
    },
  ];

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            onChange={handleOnChangeName}
            value={name}
            title="Nome"
            placeholder="Nome"
            margin="0px 0px 16px 0px"
          />
          <DisplayFlexJustifyRight>
            <LimitedContainer width={120} margin="0px 16px">
              <Button onClick={handleOnClickCancel} danger>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={160}>
              <Button
                loading={loading}
                onClick={insertCategory}
                disabled={disabledButton}
                type="primary"
              >
                Inserir Produto
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
}

export default CategoryInsert;
