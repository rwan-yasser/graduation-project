document.addEventListener("DOMContentLoaded", function() {



    // =================  كود التطبيقات (Coming Soon) =================

    const comingSoonBtns = document.querySelectorAll('.coming-soon-btn');
    const comingSoonModal = document.getElementById('coming-soon-modal');
    const closeComingSoonModal = document.querySelector('.close-coming-soon');

    if (comingSoonBtns.length > 0 && comingSoonModal && closeComingSoonModal) {


        comingSoonBtns.forEach(function(btn) {
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                comingSoonModal.style.display = 'flex';
            });
        });

        closeComingSoonModal.addEventListener('click', function() {
            comingSoonModal.style.display = 'none';
        });
    }

    // ================= (3) إغلاق أي نافذة عند الضغط في الخارج =================
    window.addEventListener('click', function(event) {
        if (event.target === subscribeModal) {
            subscribeModal.style.display = 'none';
        }
        if (event.target === comingSoonModal) {
            comingSoonModal.style.display = 'none';
        }
    });
});