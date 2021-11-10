let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');

const shoppingCart = {
    state: {
        cart: cart ? JSON.parse(cart) : [],
        cartCount: cartCount ? parseInt(cartCount) : 0,
    },

    mutations: {
        addToCart(state, item){
            let found = state.cart.find(product => product.productId == item.productId);
            
            if(found){
                found.quantity++;
                console.log(found.quantity);
                found.totalPrice = found.quantity * found.salePrice;
                console.log(found.totalPrice);
            }else{
                state.cart.push(item);
                item.quantity = 1;
                item.totalPrice = item.salePrice;
            }         
            state.cartCount++;     
            this.commit('saveCart');  
        },

        removeFromCart(state, item){
            let index = state.cart.indexOf(item);
            if(index > -1){
                let product = state.cart[index];
                state.cartCount -= product.quantity;
                state.cart.splice(index, 1);
            }
            this.commit('saveCart');
        },

        resetCart(state){
            state.cart = [];
            state.cartCount = 0;
            this.commit('saveCart');
        },

        saveCart(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
            window.localStorage.setItem('cartCount', state.cartCount);
        }
    }
}

export default shoppingCart;