import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { loginRoutes } from './modules/login/routes.tsx';
import { useNotification } from './shared/hooks/useNotification.ts';
import { firstLoginRoutes } from './modules/firstScreen/routes.tsx';
import { productScreens } from './modules/product/routes.tsx';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth.ts';
import { useRequests } from './shared/hooks/useRequests.ts';
import { useEffect } from 'react';
import { MethodsEnum } from './shared/enums/methods.enum.ts';
import { URL_USER } from './shared/constants/urls.ts';
import { categoryScreens } from './modules/category/routes.tsx';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer.ts';
import { orderScreens } from './modules/orders/routes.tsx';
import { userScreens } from './modules/user/routes.tsx';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...firstLoginRoutes,
  ...categoryScreens,
  ...productScreens,
  ...orderScreens,
  ...userScreens,
].map((route) => ({
  ...route,
  loader: () => verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
