import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { CategoryType } from '../../../shared/types/CategoryType';
import { setCategoriesAction } from '.';

export const useCategoryReducer = () => {
  const dispatch = useDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  const setCategories = (currentValue: CategoryType[]) => {
    dispatch(setCategoriesAction(currentValue));
  };

  return {
    categories,
    setCategories,
  };
};
