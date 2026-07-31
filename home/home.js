

document.addEventListener('DOMContentLoaded', function () {
    // 1. مسح واختفاء عرض الجمعه السوداء
    const closeBtn = document.getElementById('closeWidgetBtn');
    const widgetBar = document.getElementById('topOfferWidget');

    if (closeBtn && widgetBar) {
        closeBtn.addEventListener('click', function () {
            widgetBar.style.transition = 'all 0.3s ease';
            widgetBar.style.opacity = '0';
            widgetBar.style.maxHeight = '0';
            widgetBar.style.padding = '0';
            widgetBar.style.overflow = 'hidden';
            setTimeout(() => {
                widgetBar.remove(); // تمسح العنصر من الصفحة تماماً
            }, 300);
        });
    }

    // 2. البحث عند ضغط زر Search أو Enter
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query !== '') {
                alert('جاري البحث عن: ' + query);
                // window.location.href = 'search.html?q=' + encodeURIComponent(query);
            } else {
                alert('يرجى كتابة كلمة للبحث!');
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
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
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    const products = document.querySelectorAll('.product-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. إزالة كلاس active من جميع التابات وإضافته للتاب المضغوط
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 2. معرفة الكتيجوري المحددة
            const selectedCategory = tab.getAttribute('data-category');

            // 3. فلترة المنتجات
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');

                if (selectedCategory === 'all' || productCategory === selectedCategory) {
                    product.style.display = 'flex'; // إظهار الكارت
                } else {
                    product.style.display = 'none'; // إخفاء الكارت
                }
            });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // تعريف العناصر (اللغة والعملة)
    // ==========================================
    const langBtn = document.getElementById("lang-btn");
    const langList = document.getElementById("lang-list");
    const langOptions = document.querySelectorAll(".lang-option");
    const currentLangText = document.getElementById("current-lang-text");
    const currentLangFlag = document.getElementById("current-lang-flag");

    const currencyBtn = document.getElementById("currency-btn");
    const currencyList = document.getElementById("currency-list");
    const currencyOptions = document.querySelectorAll(".currency-option");
    const currentCurrencyText = document.getElementById("current-currency-text");

    // ==========================================
    // 1. فتح وإغلاق قائمة اللغات
    // ==========================================
    if (langBtn && langList) {
        langBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            langList.classList.toggle("d-none");

            // إغلاق قائمة العملة لو كانت مفتوحة عشان ميظهروش الاتنين مع بعض
            if (currencyList) currencyList.classList.add("d-none");
        });
    }

    // تفعيل اختيار اللغة
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

            const selectedLang = this.getAttribute("data-lang");
            const selectedFlag = this.getAttribute("data-flag");

            currentLangText.textContent = selectedLang;
            currentLangFlag.src = selectedFlag;

            langList.classList.add("d-none");
        });
    });

    // ==========================================
    // 2. فتح وإغلاق قائمة العملات
    // ==========================================
    if (currencyBtn && currencyList) {
        currencyBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            currencyList.classList.toggle("d-none");

            // إغلاق قائمة اللغة لو كانت مفتوحة
            if (langList) langList.classList.add("d-none");
        });
    }

    // تفعيل اختيار العملة
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

            const selectedCurrency = this.getAttribute("data-currency");
            currentCurrencyText.textContent = selectedCurrency;

            currencyList.classList.add("d-none");
        });
    });

    // ==========================================
    // 3. إغلاق القوائم لو اليوزر داس في أي مكان برة
    // ==========================================
    document.addEventListener("click", function (event) {
        // قفل اللغة
        if (langList && !langBtn.contains(event.target) && !langList.contains(event.target)) {
            langList.classList.add("d-none");
        }
        // قفل العملة
        if (currencyList && !currencyBtn.contains(event.target) && !currencyList.contains(event.target)) {
            currencyList.classList.add("d-none");
        }
    });

});
document.addEventListener('DOMContentLoaded', function () {
    // فتح وقفل الـ Popup من أيقونة الـ Nav
    const userIcon = document.getElementById('userIconToggle');
    const loginPopup = document.getElementById('loginPopup');

    if (userIcon && loginPopup) {
        userIcon.addEventListener('click', function (e) {
            e.preventDefault(); // عشان الصفحة ما تعملش ريفريش
            loginPopup.classList.toggle('show'); // بتبدل كلاس show عشان تظهر أو تختفي
        });

        // إغلاق الـ Popup لو المستخدم ضغط في أي مكان براها
        document.addEventListener('click', function (e) {
            if (!userIcon.contains(e.target) && !loginPopup.contains(e.target)) {
                loginPopup.classList.remove('show');
            }
        });
    }

    // كود تشغيل أيقونة إظهار وإخفاء الباسورد
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

    // تحديد الفورم بتاع تسجيل الدخول
    const loginForm = document.querySelector('.login-popup form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            loginPopup.classList.remove('show');
            alert('تم تسجيل الدخول بنجاح! أهلاً بك في متجرنا.');
            loginForm.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    let quickViewModal = document.getElementById('quickViewModal');

    if (quickViewModal) {
        quickViewModal.addEventListener('show.bs.modal', function (event) {
            let button = event.relatedTarget;
            if (!button) return;

            // 1. جلب الصورة الرئيسية من الزر أو الكارت
            let imgSrc = button.getAttribute('data-main-img');
            if (!imgSrc) {
                let card = button.closest('.product-card') || button.closest('.col');
                let img = card ? card.querySelector('img') : null;
                if (img) imgSrc = img.src;
            }
            if (!imgSrc) return;

            // 2. تحديث الصورة الكبيرة في النافذة
            let mainImgEl = document.getElementById('mainProductImg');
            if (mainImgEl) {
                mainImgEl.src = imgSrc;
            }

            // 3. تفريغ السلايدر وملئه بالصورة الرئيسية + صور الزوايا
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
                    thumb.onclick = function () { changeImage(this); };
                    return thumb;
                }

                // أ- إضافة الصورة الرئيسية أولاً
                thumbSlider.appendChild(createThumb(imgSrc, true));

                // ب- جلب جميع صور الزوايا (data-thumb1, data-thumb2, ...) أوتوماتيك
                for (let i = 1; i <= 5; i++) {
                    let thumbSrc = button.getAttribute(`data-thumb${i}`);
                    if (thumbSrc && thumbSrc.trim() !== "" && !thumbSrc.includes('رابط_')) {
                        thumbSlider.appendChild(createThumb(thumbSrc, false));
                    }
                }
            }
        });
    }
});

// دالة تغيير الصورة عند الضغط على أي صورة مصغرة في السلايدر
window.changeImage = function (thumbElement) {
    let mainImgEl = document.getElementById('mainProductImg');
    if (mainImgEl) {
        mainImgEl.src = thumbElement.src;
    }
    let allThumbs = document.querySelectorAll('#thumbSlider .thumb-img');
    allThumbs.forEach(t => t.classList.remove('border-warning', 'active-thumb'));
    thumbElement.classList.add('border-warning', 'active-thumb');
};
document.addEventListener('DOMContentLoaded', function () {
    // 1. التعامل مع أزرار الإضافة للسلة في كل الصفحة
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // سحب بيانات المنتج من زرار الـ Add to Cart
            let productName = this.getAttribute('data-name') || "Product Item";
            let productPrice = parseFloat(this.getAttribute('data-price')) || 0.00;
            let productImg = this.getAttribute('data-img') || "assets/images/default.jpg";

            // جلب السلة القديمة من الـ localStorage (أو مصفوفة فارغة)
            let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];

            // التحقق هل المنتج موجود قبل كده في السلة؟ لو اه، نزود الكمية
            let existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                // لو مش موجود، نضيفه كمنتج جديد
                cart.push({
                    name: productName,
                    price: productPrice,
                    img: productImg,
                    quantity: 1
                });
            }

            // حفظ السلة وتحديث الكاونتر فوق
            localStorage.setItem('cliconCart', JSON.stringify(cart));
            updateCartBadge();

            // رسالة نجاح خفيفة للمستخدم
            alert(`تم إضافة "${productName}" إلى سلة التسوق بنجاح!`);
        });
    });

    // 2. دالة تحديث رقم الـ Badge (العدد) فوق أيقونة السلة في النافبار
    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

        // البحث عن الـ Badge في الهيدر وتحديث رقمه
        let cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = totalCount;
        }
    }

    // تحديث العدد أول ما الصفحة تفتح
    updateCartBadge();
});
document.addEventListener('DOMContentLoaded', function () {
    const modalAddToCartBtn = document.querySelector('.modal-add-to-cart-btn');

    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function () {
            // 1. سحب بيانات المنتج الحالي من شاشة الـ Quick View
            let productNameEl = document.querySelector('#quickViewModal h4'); // عنوان المنتج في المودال
            let productPriceEl = document.querySelector('#quickViewModal .fw-bold[style*="color: #2da5f3"]'); // السعر
            let mainImgEl = document.getElementById('mainProductImg'); // الصورة الكبيرة المعروضة
            let qtyInput = document.getElementById('qtyInput'); // حقل الكمية

            let productName = productNameEl ? productNameEl.textContent.trim() : "Product Item";

            // استخراج الرقم النقي من السعر (تحويله لـ Number)
            let priceText = productPriceEl ? productPriceEl.textContent.replace(/[^0-9.]/g, '') : "0";
            let productPrice = parseFloat(priceText) || 0.00;

            let productImg = mainImgEl ? mainImgEl.src : "assets/images/default.jpg";

            // قراءة الكمية المحددة في الـ Input (ولو مش موجودة تبقى 1)
            let quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

            // 2. جلب السلة من localStorage
            let cart = JSON.parse(localStorage.getItem('cliconCart')) || [];

            // 3. التحقق إذا كان المنتج موجود مسبقاً في السلة
            let existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += quantity; // زود الكمية باللي اليوزر اختاره
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    img: productImg,
                    quantity: quantity
                });
            }

            // 4. حفظ البيانات وتحديث الـ Badge فوق في النافبار
            localStorage.setItem('cliconCart', JSON.stringify(cart));

            let cartBadge = document.querySelector('.cart-badge');
            if (cartBadge) {
                let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartBadge.textContent = totalCount;
            }

            // 5. إشعار نجاح وإغلاق المودال أوتوماتيك (اختياري)
            alert(`تم إضافة ${quantity} من "${productName}" إلى سلة التسوق!`);

            // إغلاق نافذة المودال بعد الإضافة
            let quickViewModalEl = document.getElementById('quickViewModal');
            let modalInstance = bootstrap.Modal.getInstance(quickViewModalEl);
            if (modalInstance) {
                modalInstance.hide();
            }

            // تنظيف الباكيدج السوداء والانتقال لصفحة السلة بعد جزء من الثانية
            setTimeout(() => {
                cleanupModalBackdrops();
                window.location.href = "Pages/shoppingCart/shoppingCart.html"; 
            }, 200);
        });
    }
});
// دالة لتنظيف أي خلفية سوداء عالقة بعد إغلاق أي Modal
function cleanupModalBackdrops() {
    // إزالة كلاس الـ modal-open من الجسم عشان الشاشة ترجع تتحرك عادي
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    // مسح أي عناصر خلفية سوداء (Backdrop) عالقة
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
}

// تشغيل التنظيف أول ما الصفحة تفتح أو يحصل انتقال
document.addEventListener('DOMContentLoaded', cleanupModalBackdrops);
window.addEventListener('pageshow', cleanupModalBackdrops);
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. تعريف العناصر
    // ==========================================
    const allCategoryBtn = document.getElementById("all-category-btn");
    const categoryList = document.getElementById("category-list");

    const smartphoneBtn = document.getElementById("smartphone-btn");
    const megaMenu = document.getElementById("mega-menu");

    // ==========================================
    // 2. فتح وقفل قائمة All Category عند الضغط
    // ==========================================
    allCategoryBtn.addEventListener("click", function (e) {
        e.preventDefault();
        categoryList.classList.toggle("d-none"); // يبدل بين إظهار وإخفاء القائمة
    });

    // ==========================================
    // 3. فتح وقفل الـ Mega Menu عند الضغط على SmartPhone
    // ==========================================
    smartphoneBtn.addEventListener("click", function (e) {
        e.preventDefault();
        megaMenu.classList.toggle("d-none");
    });

    // ==========================================
    // 4. إخفاء القوائم لو اليوزر داس في أي مكان فاضي
    // ==========================================
    document.addEventListener("click", function (event) {
        // التحقق من مكان الضغطة
        const isClickInsideCategory = allCategoryBtn.contains(event.target) || categoryList.contains(event.target);
        const isClickInsideMegaMenu = smartphoneBtn.contains(event.target) || megaMenu.contains(event.target);

        // لو الضغطة برة قائمة All Category، اقفلها
        if (!isClickInsideCategory && !categoryList.classList.contains("d-none")) {
            categoryList.classList.add("d-none");
            megaMenu.classList.add("d-none"); // ونقفل كمان القائمة الكبيرة معاها
        }
    });

    // ==========================================
    // 5. التحكم التفاعلي في تبديل المنتجات داخل القائمة
    // ==========================================
    const brandLinks = document.querySelectorAll(".brand-link");
    const productGroups = document.querySelectorAll(".product-group");

    brandLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // نمنع الرابط إنه يعمل ريفرش للصفحة

            // أولاً: نشيل التنسيق النشط (اللون والخط العريض) من كل الماركات
            brandLinks.forEach(function (item) {
                item.classList.remove("fw-bold", "bg-light", "active-brand");
            });

            // ثانياً: نحط التنسيق النشط للماركة اللي دوسنا عليها بس
            this.classList.add("fw-bold", "bg-light", "active-brand");

            // ثالثاً: نخفي كل مجموعات المنتجات
            productGroups.forEach(function (group) {
                group.classList.add("d-none");
            });

            // رابعاً: نجيب الـ ID الخاص بالماركة ونظهر المنتجات بتاعتها
            const targetId = this.getAttribute("data-target");
            const targetGroup = document.getElementById(targetId);

            // لو الـ ID موجود، نشيل منه كلاس الإخفاء عشان يظهر
            if (targetGroup) {
                targetGroup.classList.remove("d-none");
            }
        });
    });

});
document.addEventListener("DOMContentLoaded", function () {

    // =================  كود النشرة البريدية =================
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