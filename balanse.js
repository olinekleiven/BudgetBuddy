document.addEventListener('DOMContentLoaded', () => {
    const coin = document.querySelector('.coin');
    const pig = document.getElementById('pig');

    coin.addEventListener('click', () => {
        const coinRect = coin.getBoundingClientRect();
        const coinTop = coinRect.top;

        pig.style.zIndex = '2';

        void coin.offsetWidth;

        coin.style.top = coinTop + window.innerHeight - 100 + 'px'; 

        coin.addEventListener('transitionend', () => {
            coin.style.zIndex = '0'; // Assuming the piggy bank has a higher z-index
            coin.style.display = 'none'; // Hide the coin
            coin.style.top = coinTop + 'px';
            coin.style.transition = '';
            pig.style.zIndex = '0';
            coin.style.display = 'block';
            setTimeout(() => {
                coin.style.top = coinTop + 'px'; // Reset to initial position
                coin.style.transition = ''; // Remove the transition
                coin.style.display = 'block'; // Show the coin again
            }, 1000); // 1000ms delay, adjust as needed
        }, { once: true });
    });
});
       
