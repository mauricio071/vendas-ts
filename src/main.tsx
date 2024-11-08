import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GlobalProvider } from './shared/hooks/useGlobalContext.tsx';
import { DataProvider } from './shared/hooks/useDataContext.tsx';
import store from './store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* <GlobalProvider> */}
    {/* <DataProvider> */}
    <App />
    {/* </DataProvider> */}
    {/* </GlobalProvider> */}
  </Provider>,
);
