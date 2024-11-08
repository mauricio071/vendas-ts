import Screen from '../../../shared/components/screen/Screen';
import { ProductRoutesEnum } from '../routes';
import Input from '../../../shared/components/inputs/input/input';
import Button from '../../../shared/components/buttons/button/Button';
import Select from '../../../shared/components/inputs/select/Select';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import {
  DisplayFlex,
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/styles/display.styled';
import { useParams } from 'react-router-dom';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { useCategory } from '../../category/hooks/useCategory';
import { ProductInsertTestIdEnum } from '../enum/ProductInsertTestIdEnum';
import { CategoryType } from '../../../shared/types/CategoryType';
import Loading from '../../../shared/components/loading/Loading';

function ProductInsert() {
  const { productId } = useParams<{ productId: string }>();

  const {
    isEdit,
    product,
    loading,
    loadingProduct,
    disabledButton,
    onChangeInput,
    handleInsertProduct,
    handleChangeSelect,
    handleOnClickCancel,
  } = useInsertProduct(productId);

  const { categories } = useCategory();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
          navigateTo: ProductRoutesEnum.PRODUCT,
        },
        {
          name: 'INSERIR PRODUTO',
        },
      ]}
    >
      {loadingProduct ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <DisplayFlexJustifyCenter data-testid={ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER}>
          <LimitedContainer width={400}>
            <Input
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_NAME}
              value={product.name}
              onChange={(event) => onChangeInput(event, 'name')}
              title="Nome"
              placeholder="Nome"
              margin="0px 0px 16px 0px"
            />
            <Input
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
              value={product.image}
              onChange={(event) => onChangeInput(event, 'image')}
              title="Url da imagem"
              placeholder="Url da imagem"
              margin="0px 0px 16px 0px"
            />
            <InputMoney
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE}
              value={product.price}
              onChange={(event) => onChangeInput(event, 'price', true)}
              title="Preço"
              placeholder="Preço"
              margin="0px 0px 16px 0px"
            />
            <Select
              defaultValue={`${product.categoryId || ''}`}
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT}
              title="Categoria"
              onChange={handleChangeSelect}
              options={categories.map((category: CategoryType) => ({
                value: `${category.id}`,
                label: `${category.name}`,
              }))}
              margin="0px 0px 16px 0px"
            />
            <DisplayFlex>
              <InputMoney
                data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
                value={product.weight}
                onChange={(event) => onChangeInput(event, 'weight', true)}
                title="Peso"
                placeholder="Peso"
                addonBefore="Kg"
                margin="0px 16px 16px 0px"
              />
              <InputMoney
                data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
                value={product.length}
                onChange={(event) => onChangeInput(event, 'length', true)}
                title="Comprimento"
                placeholder="Comprimento"
                addonBefore="cm"
                margin="0px 0px 16px 0px"
              />
            </DisplayFlex>
            <DisplayFlex>
              <InputMoney
                data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
                value={product.height}
                onChange={(event) => onChangeInput(event, 'height', true)}
                title="Altura"
                placeholder="Altura"
                addonBefore="cm"
                margin="0px 16px 16px 0px"
              />
              <InputMoney
                data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
                value={product.width}
                onChange={(event) => onChangeInput(event, 'width', true)}
                title="Largura"
                placeholder="Largura"
                addonBefore="cm"
                margin="0px 0px 16px 0px"
              />
            </DisplayFlex>
            <InputMoney
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
              value={product.diameter}
              onChange={(event) => onChangeInput(event, 'diameter', true)}
              title="Diâmetro"
              placeholder="Diâmetro"
              addonBefore="cm"
              margin="0px 0px 32px 0px"
            />
            <DisplayFlexJustifyRight>
              <LimitedContainer width={120} margin="0px 16px">
                <Button
                  data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL}
                  onClick={handleOnClickCancel}
                  danger
                >
                  Cancelar
                </Button>
              </LimitedContainer>
              <LimitedContainer width={120}>
                <Button
                  data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT}
                  onClick={handleInsertProduct}
                  loading={loading}
                  disabled={disabledButton}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Inserir Produto'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        </DisplayFlexJustifyCenter>
      )}
    </Screen>
  );
}

export default ProductInsert;
