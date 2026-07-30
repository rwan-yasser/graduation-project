// let cartItem = {
//     img: '',
//     description: '',
//     originalPrice: ,
//     discountPrice: ,       // optional
//     amount:
// }

let cart1 = [{
        img: '../../assets/images/cartImgs/Image.png',
        description: 'pppppp',
        originalPrice: 99,
        discountPrice: 70,
        amount: 1
    },
    {
        img: '../../assets/images/cartImgs/Image.png',
        description: 'pppppp iii ii ol lo',
        originalPrice: 99,
        // discountPrice: 70,
        amount: 2
    },
    {
        img: '../../assets/images/cartImgs/Image.png',
        description: '4K UHD LED Smart TV with Chromecast Built-in',
        originalPrice: 99,
        discountPrice: 70,
        amount: 3
    }
]

// localStorage.setItem("cart", JSON.stringify(cart1));









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




let emptyCart = document.getElementById('emptyCart')
let cartContent = document.getElementById('cartContent')
let cartItems = document.getElementById('cartItems')
let checkoutSubTotal = document.getElementById('checkoutSubTotal')
let checkoutDiscount = document.getElementById('checkoutDiscount')
let checkoutTotal = document.getElementById('checkoutTotal')
let toastBody = document.querySelector('.toast-body')


const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)


let discount = 0,
    subTotal = 0


function showCart() {
    if (!cart || cart.length == 0) {
        cartIcon.innerText = ''
        cartIcon.classList.remove('cart-badge')

        emptyCart.classList.replace('d-none', 'd-flex')
        cartContent.classList.add('d-none')
    } else {
        cartIcon.innerText = cart.length
        cartIcon.classList.add('cart-badge')

        cartItems.innerHTML = ''
        subTotal = 0
        cart.forEach((cartItem, index) => {
                    cartItems.innerHTML += `<div class="row  align-items-center  gy-2 gy-md-0 ">
                                <div class="col-12 col-md-5 d-flex column-gap-3 align-items-center ">
                                    <button onclick="deleteCartItem(${index})" class="closeIcon btn btn-outline-secondary  rounded-circle p-1">
                                        <i class=" fa-solid fa-xmark"></i>
                                    </button>
                                    <img src=${cartItem.img} alt=${cartItem.description.split(" ", 10).join(' ')}>
                                    <p class="col-9 col-md-7">${cartItem.description}</p>
                                </div>
                                <div class="col-3  col-md-2 ms-sm-4 ms-md-0">
                                    ${cartItem.discountPrice ?
                                    `<span class="text-decoration-line-through text-secondary">$${cartItem.originalPrice}</span>
                                    <span>$${cartItem.discountPrice}</span>`
                                    :
                                    `<span>$${cartItem.originalPrice}</span>`}
                                </div>
                                <div class="col-4  col-md-3 mx-auto  ">
                                    <div class="col-10 col-md-8 py-2 px-3 border border-1 rounded-1  d-flex  justify-content-between align-items-center">
                                        ${(cartItem.amount = !cartItem.amount ? 1:cartItem.amount) == 1 ?
                                            `<button disabled  class=" btn btn-sm ps-0  border-0" ><i class="fa-solid fa-minus "></i></button>`
                                            :
                                            ` <button  onclick="decreaseQuantity(${index})" class=" btn btn-sm ps-0  border-0" ><i class="fa-solid fa-minus "></i></button>`}
                                        <span>${cartItem.amount}</span>
                                        <button onclick="increaseQuantity(${index})" class=" btn btn-sm pe-0 border-0" ><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                                <div class="col-4 col-md-2  ">
                                    <span class=" d-md-none text-success fw-semibold">sub-total :</span>
                                    ${cartItem.discountPrice ?
                                    `<span>$${cartItem.discountPrice*cartItem.amount}</span>`
                                    :
                                    `<span>$${cartItem.originalPrice*cartItem.amount}</span>`}
                                </div>
                            </div>`

            subTotal += cartItem.discountPrice ? cartItem.discountPrice * cartItem.amount : cartItem.originalPrice * cartItem.amount
        })
    }
}

function showCartTotals() {
    let total = 0
    total = subTotal - discount + 61.99
    checkoutSubTotal.innerText = "$"+subTotal
    checkoutTotal.innerText ="$"+ total +" USD"
}



function deleteCartItem(i) {
    cart.splice(i, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    showCart()

    toastBody.innerText="Product is removed from cart successfully."
    toastBootstrap.show()
}

function decreaseQuantity(i) {
    cart[i].amount -= 1
    localStorage.setItem("cart", JSON.stringify(cart))
    showCart()
}

function increaseQuantity(i) {
    cart[i].amount += 1
    localStorage.setItem("cart", JSON.stringify(cart))
    showCart()
}


function updateCart() {
    showCartTotals()
}

function applyCoupon(event) {
    event.preventDefault()

    let coupouns = [
        {
            code: 'discount10',
            discountAmount: 10
        },
        {
            code: 'discount30',
            discountAmount: 30
        },
        {
            code: 'discount50',
            discountAmount: 50
        }
    ]

    event.target[0].nextElementSibling.innerHTML=''

    if (event.target[0].value == '')
    {
        event.target[0].nextElementSibling.innerHTML= '<p class="alert alert-danger mt-3 p-2">No Code Entered</p>'
    }
    else {
        for (let i = 0; i < coupouns.length; i++){
            if (coupouns[i].code == event.target[0].value)
            {
                discount = coupouns[i].discountAmount
                localStorage.setItem("discount", discount)
                checkoutDiscount.innerText = "$" + discount
                updateCart()
                toastBody.innerText='Discount is Applied and Card Totals is updated.'
                toastBootstrap.show()
                event.target[0].value = ''
                return
            }
        }
        event.target[0].nextElementSibling.innerHTML= '<p class="alert alert-danger mt-3 p-2">Invalid code</p>'
    }
}


showCart()
showCartTotals()