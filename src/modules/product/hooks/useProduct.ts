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

  const [productIdDelete, setProductIdDelete] = useState<number | undefined>();

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

  const handleDeleteProduct = async () => {
    await request(URL_PRODUCT_ID.replace('{productId}', `${productIdDelete}`), MethodsEnum.DELETE);
    await request(URL_PRODUCT, MethodsEnum.GET, setProducts);
    setProductIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setProductIdDelete(undefined);
  };

  const handleOpenModalDelete = (productId: number) => {
    setProductIdDelete(productId);
  };

  return {
    handleOnClickInsert,
    onSearch,
    productsFiltered,
    handleDeleteProduct,
    handleEditProduct,
    openModalDelete: !!productIdDelete,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};
