

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