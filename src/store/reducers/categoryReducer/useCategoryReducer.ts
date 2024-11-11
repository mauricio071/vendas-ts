import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { CategoryType } from '../../../shared/types/CategoryType';
import { setCategoriesAction, setCategoryAction } from '.';

export const useCategoryReducer = () => {
  const dispatch = useDispatch();
  const { categories, category } = useAppSelector((state) => state.categoryReducer);

  const setCategories = (currentValue: CategoryType[]) => {
    dispatch(setCategoriesAction(currentValue));
  };

  const setCategory = (currentValue?: CategoryType) => {
    dispatch(setCategoryAction(currentValue));
  };

  return {
    categories,
    category,
    setCategories,
    setCategory,
  };
};
