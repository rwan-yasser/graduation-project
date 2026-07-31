// ==========================================
// 1. دوال السلة والوظائف العامة (خارج DOMContentLoaded)
// ==========================================

// دالة تحديث السلة (تحديث الـ Popup والـ Badge)
window.updateCartUI = function () {
    let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
    
    let totalCount = 0;
    let subTotal = 0;

    cart.forEach(item => {
        totalCount += item.quantity;
        subTotal += (item.price * item.quantity);
    });

    // تحديث رقم المنتجات فوق أيقونة السلة
    let cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = totalCount;
    }

    // تحديث المحتوى داخل الـ Popup
    const container = document.getElementById('cartItemsContainer');
    const headerTitle = document.querySelector('.cart-header');
    const totalPriceEl = document.querySelector('.total-price');

    if (container && headerTitle && totalPriceEl) {
        headerTitle.textContent = `Shopping Cart (${totalCount < 10 ? '0' + totalCount : totalCount})`;
        container.innerHTML = ''; // مسح القديم

        cart.forEach((product, index) => {
            const itemHTML = `
                <div class="cart-item d-flex align-items-center gap-3 mb-3 border-bottom pb-2">
                    <img src="${product.img}" alt="Product" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                    
                    <div class="item-details flex-grow-1 text-start">
                        <h6 class="mb-1 text-dark" style="font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px;">
                            ${product.name}
                        </h6>
                        <span class="text-muted small">${product.quantity} x $${product.price}</span>
                    </div>
                    
                    <div class="remove-item text-danger" style="cursor: pointer;" onclick="removeProductFromCart(${index})">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', itemHTML);
        });

        totalPriceEl.textContent = `$${subTotal.toFixed(2)} USD`;
    }
};

// دالة لحذف منتج من السلة من داخل الـ Popup
window.removeProductFromCart = function (index) {
    let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cliconCart', JSON.stringify(cart)); 
    window.updateCartUI(); 
};

// دالة تغيير الصورة في الـ Quick View Slider
window.changeImage = function (thumbElement) {
    let mainImgEl = document.getElementById('mainProductImg');
    if (mainImgEl) mainImgEl.src = thumbElement.src;
    
    let allThumbs = document.querySelectorAll('#thumbSlider .thumb-img');
    allThumbs.forEach(t => t.classList.remove('border-warning', 'active-thumb'));
    thumbElement.classList.add('border-warning', 'active-thumb');
};

// دالة تنظيف الخلفية السوداء (Backdrop) للمودال
window.cleanupModalBackdrops = function() {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
};
window.addEventListener('pageshow', window.cleanupModalBackdrops);


// ==========================================
// 2. تفعيل كل الأكواد عند تحميل الصفحة (مدمجة)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

    // --- 1. رسم السلة وتفعيل أيقونة السلة ---
    window.updateCartUI();
    window.cleanupModalBackdrops();

    const cartIcon = document.querySelector('.cart-icon');
    const cartPopup = document.getElementById('cartPopup');

    if (cartIcon && cartPopup) {
        cartIcon.addEventListener('click', function (e) {
            if (e.target.closest('.cart-popup') && !e.target.closest('.btn') && !e.target.closest('.remove-item')) {
                return;
            }
            cartPopup.style.display = (cartPopup.style.display === 'block') ? 'none' : 'block';
        });
    }

    // --- 2. مسح واختفاء عرض الجمعة السوداء ---
    const closeBtn = document.getElementById('closeWidgetBtn');
    const widgetBar = document.getElementById('topOfferWidget');
    if (closeBtn && widgetBar) {
        closeBtn.addEventListener('click', function () {
            widgetBar.style.transition = 'all 0.3s ease';
            widgetBar.style.opacity = '0';
            widgetBar.style.maxHeight = '0';
            widgetBar.style.padding = '0';
            widgetBar.style.overflow = 'hidden';
            setTimeout(() => { widgetBar.remove(); }, 300);
        });
    }

    // --- 3. البحث ---
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query !== '') {
                alert('جاري البحث عن: ' + query);
            } else {
                alert('يرجى كتابة كلمة للبحث!');
            }
        });
    }

    // --- 4. التايمر (العد التنازلي) ---
    let totalSeconds = (16 * 86400) + (21 * 3600) + (57 * 60) + 23;
    function updateTimer() {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            return;
        }

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
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    // --- 5. فلترة المنتجات (Tabs) ---
    const tabs = document.querySelectorAll('.tab-item');
    const products = document.querySelectorAll('.product-card');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedCategory = tab.getAttribute('data-category');
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                if (selectedCategory === 'all' || productCategory === selectedCategory) {
                    product.style.display = 'flex'; 
                } else {
                    product.style.display = 'none'; 
                }
            });
        });
    });

    // --- 6. قوائم اللغة والعملة ---
    const langBtn = document.getElementById("lang-btn");
    const langList = document.getElementById("lang-list");
    const langOptions = document.querySelectorAll(".lang-option");
    const currentLangText = document.getElementById("current-lang-text");
    const currentLangFlag = document.getElementById("current-lang-flag");

    const currencyBtn = document.getElementById("currency-btn");
    const currencyList = document.getElementById("currency-list");
    const currencyOptions = document.querySelectorAll(".currency-option");
    const currentCurrencyText = document.getElementById("current-currency-text");

    if (langBtn && langList) {
        langBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            langList.classList.toggle("d-none");
            if (currencyList) currencyList.classList.add("d-none");
        });
    }
    langOptions.forEach(function (option) {
        option.addEventListener("click", function () {
            langOptions.forEach(function (opt) {
                opt.classList.remove("bg-light", "text-dark", "fw-bold", "active-lang");
                opt.classList.add("text-secondary");
                opt.querySelector(".check-icon").classList.add("d-none");
            });
            this.classList.remove("text-secondary");
            this.classList.add("bg-light", "text-dark", "fw-bold", "active-lang");
            this.querySelector(".check-icon").classList.remove("d-none");

            currentLangText.textContent = this.getAttribute("data-lang");
            currentLangFlag.src = this.getAttribute("data-flag");
            langList.classList.add("d-none");
        });
    });

    if (currencyBtn && currencyList) {
        currencyBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            currencyList.classList.toggle("d-none");
            if (langList) langList.classList.add("d-none");
        });
    }
    currencyOptions.forEach(function (option) {
        option.addEventListener("click", function () {
            currencyOptions.forEach(function (opt) {
                opt.classList.remove("active-currency", "bg-light", "text-dark", "fw-bold");
                opt.classList.add("text-secondary");
                opt.querySelector(".currency-check-icon").classList.add("d-none");
            });
            this.classList.remove("text-secondary");
            this.classList.add("active-currency");
            this.querySelector(".currency-check-icon").classList.remove("d-none");

            currentCurrencyText.textContent = this.getAttribute("data-currency");
            currencyList.classList.add("d-none");
        });
    });

    // --- 7. قائمة المستخدم (اليوزر) وتسجيل الدخول ---
    const userIcon = document.getElementById('userIconToggle');
    const loginPopup = document.getElementById('loginPopup');
    if (userIcon && loginPopup) {
        userIcon.addEventListener('click', function (e) {
            e.preventDefault(); 
            loginPopup.classList.toggle('show'); 
        });
    }

    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const passwordInput = document.getElementById('password');
            const eyeIcon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });
    }

    const loginForm = document.querySelector('.login-popup form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            loginPopup.classList.remove('show');
            alert('تم تسجيل الدخول بنجاح! أهلاً بك في متجرنا.');
            loginForm.reset();
        });
    }

    // --- 8. إغلاق القوائم والـ Popups عند الضغط خارجها ---
    document.addEventListener("click", function (event) {
        if (langList && !langBtn.contains(event.target) && !langList.contains(event.target)) {
            langList.classList.add("d-none");
        }
        if (currencyList && !currencyBtn.contains(event.target) && !currencyList.contains(event.target)) {
            currencyList.classList.add("d-none");
        }
        if (userIcon && loginPopup && !userIcon.contains(event.target) && !loginPopup.contains(event.target)) {
            loginPopup.classList.remove('show');
        }
        if (cartIcon && cartPopup && !cartIcon.contains(event.target)) {
            cartPopup.style.display = 'none';
        }
    });

    // --- 9. نافذة Quick View Modal ---
    let quickViewModal = document.getElementById('quickViewModal');
    if (quickViewModal) {
        quickViewModal.addEventListener('show.bs.modal', function (event) {
            let button = event.relatedTarget;
            if (!button) return;

            let imgSrc = button.getAttribute('data-main-img');
            if (!imgSrc) {
                let card = button.closest('.product-card') || button.closest('.col');
                let img = card ? card.querySelector('img') : null;
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

    // --- 10. الإضافة للسلة من الكروت العادية ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            let productName = this.getAttribute('data-name') || "Product Item";
            let productPrice = parseFloat(this.getAttribute('data-price')) || 0.00;
            let productImg = this.getAttribute('data-img') || "assets/images/default.jpg";

            let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
            let existingProduct = cart.find(item => item.name === productName);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, img: productImg, quantity: 1 });
            }

            localStorage.setItem('cliconCart', JSON.stringify(cart));
            window.updateCartUI(); 
            alert(`تم إضافة "${productName}" إلى سلة التسوق بنجاح!`);
        });
    });

    // --- 11. الإضافة للسلة من داخل نافذة الـ Modal ---
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
            alert(`تم إضافة ${quantity} من "${productName}" إلى سلة التسوق!`);

            let quickViewModalEl = document.getElementById('quickViewModal');
            let modalInstance = bootstrap.Modal.getInstance(quickViewModalEl);
            if (modalInstance) modalInstance.hide();

            setTimeout(() => {
                window.cleanupModalBackdrops();
                window.location.href = "Pages/shoppingCart/shoppingCart.html"; 
            }, 200);
        });
    }

    // --- 12. التصنيفات والقائمة الضخمة (Mega Menu) ---
    const allCategoryBtn = document.getElementById("all-category-btn");
    const categoryList = document.getElementById("category-list");
    const smartphoneBtn = document.getElementById("smartphone-btn");
    const megaMenu = document.getElementById("mega-menu");

    if (allCategoryBtn) {
        allCategoryBtn.addEventListener("click", function (e) {
            e.preventDefault();
            categoryList.classList.toggle("d-none"); 
        });
    }
    if (smartphoneBtn) {
        smartphoneBtn.addEventListener("click", function (e) {
            e.preventDefault();
            megaMenu.classList.toggle("d-none");
        });
    }

    document.addEventListener("click", function (event) {
        if(allCategoryBtn && categoryList && smartphoneBtn && megaMenu) {
            const isClickInsideCategory = allCategoryBtn.contains(event.target) || categoryList.contains(event.target);
            const isClickInsideMegaMenu = smartphoneBtn.contains(event.target) || megaMenu.contains(event.target);

            if (!isClickInsideCategory && !categoryList.classList.contains("d-none")) {
                categoryList.classList.add("d-none");
                megaMenu.classList.add("d-none"); 
            }
        }
    });

    const brandLinks = document.querySelectorAll(".brand-link");
    const productGroups = document.querySelectorAll(".product-group");

    brandLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); 
            brandLinks.forEach(function (item) {
                item.classList.remove("fw-bold", "bg-light", "active-brand");
            });
            this.classList.add("fw-bold", "bg-light", "active-brand");

            productGroups.forEach(function (group) {
                group.classList.add("d-none");
            });

            const targetId = this.getAttribute("data-target");
            const targetGroup = document.getElementById(targetId);
            if (targetGroup) targetGroup.classList.remove("d-none");
        });
    });

    // --- 13. النشرة البريدية (Subscribe Modal) ---
    const form = document.querySelector('.subscribe-form');
    const subscribeModal = document.getElementById('subscribe-modal');
    const closeSubscribeModal = subscribeModal ? subscribeModal.querySelector('.close-modal') : null;

    if (form && subscribeModal && closeSubscribeModal) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            subscribeModal.style.display = 'flex';
            form.reset();
        });
        closeSubscribeModal.addEventListener('click', function () {
            subscribeModal.style.display = 'none';
        });
    }
});