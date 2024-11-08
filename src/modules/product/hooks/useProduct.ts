import { useEffect, useState } from 'react';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../../../shared/types/ProductTypes';
import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { ProductRoutesEnum } from '../routes';

export const useProduct = () => {
  const { products, setProducts } = useProductReducer();
  const { request } = useRequests();
  const navigate = useNavigate();

  const [productsFiltered, setProductsFiltered] = useState<ProductType[]>([]);

  useEffect(() => {
    const productsWithKeys = products.map((product) => ({
      ...product,
      key: product.id,
    }));
    setProductsFiltered([...productsWithKeys]);
  }, [products]);

  useEffect(() => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts);
  }, []);

  const handleOnClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setProductsFiltered([...products]);
    } else {
      setProductsFiltered(products.filter((product) => product.name.includes(value)));
    }
  };

  const handleEditProduct = async (productId: number) => {
    navigate(ProductRoutesEnum.PRODUCT_EDIT.replace(':productId', `${productId}`));
  };

  const handleDeleteProduct = async (productId: number) => {
    await request(URL_PRODUCT_ID.replace('{productId}', `${productId}`), MethodsEnum.DELETE);
    await request(URL_PRODUCT, MethodsEnum.GET, setProducts);
  };

  return {
    handleOnClickInsert,
    onSearch,
    productsFiltered,
    handleDeleteProduct,
    handleEditProduct,
  };
};
