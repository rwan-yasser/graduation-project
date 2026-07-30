let cart = JSON.parse(localStorage.getItem("cart")) || []
console.log(cart);
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
console.log(wishlist);

let cartIcon = document.getElementById('cartIcon')
let wishlistIcon = document.getElementById('wishlistIcon')

if (!cart || cart.length == 0) {
    cartIcon.innerText = ''
    cartIcon.classList.remove('cart-badge')
} else {
    cartIcon.innerText = cart.length
    cartIcon.classList.add('cart-badge')
}
if (!wishlist || wishlist.length == 0) {
    wishlistIcon.innerText = ''
    wishlistIcon.classList.remove('cart-badge')
} else {
    wishlistIcon.innerText = wishlist.length
    wishlistIcon.classList.add('cart-badge')
}