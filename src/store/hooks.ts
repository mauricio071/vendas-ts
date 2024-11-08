import { useSelector } from 'react-redux';
import type { RootState } from './';

export const useAppSelector = useSelector.withTypes<RootState>();
