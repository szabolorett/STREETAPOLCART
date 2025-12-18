document.addEventListener('DOMContentLoaded', () => {
    // 1. Menü váltás (alapvető működés, feltételezve, hogy van egy nav menü, ami a mobil nézetben el van rejtve)
    const menuToggle = document.querySelector('.menu-toggle');
    // A menü elem, amit elrejtesz/megjelenítesz (pl. egy teljes oldalas menü)
    // Itt csak egy helytartót adok meg, mivel nincs a mockupban
    const navMenu = document.querySelector('.nav-menu'); 

    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.myFunction = !menuToggle.myFunction; // Példa egyedi állapot kezelésére
    });

    // 2. Vízszintes görgetés (Reviews slider)
    const slider = document.getElementById('reviewsSlider');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Egyszerű 'húzd és görgess' funkció (desktop és érintőképernyő emulációhoz)
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active-drag');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active-drag');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active-drag');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Görgetési sebesség
        slider.scrollLeft = scrollLeft - walk;
    });

    // 3. Vélemény beküldése (csak alapszintű eseménykezelő)
    const submitButton = document.querySelector('.review-form button');
    const reviewTextarea = document.getElementById('reviewText');
    
    submitButton.addEventListener('click', () => {
        const review = reviewTextarea.value.trim();
        if (review) {
            // Itt kellene a valós kódot elhelyezni, ami elküldi a véleményt egy szerverre
            // Pl.: fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ text: review }) })

            console.log("Submitted review:", review);
            alert("Thank you for your feedback!");
            reviewTextarea.value = ''; // Mező törlése
        } else {
            alert("Please enter a review before submitting.");
        }
    });
});