import { Descriptions, Divider } from 'antd';
import Screen from '../../../shared/components/screen/Screen';
import { OrderRoutesEnum } from '../routes';
import { useParams } from 'react-router-dom';
import { useOrderDetail } from '../hooks/useOrderDetail';
import { DisplayFlexJustifyCenter } from '../../../shared/styles/display.styled';
import ListOrderProduct from '../components/ListOrderProduct';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { insertMaskInCEP } from '../../../shared/functions/address';
import Loading from '../../../shared/components/loading/Loading';

function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading } = useOrderDetail(orderId);

  const listBreadcrumb = [
    {
      name: 'HOME',
    },
    {
      name: 'PEDIDOS',
      navigateTo: OrderRoutesEnum.ORDER,
    },
    {
      name: 'DETALHES',
    },
  ];

  return (
    <Screen listBreadcrumb={listBreadcrumb}>
      {!order || loading ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <Descriptions title="Dados do usuário" bordered>
            <Descriptions.Item label="Nome">{order.user?.name}</Descriptions.Item>
            <Descriptions.Item label="Email" span={2}>
              {order.user?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Telefone">
              {insertMaskInPhone(order.user?.phone)}
            </Descriptions.Item>
            <Descriptions.Item label="CPF" span={2}>
              {insertMaskInCpf(order.user?.cpf)}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title="Dados do pagamento" bordered>
            <Descriptions.Item label="Preço">
              {convertNumberToMoney(order.payment?.price || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Desconto" span={2}>
              {convertNumberToMoney(order.payment?.discount || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Preço final">
              {convertNumberToMoney(order.payment?.finalPrice || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Tipo de pagamento" span={2}>
              {order.payment?.type}
            </Descriptions.Item>
            <Descriptions.Item label="Status" span={2}>
              {order.payment?.statusId}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title="Dados do endereço" bordered>
            <Descriptions.Item label="Cidade">{order.address?.city?.name}</Descriptions.Item>
            <Descriptions.Item label="Estado">{order.address?.city?.state?.name}</Descriptions.Item>
            <Descriptions.Item label="Complemento">{order.address?.complement}</Descriptions.Item>
            <Descriptions.Item label="Número">{order.address?.numberAddress}</Descriptions.Item>
            <Descriptions.Item label="CEP" span={2}>
              {insertMaskInCEP(order.address?.cep || '')}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <ListOrderProduct ordersProduct={order.ordersProduct} />
          {order.ordersProduct && order.ordersProduct?.length > 0 && (
            <Descriptions title="Produtos" bordered>
              <Descriptions.Item label="Nome">teste</Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>
                teste
              </Descriptions.Item>
              <Descriptions.Item label="Telefone">teste</Descriptions.Item>
              <Descriptions.Item label="CPF" span={2}>
                teste
              </Descriptions.Item>
            </Descriptions>
          )}
        </>
      )}
    </Screen>
  );
}

export default OrderDetail;
