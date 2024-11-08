import { useMemo } from 'react';
import { ProductType } from '../../../shared/types/ProductTypes';
import { Input, TableProps } from 'antd';
import Table from '../../../shared/components/table/Table';
import CategoryColumn from '../components/CategoryColumn';
import TooltipImage from '../components/TooltipImage';
import { convertNumberToMoney } from '../../../shared/functions/money';
import Screen from '../../../shared/components/screen/Screen';
import Button from '../../../shared/components/buttons/button/Button';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import { DisplayFlex, DisplayFlexJustifyBetween } from '../../../shared/styles/display.styled';
import { useProduct } from '../hooks/useProduct';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const listBreadcrumb = [
  {
    name: 'HOME',
  },
  {
    name: 'PRODUTOS',
  },
];

function Product() {
  const columns: TableProps<ProductType>['columns'] = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (_, product) => <TooltipImage product={product} />,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
        render: (_, product) => <CategoryColumn category={product.category} />,
      },
      {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        width: 240,
        render: (_, product) => (
          <LimitedContainer width={180}>
            <DisplayFlex>
              <Button
                margin="0px 16px 0px 0px"
                onClick={() => handleEditProduct(product.id)}
                icon={<EditOutlined />}
              >
                Editar
              </Button>
              <Button
                onClick={() => handleDeleteProduct(product.id)}
                icon={<DeleteOutlined />}
                danger
              >
                Deletar
              </Button>
            </DisplayFlex>
          </LimitedContainer>
        ),
      },
    ],
    [],
  );

  const {
    handleOnClickInsert,
    onSearch,
    productsFiltered,
    handleDeleteProduct,
    handleEditProduct,
  } = useProduct();

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
  );
}

export default Product;
