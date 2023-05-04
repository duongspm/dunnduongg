export const actionType = {
    SET_USER: "SET_USER",
    SET_DRINK_ITEMS : "SET_DRINK_ITEMS",
    SET_CART_SHOW : "SET_CART_SHOW",
    SET_CARTITEMS : "SET_CARTITEMS",
    SET_FEED_BACK : "SET_FEED_BACK",
    SET_SLIDE : "SET_SLIDE",
    SET_EVENT : "SET_EVENT",
    SET_ALBUM : "SET_ALBUM",
    SET_MAN : "SET_MAN",
    SET_WOMAM : "SET_WOMAM",



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

        case actionType.SET_SLIDE:
            return {
                ...state,
                slide: action.slide,
            };

        case actionType.SET_EVENT:
            return {
                ...state,
                event: action.event,
            }; 

        case actionType.SET_ALBUM:
            return {
                ...state,
                album: action.album,
            }; 
        case actionType.SET_MAN:
            return {
                ...state,
                man: action.man,
            }; 
        case actionType.SET_WOMAN:
            return {
                ...state,
                woman: action.woman,
            }; 
        default:
            return state;
    }
};

export default reducer;