import { TableProps } from 'antd';
import Screen from '../../../shared/components/screen/Screen';
import { OrderType } from '../../../shared/types/OrderType';
import Table from '../../../shared/components/table/Table';
import { useOrder } from '../hooks/useOrder';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderRoutesEnum } from '../routes';

const listBreadcrumb = [
  {
    name: 'HOME',
  },
  {
    name: 'PEDIDOS',
  },
];

const columns: TableProps<OrderType>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Data',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Usuário',
    dataIndex: 'user',
    key: 'user',
    render: (_, target) => <a>{target.user?.name}</a>,
  },
  {
    title: 'Qtd. Produtos',
    dataIndex: 'amountProducts',
    key: 'amountProducts',
    render: (text) => <a>{text}</a>,
  },
];

function Order() {
  const { orders } = useOrder();
  const navigate = useNavigate();

  const [ordersWithKeys, setOrdersWithKeys] = useState<OrderType[]>([]);

  useEffect(() => {
    const ordersWithKeys = orders.map((order) => ({
      ...order,
      key: order.id,
    }));
    setOrdersWithKeys(ordersWithKeys);
  }, [orders]);

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      <Table
        onRow={(record) => ({
          onClick: (event) => {
            navigate(`${OrderRoutesEnum.ORDER}/${record.id}`);
          },
        })}
        columns={columns}
        dataSource={ordersWithKeys}
      />
    </Screen>
  );
}

export default Order;
