let cart = JSON.parse(localStorage.getItem("cart")) || []
console.log(cart);
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
console.log(wishlist);

let cartIcon = document.getElementById('cartIcon')
let wishlistIcon = document.getElementById('wishlistIcon')

cartIcon.innerHTML = (!cart || cart.length == 0) ? '' : `<span>${cart.length}</span>`
wishlistIcon.innerHTML = (!wishlist || wishlist.length == 0) ? '' : `<span>${wishlist.length}</span>`