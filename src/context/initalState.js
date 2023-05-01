import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData"

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
    user: userInfo,
    drinkItems: null,
    cartShow: false,
    cartItems: cartInfo,
}