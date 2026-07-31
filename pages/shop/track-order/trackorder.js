function validateForm() {

    let orderId = document.getElementById("orderId").value.trim();
    let email = document.getElementById("email").value.trim();

    if (orderId === "") {
        alert("Please enter Order ID");
        return false;
    }

    if (email === "") {
        alert("Please enter Billing Email");
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid Email");
        return false;
    }

    window.location.href = "../order-details/orderdetails.html";
    return false;
}