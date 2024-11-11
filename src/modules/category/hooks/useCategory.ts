import { useEffect, useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_CATEGORY, URL_CATEGORY_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { CategoryRoutesEnum } from '../routes';
import { useNavigate } from 'react-router-dom';

export const useCategory = () => {
  const { categories, setCategories } = useCategoryReducer();
  const [categoriesFiltered, setCategoriesFiltered] = useState(categories);
  const { request } = useRequests();
  const navigate = useNavigate();
  const [categoryIdDelete, setCategoryIdDelete] = useState<number | undefined>();

  useEffect(() => {
    if (!categories || categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);

  useEffect(() => {
    setCategoriesFiltered([...categories]);
  }, [categories]);

  const handleOnChangeSearch = (value: string) => {
    if (!value) {
      setCategoriesFiltered([...categories]);
    } else {
      setCategoriesFiltered(
        categoriesFiltered.filter((category) =>
          category.name.toUpperCase().includes(value.toUpperCase()),
        ),
      );
    }
  };

  const handleOnClickCategory = () => {
    navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };

  const handleGoToEditCategory = (categoryId: number) => {
    navigate(CategoryRoutesEnum.CATEGORY_EDIT.replace(':categoryId', `${categoryId}`));
  };

  const handleDeleteCategory = async () => {
    await request(
      URL_CATEGORY_ID.replace('{categoryId}', `${categoryIdDelete}`),
      MethodsEnum.DELETE,
      undefined,
      undefined,
      'Categoria deletada com sucesso!',
    );
    await request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    setCategoryIdDelete(undefined);
  };

  const handleCloseModalDelete = () => {
    setCategoryIdDelete(undefined);
  };

  const handleOpenModalDelete = (categoryId: number) => {
    setCategoryIdDelete(categoryId);
  };

  return {
    categories: categoriesFiltered,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleGoToEditCategory,
    handleDeleteCategory,
    openModalDelete: !!categoryIdDelete,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};
