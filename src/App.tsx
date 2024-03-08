import './App.css'
import Store from './pages/Store/Store.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Navbar from './components/navbar/Navbar.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Cart from './pages/Cart/Cart.tsx'

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Store />,
      },
      {
        path: '/cart',
        element: <Cart />,
      }
    ],
    errorElement: <NotFoundPage />
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>)
}

export default App
