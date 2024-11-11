import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/input';
import Loading from '../../../shared/components/loading/Loading';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/styles/display.styled';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import { useInsertCategory } from '../hooks/useInsertCategory';
import { CategoryRoutesEnum } from '../routes';

function CategoryInsert() {
  const {
    categoryId,
    handleOnClickCancel,
    name,
    loading,
    handleOnChangeName,
    disabledButton,
    insertCategory,
  } = useInsertCategory();

  const listBreadcrumb = [
    {
      name: 'HOME',
    },
    {
      name: 'CATEGORIAS',
      navigateTo: CategoryRoutesEnum.CATEGORY,
    },
    {
      name: categoryId ? 'EDITAR CATEGORIA' : 'INSERIR CATEGORIA',
    },
  ];

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      {loading && categoryId ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
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
                  {categoryId ? 'Salvar' : 'Inserir categoria'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        </DisplayFlexJustifyCenter>
      )}
    </Screen>
  );
}

export default CategoryInsert;
