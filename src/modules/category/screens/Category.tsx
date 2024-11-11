import { Input, Modal, TableProps } from 'antd';
import Screen from '../../../shared/components/screen/Screen';
import Table from '../../../shared/components/table/Table';
import { useCategory } from '../hooks/useCategory';
import { CategoryType } from '../../../shared/types/CategoryType';
import { LimitedContainer } from '../../../shared/styles/limited.styled';
import Button from '../../../shared/components/buttons/button/Button';
import { DisplayFlex, DisplayFlexJustifyBetween } from '../../../shared/styles/display.styled';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const listBreadcrumb = [
  {
    name: 'HOME',
  },
  {
    name: 'CATEGORIAS',
  },
];

function Category() {
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
    {
      title: 'Ações',
      dataIndex: '',
      key: 'x',
      width: 240,
      render: (_, category) => (
        <LimitedContainer width={180}>
          <DisplayFlex>
            <LimitedContainer margin="0px 16px 0px 0px" width={90}>
              <Button onClick={() => handleGoToEditCategory(category.id)} icon={<EditOutlined />}>
                Editar
              </Button>
            </LimitedContainer>
            {category.amountProducts <= 0 && (
              <Button
                onClick={() => handleOpenModalDelete(category.id)}
                icon={<DeleteOutlined />}
                danger
              >
                Deletar
              </Button>
            )}
          </DisplayFlex>
        </LimitedContainer>
      ),
    },
  ];

  const {
    categories,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleGoToEditCategory,
    handleDeleteCategory,
    openModalDelete,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useCategory();

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteCategory}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir essa categoria?</p>
      </Modal>
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
