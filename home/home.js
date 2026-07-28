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