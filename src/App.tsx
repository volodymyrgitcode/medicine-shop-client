import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Store from './pages/Store/Store';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './layout/MainLayout';
import { Cart } from './pages/Cart/Cart';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Store />,
      },
      {
        path: '/Cart',
        element: <Cart />,
      }
    ],
    errorElement: <NotFound />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>)
}
export default App
