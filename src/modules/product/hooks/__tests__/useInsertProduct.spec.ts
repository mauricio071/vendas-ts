import { act, renderHook } from '@testing-library/react';
import { useInsertProduct } from '../useInsertProduct';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { URL_PRODUCT } from '../../../../shared/constants/urls';

const mockAxios = new MockAdapter(axios);

mockAxios.onPost(URL_PRODUCT, {});

const mockNavigate = jest.fn();
const mockNotification = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../../store/reducers/globalReducer/useGlobalReducer', () => ({
  useGlobalReducer: () => ({
    setNotification: mockNotification,
  }),
}));

describe('Test useInsertProduct', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useInsertProduct());

    expect(result.current.loading).toEqual(false);
    expect(result.current.disabledButton).toEqual(true);
    expect(result.current.product).toEqual({
      name: '',
      price: 0,
      image: '',
    });
  });

  it('should change select in handleChangeSelect', () => {
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleChangeSelect('433');
    });

    expect(result.current.product.categoryId).toEqual(433);
  });

  it('should change product in onChangeInput send name', () => {
    const TEXT_MOCK = 'TEXT_MOCK';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.onChangeInput({ target: { value: TEXT_MOCK } } as any, 'name');
    });

    expect(result.current.product.name).toEqual(TEXT_MOCK);
  });

  it('should change product in onChangeInput send price', () => {
    const TEXT_MOCK = 'TEXT_MOCK';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.onChangeInput({ target: { value: TEXT_MOCK } } as any, 'price', true);
    });

    expect(result.current.product.price).toEqual(Number(TEXT_MOCK));
  });

  it('should change disabledButton in insert data', () => {
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.onChangeInput({ target: { value: 'teste' } } as any, 'name');
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.onChangeInput({ target: { value: 'http://image' } } as any, 'image');
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.onChangeInput({ target: { value: '433' } } as any, 'price', true);
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.handleChangeSelect('433');
    });

    expect(result.current.disabledButton).toEqual(false);

    act(() => {
      result.current.onChangeInput({ target: { value: '' } } as any, 'image');
    });

    expect(result.current.disabledButton).toEqual(true);
  });

  it('should call axios.post', () => {
    const spyAxios = jest.spyOn(axios, 'post');

    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleInsertProduct();
    });

    expect(spyAxios.mock.calls[0][1]).toEqual(result.current.product);

    expect(spyAxios.mock.calls.length).toEqual(1);
  });
});
