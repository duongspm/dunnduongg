export const actionType = {
    SET_USER: "SET_USER",
    SET_DRINK_ITEMS : "SET_DRINK_ITEMS",
    SET_CART_SHOW : "SET_CART_SHOW",
    SET_CARTITEMS : "SET_CARTITEMS",
    SET_FEED_BACK : "SET_FEED_BACK",
};

const reducer = (state, action) => {
    //console.log(action);

    switch (action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_DRINK_ITEMS:
            return {
                ...state,
                drinkItems: action.drinkItems,
            }; 
        case actionType.SET_CART_SHOW:
            return {
                ...state,
                cartShow: action.cartShow,
            }; 
        case actionType.SET_CARTITEMS:
            return {
                ...state,
                cartItems: action.cartItems,
            }; 
        case actionType.FEED_BACK:
            return {
                ...state,
                feedBack: action.feedBack,
            }; 
        default:
            return state;
    }
};

export default reducer;