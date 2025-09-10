import api from "./api";

export const addToWishlist = (productId: string) => {
  const token = localStorage.getItem('token');
  return api.post("/wishlist", { productId }, {
    headers: {
      'token': `${token}`
    }
  });
};

export const removeFromWishlist = (productId: string) => {
  const token = localStorage.getItem('token');
  return api.delete(`/wishlist/${productId}`, {
    headers: {
      'token': `${token}`
    }
  });
};

export const getWishlist = () => {
  const token = localStorage.getItem('token');
  return api.get("/wishlist", {
    headers: {
      'token': `${token}` 
    }
  });
};
