import { Input, TableProps } from 'antd';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { useCategory } from '../hooks/useCategory';
import { CategoryType } from '../../../shared/types/CategoryType';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import Button from '../../../shared/components/buttons/button/Button';
import { useNavigate } from 'react-router-dom';
import { CategoryRoutesEnum } from '../routes';
import { DisplayFlexJustifyBetween } from '../../../shared/styles/display.styled';

const { Search } = Input;

const listBreadcrumb = [
  {
    name: 'HOME',
  },
  {
    name: 'CATEGORIAS',
  },
];

const columns: TableProps<CategoryType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Produtos',
    dataIndex: 'amountProducts',
    key: 'amountProducts',
    render: (text) => <a>{text}</a>,
  },
];

function Category() {
  const { categories, handleOnChangeSearch } = useCategory();
  const navigate = useNavigate();

  const handleOnClickCategory = () => {
    navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
        <LimitedContainer width={240}>
          <Search placeholder="Buscar categoria" onSearch={handleOnChangeSearch} enterButton />
        </LimitedContainer>
        <LimitedContainer width={120}>
          <Button type="primary" onClick={handleOnClickCategory}>
            Inserir
          </Button>
        </LimitedContainer>
      </DisplayFlexJustifyBetween>
      <Table columns={columns} dataSource={categories} />
    </Screen>
  );
}

export default Category;
