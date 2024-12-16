import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ProductPage } from '@/pages/ProductPage'
import { CreateProductPage } from '@/pages/CreateProductPage'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: '404',
  },
  {
    path: '/products',
    element: <ProductPage />,
  },
  {
    path: '/create-product',
    element: <CreateProductPage />,
  },
])