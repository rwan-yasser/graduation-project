// ==========================================
// 1. دوال السلة الأساسية 
// ==========================================

window.updateCartUI = function () {
    let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
    
    let totalCount = 0;
    let subTotal = 0;

    cart.forEach(item => {
        let qty = parseInt(item.quantity) || 1;
        let price = parseFloat(item.price) || 0;
        totalCount += qty;
        subTotal += (price * qty);
    });

    let cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) cartBadge.textContent = totalCount;

    const container = document.getElementById('cartItemsContainer');
    const headerTitle = document.querySelector('.cart-header');
    const totalPriceEl = document.querySelector('.total-price');

    if (container && headerTitle && totalPriceEl) {
        headerTitle.textContent = `Shopping Cart (${totalCount < 10 ? '0' + totalCount : totalCount})`;
        container.innerHTML = ''; 

        if (cart.length === 0) {
            container.innerHTML = '<p class="text-center text-muted my-4 fw-bold">Cart is Empty</p>';
        }

        cart.forEach((product, index) => {
            let qty = parseInt(product.quantity) || 1;
            let price = parseFloat(product.price) || 0;
            let img = product.img || 'assets/images/default.jpg';

            const itemHTML = `
                <div class="cart-item d-flex align-items-center gap-3 mb-3 border-bottom pb-2">
                    <img src="${img}" alt="Product" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                    <div class="item-details flex-grow-1 text-start">
                        <h6 class="mb-1 text-dark" style="font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
                            ${product.name}
                        </h6>
                        <span class="text-muted small">${qty} x $${price.toFixed(2)}</span>
                    </div>
                    <div class="remove-item text-danger" style="cursor: pointer; padding: 5px;" onclick="removeProductFromCart(event, ${index})">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);
        });

        totalPriceEl.textContent = `$${subTotal.toFixed(2)} USD`;
    }
};

window.removeProductFromCart = function (event, index) {
    if(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
    let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cliconCart', JSON.stringify(cart)); 
    window.updateCartUI(); 
};

window.changeImage = function (thumbElement) {
    let mainImgEl = document.getElementById('mainProductImg');
    if (mainImgEl) mainImgEl.src = thumbElement.src;
    let allThumbs = document.querySelectorAll('#thumbSlider .thumb-img');
    allThumbs.forEach(t => t.classList.remove('border-warning', 'active-thumb'));
    thumbElement.classList.add('border-warning', 'active-thumb');
};

window.cleanupModalBackdrops = function() {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
};
window.addEventListener('pageshow', window.cleanupModalBackdrops);

// ==========================================
// 2. تفعيل كل الأكواد عند التحميل
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

    window.updateCartUI();
    window.cleanupModalBackdrops();

    // --- 1. تشغيل السلة بدون تعليق ---
    const cartIcon = document.querySelector('.cart-icon');
    const cartPopup = document.getElementById('cartPopup');

    if (cartIcon && cartPopup) {
        cartIcon.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation(); 

            if (e.target.closest('.cart-popup') && !e.target.closest('.remove-item') && !e.target.closest('a.btn')) {
                return;
            }
            if (cartPopup.style.display === 'block') {
                cartPopup.style.setProperty('display', 'none', 'important');
            } else {
                cartPopup.style.setProperty('display', 'block', 'important');
                window.updateCartUI();
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (cartPopup && cartPopup.style.display === 'block' && !e.target.closest('.cart-icon')) {
            cartPopup.style.setProperty('display', 'none', 'important');
        }
    });

    // --- 2. نافذة Quick View Modal (السحر هنا) ---
    let quickViewModal = document.getElementById('quickViewModal');
    if (quickViewModal) {
        quickViewModal.addEventListener('show.bs.modal', function (event) {
            let button = event.relatedTarget;
            if (!button) return;

            // سحب الاسم والسعر من الكارت نفسه أوتوماتيك
            let card = button.closest('.product-card') || button.closest('.mini-product-card') || button.closest('.col');
            let pName = "Product Item";
            let pPrice = "0.00";

            if (card) {
                let titleEl = card.querySelector('h6') || card.querySelector('.product-title');
                let priceEl = card.querySelector('.text-primary') || card.querySelector('.product-price');
                
                if (titleEl) pName = titleEl.textContent.trim();
                if (priceEl) pPrice = priceEl.textContent.replace(/[^0-9.]/g, ''); 
            }

            // تحديث النافذة بالبيانات الجديدة
            let modalTitle = document.querySelector('#quickViewModal h4');
            let modalPrice = document.querySelector('#quickViewModal .fw-bold[style*="color: #2da5f3"]');
            
            if (modalTitle) modalTitle.textContent = pName;
            if (modalPrice) modalPrice.textContent = "$" + pPrice;

            // تصفير الكمية لـ 1
            let qtyInput = document.getElementById('qtyInput');
            if (qtyInput) qtyInput.value = "01";

            // تحديث الصور
            let imgSrc = button.getAttribute('data-main-img');
            if (!imgSrc && card) {
                let img = card.querySelector('img');
                if (img) imgSrc = img.src;
            }
            if (!imgSrc) return;

            let mainImgEl = document.getElementById('mainProductImg');
            if (mainImgEl) mainImgEl.src = imgSrc;

            let thumbSlider = document.getElementById('thumbSlider');
            if (thumbSlider) {
                thumbSlider.innerHTML = '';
                function createThumb(src, isActive = false) {
                    let thumb = document.createElement('img');
                    thumb.src = src;
                    thumb.className = `thumb-img border p-1 flex-shrink-0 ${isActive ? 'border-warning active-thumb' : ''}`;
                    thumb.style.width = '60px';
                    thumb.style.height = '60px';
                    thumb.style.objectFit = 'contain';
                    thumb.style.cursor = 'pointer';
                    thumb.onclick = function () { window.changeImage(this); };
                    return thumb;
                }
                thumbSlider.appendChild(createThumb(imgSrc, true));
                for (let i = 1; i <= 5; i++) {
                    let thumbSrc = button.getAttribute(`data-thumb${i}`);
                    if (thumbSrc && thumbSrc.trim() !== "" && !thumbSrc.includes('رابط_')) {
                        thumbSlider.appendChild(createThumb(thumbSrc, false));
                    }
                }
            }
        });
    }

    // --- 3. الإضافة للسلة من زر المودال (Quick View) ---
    const modalAddToCartBtn = document.querySelector('.modal-add-to-cart-btn');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function () {
            let productNameEl = document.querySelector('#quickViewModal h4'); 
            let productPriceEl = document.querySelector('#quickViewModal .fw-bold[style*="color: #2da5f3"]'); 
            let mainImgEl = document.getElementById('mainProductImg'); 
            let qtyInput = document.getElementById('qtyInput'); 

            let productName = productNameEl ? productNameEl.textContent.trim() : "Product Item";
            let priceText = productPriceEl ? productPriceEl.textContent.replace(/[^0-9.]/g, '') : "0";
            let productPrice = parseFloat(priceText) || 0.00;
            let productImg = mainImgEl ? mainImgEl.src : "assets/images/default.jpg";
            let quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

            let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
            let existingProduct = cart.find(item => item.name === productName);
            
            if (existingProduct) {
                existingProduct.quantity += quantity; 
            } else {
                cart.push({ name: productName, price: productPrice, img: productImg, quantity: quantity });
            }

            localStorage.setItem('cliconCart', JSON.stringify(cart));
            window.updateCartUI(); 

            let quickViewModalEl = document.getElementById('quickViewModal');
            let modalInstance = bootstrap.Modal.getInstance(quickViewModalEl);
            if (modalInstance) modalInstance.hide();
        });
    }

    // --- 4. الإضافة للسلة من الكروت العادية ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn:not(.modal-add-to-cart-btn)');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // سحب البيانات أوتوماتيك من الكارت لو مش موجودة في الزرار
            let card = this.closest('.product-card') || this.closest('.mini-product-card');
            let pName = this.getAttribute('data-name');
            let pPriceText = this.getAttribute('data-price');
            let pImg = this.getAttribute('data-img');

            if (card) {
                if (!pName) {
                    let titleEl = card.querySelector('h6') || card.querySelector('.product-title');
                    if (titleEl) pName = titleEl.textContent.trim();
                }
                if (!pPriceText) {
                    let priceEl = card.querySelector('.text-primary') || card.querySelector('.product-price');
                    if (priceEl) pPriceText = priceEl.textContent.replace(/[^0-9.]/g, '');
                }
                if (!pImg) {
                    let imgEl = card.querySelector('img');
                    if (imgEl) pImg = imgEl.src;
                }
            }

            let productName = pName || "Product Item";
            let productPrice = parseFloat(pPriceText) || 0.00;
            let productImg = pImg || "assets/images/default.jpg";

            let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
            let existingProduct = cart.find(item => item.name === productName);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, img: productImg, quantity: 1 });
            }

            localStorage.setItem('cliconCart', JSON.stringify(cart));
            window.updateCartUI(); 
            
            // عرض السلة لمدة ثانيتين عشان اليوزر يتأكد إن المنتج اتضاف
            if(cartPopup) {
                cartPopup.style.setProperty('display', 'block', 'important');
                setTimeout(() => { cartPopup.style.setProperty('display', 'none', 'important'); }, 2500);
            }
        });
    });

    // --- 5. باقي الأكواد العادية (البحث، التايمر، الفلتر، الخ) ---
    const closeBtn = document.getElementById('closeWidgetBtn');
    const widgetBar = document.getElementById('topOfferWidget');
    if (closeBtn && widgetBar) {
        closeBtn.addEventListener('click', function () {
            widgetBar.style.transition = 'all 0.3s ease';
            widgetBar.style.opacity = '0';
            widgetBar.style.maxHeight = '0';
            setTimeout(() => { widgetBar.remove(); }, 300);
        });
    }

    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = document.getElementById('searchInput').value.trim();
            if (query !== '') alert('جاري البحث عن: ' + query);
        });
    }

    let totalSeconds = (16 * 86400) + (21 * 3600) + (57 * 60) + 23;
    function updateTimer() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        if (!daysEl) return;
        if (totalSeconds <= 0) return;
        const d = Math.floor(totalSeconds / (3600 * 24));
        const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);
        daysEl.textContent = `${d}d`;
        hoursEl.textContent = `${h < 10 ? '0' + h : h}h`;
        minutesEl.textContent = `${m < 10 ? '0' + m : m}m`;
        secondsEl.textContent = `${s < 10 ? '0' + s : s}s`;
        totalSeconds--;
    }
    setInterval(updateTimer, 1000);

    const tabs = document.querySelectorAll('.tab-item');
    const products = document.querySelectorAll('.product-card');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const selectedCategory = tab.getAttribute('data-category');
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                product.style.display = (selectedCategory === 'all' || productCategory === selectedCategory) ? 'flex' : 'none';
            });
        });
    });

    const userIcon = document.getElementById('userIconToggle');
    const loginPopup = document.getElementById('loginPopup');
    if (userIcon && loginPopup) {
        userIcon.addEventListener('click', function (e) {
            e.preventDefault(); e.stopPropagation();
            loginPopup.classList.toggle('d-none');
        });
        document.addEventListener("click", function (event) {
            if (!userIcon.contains(event.target) && !loginPopup.contains(event.target)) {
                loginPopup.classList.add('d-none');
            }
        });
    }

    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const passwordInput = document.getElementById('password');
            const eyeIcon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }
});