import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CartPage from './pages/CartPage'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import ProductPage from './pages/ProductPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Catalog />} />
          <Route path="producto/:id" element={<ProductPage />} />
          <Route path="carrito" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
