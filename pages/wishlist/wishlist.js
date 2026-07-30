// let wishlistItem = {
//     img: '',
//     description: '',
//     originalPrice: ,
//     discountPrice: ,       // optional
//     isInStock:
// }

let wishlist1 = [{
        img: '../../assets/images/wishlistImgs/Image.png',
        description: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
        originalPrice: 1299,
        // discountPrice: 999,
        isInStock: true
    },
    {
        img: '../../assets/images/wishlistImgs/Image.png',
        description: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
        originalPrice: 199,
        discountPrice: 99,
        isInStock: false
    },
    {
        img: '../../assets/images/wishlistImgs/Image.png',
        description: 'Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black',
        originalPrice: 129,
        discountPrice: 99,
        isInStock: true
    }
]

// localStorage.setItem("wishlist", JSON.stringify(wishlist1));









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

let emptyWishlist = document.getElementById('emptyWishlist')
let wishlistContent = document.getElementById('wishlistContent')
let wishlistItems = document.getElementById('wishlistItems')
let toastBody = document.querySelector('.toast-body')


const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)


function showWishlist() {
    if (!wishlist || wishlist.length == 0) {
        wishlistIcon.innerText = ''
        wishlistIcon.classList.remove('cart-badge')

        emptyWishlist.classList.replace('d-none', 'd-flex')
        wishlistContent.classList.add('d-none')
    } else {
        wishlistIcon.innerText = wishlist.length
        wishlistIcon.classList.add('cart-badge')

        wishlistItems.innerHTML = ''
        wishlist.forEach((wishlistItem, index) => {
                    wishlistItems.innerHTML += `                    <div class="row  align-items-center  gy-2 gy-md-0 ">
                        <div class="col-12 col-md-5 d-flex column-gap-3 align-items-center ">
                            <img src=${wishlistItem.img} alt=${wishlistItem.description.split(" ", 10).join(' ')}>
                            <p class=" col-9">${wishlistItem.description}</p>
                        </div>
                        <div class="col-4 col-sm-3 col-md-2 ms-sm-4 ms-md-0">
                            ${wishlistItem.discountPrice ?
                            `<span class="text-decoration-line-through text-secondary">$${wishlistItem.originalPrice}</span>
                            <span>$${wishlistItem.discountPrice}</span>`
                            :
                            `<span>$${wishlistItem.originalPrice}</span>`}
                        </div>
                        <div class="col-4  col-sm-3  col-md-2  text-uppercase fw-semibold ">
                            ${wishlistItem.isInStock ?
                            '<span class="text-success">in stock</span>'
                            :'<span class="text-danger">out of stock</span>'}
                        </div>
                        <div class="col-3 col-md-3  ms-auto ms-lg-0  d-flex  column-gap-3 column-gap-md-4 align-items-center ">
                            ${wishlistItem.isInStock ?
                            `<button onclick="addToCart(${index})" class="btn-orange btn-sm btn rounded-1  p-lg-2 p-xl-3  text-uppercase fw-semibold">
                                <span class="d-none d-lg-inline me-2">add to card</span>  <i class="fa-solid fa-cart-shopping"></i>
                            </button>`
                            :
                            `<button disabled  onclick="addToCart(${index})" class="btn-secondary btn-sm btn rounded-1  p-lg-2 p-xl-3  text-uppercase fw-semibold">
                                <span class="d-none d-lg-inline me-2">add to card</span>  <i class="fa-solid fa-cart-shopping"></i>
                            </button>`}
                            <button onclick="deleteWishlistItem(${index})" class="closeIcon btn btn-outline-secondary  rounded-circle p-1">
                                <i class=" fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>`
        })
    }
}


function addToCart(i) {
    cart.unshift(wishlist[i])

    localStorage.setItem("cart", JSON.stringify(cart))
    cartIcon.innerText = cart.length
    cartIcon.classList.add('cart-badge')

    toastBody.innerText="Product is added to cart successfully."
    toastBootstrap.show()
}

function deleteWishlistItem(i) {
    wishlist.splice(i, 1)
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    showWishlist()

    toastBody.innerText="Product is removed from wishlist successfully."
    toastBootstrap.show()
}


showWishlist()