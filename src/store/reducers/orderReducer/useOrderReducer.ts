import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { OrderType } from '../../../shared/types/OrderType';
import { setOrderAction, setOrdersAction } from '.';

export const useOrderReducer = () => {
  const dispatch = useDispatch();
  const { order, orders } = useAppSelector((state) => state.orderReducer);

  const setOrders = (currentOrders: OrderType[]) => {
    dispatch(setOrdersAction(currentOrders));
  };

  const setOrder = (order: OrderType) => {
    dispatch(setOrderAction(order));
  };

  return {
    order,
    orders,
    setOrders,
    setOrder,
  };
};
