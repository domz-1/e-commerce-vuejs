import api from './api'
import { getCart } from './cart'
interface ShippingAddress {
  details: string
  phone: string
  city: string
}
export const getAllOrders = async () => {
  return await api.get('/orders')
}
export const getUserOrders = async () => {
    const userId = localStorage.getItem('cartOwner');
    const res = await api.get(`/orders/user/${userId}`);
    return res;
}
export const createCheckoutSession = async (
  cartId: string,
  shippingAddress: ShippingAddress,
  url: string
) => {
  const token = localStorage.getItem('token')
  return await api.post(
    `/orders/checkout-session/${cartId}?url=${url}`,
    { shippingAddress },
    {
      headers: {
        'token': `${token}`
      }
    }
  )
}
export const createCheckout = async (
  cartId: string,
  shippingAddress: ShippingAddress,
) => {
  const token = localStorage.getItem('token')
  return await api.post(
    `/orders/${cartId}`,
    { shippingAddress },
    {
      headers: {
        'token': `${token}`
      }
    }
  )
}
