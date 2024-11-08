import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../../product/routes';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import Loading from '../../../shared/components/loading/Loading';

function FirstScreen() {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ProductRoutesEnum.PRODUCT);
    }
  }, [user]);

  return <Loading />;
}

export default FirstScreen;
