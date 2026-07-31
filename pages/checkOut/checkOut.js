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

let emptyPage = document.getElementById('emptyPage')
let checkoutContent = document.getElementById('checkoutContent')
let summaryCartItems = document.getElementById('summary-card-items')
let checkoutSubTotal = document.getElementById('checkoutSubTotal')
let checkoutDiscount = document.getElementById('checkoutDiscount')
let checkoutTotal = document.getElementById('checkoutTotal')

let discount = Number(localStorage.getItem("discount"))

let subTotal = 0


function showOrderSummary() {
    if (!cart || cart.length == 0) {

        emptyPage.classList.replace('d-none', 'd-flex')
        checkoutContent.classList.add('d-none')
    } else {


        summaryCartItems.innerHTML = ''
        subTotal = 0
        cart.forEach((cartItem, index) => {
            summaryCartItems.innerHTML += `<div class="col-12 ">
                            <div class="row align-items-center ">
                                <div class="col-3 ">
                                    <img src=${cartItem.img} class="w-100" alt=${cartItem.description.split(" ", 10).join(' ')}>
                                </div>
                                <div class="col-9">
                                    <p class="col-12 text-truncate mb-1">${cartItem.description}</p>
                                    <span>${!cartItem.amount ? cartItem.amount=1 : cartItem.amount} x</span>
                                    <span class="text-blue fw-semibold">$
                                    ${cartItem.discountPrice ? cartItem.discountPrice : cartItem.originalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>`

            subTotal += cartItem.discountPrice ? cartItem.discountPrice * cartItem.amount : cartItem.originalPrice * cartItem.amount
        })
    }
}

function showOrderSummaryTotals() {
    let total = 0
    total = subTotal - discount + 61.99
    checkoutSubTotal.innerText = "$" + subTotal
    discount != 0 ? checkoutDiscount.innerText = "$" + discount : ''
    checkoutTotal.innerText = "$" + total + " USD"
}




showOrderSummary()
showOrderSummaryTotals()





//? validation part

let registerForm = document.getElementById('registerForm')
let requiredInputs = registerForm.querySelectorAll(".required")


let toastBody = document.querySelector('.toast-body')


const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)



let handleError = (ele, msg = "") => {
    ele.nextElementSibling.innerText = msg
}

function validation(input, regex, msg) {
    let inputValue = input.value.trim();
    (regex.test(inputValue)) ? handleError(input): handleError(input, msg)
}

registerForm.addEventListener('input', (e) => {
    switch (e.target.id) {
        case "inputFirstName":
        case "inputLastName":
            validation(e.target, /^[A-Za-z]{3,20}$/, 'Name must be at least 3 characters ')
            break

        case "inputZip":
            validation(e.target, /^\d{5,6}$/, 'Enter a valid ZIP code (5 or 6 numbers')
            break
        case "inputEmail":
            validation(e.target, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid Email')
            break
        case "inputPhone":
            validation(e.target, /^(010|011|012|015)\d{8}$/, 'Invalid phone number ( must be 12 numbers start with 010|011|012|015)')
            break
        case "inputCardName":
            validation(e.target, /^[A-Za-z ]{3,40}$/, 'Enter the card holder name ')
            break
        case "inputCardNumber":
            validation(e.target, /^\d{16}$/, 'Card number must be 16 digits')
            break
        case "inputExpireDate":
            validation(e.target, /^(0[1-9]|1[0-2])\/\d{2}$/, 'Enter the card expire date')
            break
        case "inputCardCVC":
            validation(e.target, /^\d{3,4}$/, 'CVC must be 3 or 4 digits')
            break
        default:
            if (e.target.classList.contains("required")) {
                handleError(e.target);
            }
    }

})



registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let allValid = true

    requiredInputs.forEach((input) => {
        if (input.value.trim() == "") {
            handleError(input, "This field is required")
            allValid = false
            return
        }
        if (input.nextElementSibling.innerText != "") {
            allValid = false
        }
    })

    if (allValid) {
        localStorage.removeItem('cart')
        localStorage.removeItem('discount')
        cartIcon.innerText = ''
        cartIcon.classList.remove('cart-badge')
        window.location.href = "successCheckout/successCheckout.html"
    } else {
        toastBody.innerText = "Missing or Wrong Fields"
        toastBootstrap.show()
    }
})