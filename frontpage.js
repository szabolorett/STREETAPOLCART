document.addEventListener('DOMContentLoaded', () => {
    // DOM elemek lekérése
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    const bucketListContainer = document.getElementById('bucket-list-items');
    const notificationElement = document.getElementById('notification');
    
    // Kezdeti állapot beállítása a localStorage-ból
    let bucketList = JSON.parse(localStorage.getItem('tapolcaBucketList')) || [];

    // Kezdeti placeholder elem eltávolítása/elrejtése
    const initialPlaceholder = bucketListContainer.querySelector('.list-item');
    if (initialPlaceholder) {
        initialPlaceholder.remove();
    }
    
    // Eseményfigyelők hozzáadása a helyi műalkotások ikonjaira
    bookmarkButtons.forEach(button => {
        const card = button.closest('.artwork-card');
        const id = card.dataset.id;
        
        // Ellenőrzi, hogy az elem már szerepel-e a listán
        updateBookmarkIcon(button, id);

        button.addEventListener('click', () => {
            toggleBucketListItem(card.dataset.id, card.dataset.name, button);
        });
    });

    // Az összes tárolt elem megjelenítése a képernyőn
    renderBucketList();


    // --- Függvények ---

    /**
     * Hozzáadja/eltávolítja a műalkotást a bakancslistából.
     * @param {string} id - A műalkotás egyedi azonosítója.
     * @param {string} name - A műalkotás neve.
     * @param {HTMLElement} button - A megnyomott könyvjelző gomb.
     */
    function toggleBucketListItem(id, name, button) {
        const index = bucketList.findIndex(item => item.id === id);

        if (index === -1) {
            // add
            bucketList.push({ id, name, liked: false });
            showNotification(`${name} added to Bucket List!`);
        } else {
            // remove
            bucketList.splice(index, 1);
            showNotification(`${name} removed from Bucket List.`);
        }

        // Frissíti a localStorage-t és a felhasználói felületet
        saveBucketList();
        updateBookmarkIcon(button, id);
        renderBucketList();
    }

    /**
     * Frissíti a könyvjelző ikon megjelenését.
     * @param {HTMLElement} button - A könyvjelző gomb.
     * @param {string} id - A műalkotás azonosítója.
     */
    function updateBookmarkIcon(button, id) {
        const icon = button.querySelector('i');
        const isInList = bucketList.some(item => item.id === id);
        
        if (isInList) {
            icon.classList.remove('far', 'fa-bookmark');
            icon.classList.add('fas', 'fa-bookmark'); // Szín változás a CSS-ben
        } else {
            icon.classList.remove('fas', 'fa-bookmark');
            icon.classList.add('far', 'fa-bookmark');
        }
    }

    /**
     * Elmenti a bakancslistát a LocalStorage-ba.
     */
    function saveBucketList() {
        localStorage.setItem('tapolcaBucketList', JSON.stringify(bucketList));
    }

    /**
     * Megjeleníti az aktuális bakancslistát.
     */
    function renderBucketList() {
        bucketListContainer.innerHTML = ''; // Törli a jelenlegi elemeket

        bucketList.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');
            listItem.dataset.id = item.id;
            
            const likeIconClass = item.liked ? 'fas fa-heart' : 'far fa-heart';
            
            listItem.innerHTML = `
                <span class="item-name">${item.name}</span>
                <div class="item-actions">
                    <button class="like-btn" aria-label="Like artwork" data-id="${item.id}"><i class="${likeIconClass}"></i></button>
                    <button class="remove-btn" aria-label="Remove from list" data-id="${item.id}"><i class="fas fa-square"></i></button>
                </div>
            `;
            
            bucketListContainer.appendChild(listItem);
        });
        
        // Eseményfigyelők hozzáadása a dinamikusan létrehozott gombokhoz
        addBucketListListeners();
    }

    /**
     * Eseményfigyelők hozzáadása a bakancslista elemeinek gombjaihoz (lájk, eltávolítás).
     */
    function addBucketListListeners() {
        bucketListContainer.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idToRemove = e.currentTarget.dataset.id;
                const card = document.querySelector(`.artwork-card[data-id="${idToRemove}"]`);
                const bookmarkBtn = card ? card.querySelector('.bookmark-btn') : null;
                
                // Szimulálja az eltávolítást a bookmark gomb megnyomásával
                if (bookmarkBtn) {
                     toggleBucketListItem(idToRemove, card.dataset.name, bookmarkBtn);
                } else {
                     // Eltávolítás, még ha nincs is "fő" kártya
                     const itemIndex = bucketList.findIndex(item => item.id === idToRemove);
                     if (itemIndex !== -1) {
                         const itemName = bucketList[itemIndex].name;
                         bucketList.splice(itemIndex, 1);
                         saveBucketList();
                         renderBucketList();
                         showNotification(`${itemName} removed from Bucket List.`);
                     }
                }
            });
        });

        bucketListContainer.querySelectorAll('.like-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idToLike = e.currentTarget.dataset.id;
                const item = bucketList.find(i => i.id === idToLike);
                
                if (item) {
                    item.liked = !item.liked; // "Lájkolás" állapota váltása
                    saveBucketList();
                    renderBucketList(); // Teljes lista újragenerálása az állapot frissítéséhez
                }
            });
        });
    }

    /**
     * Megjelenít egy rövid, időzített értesítést.
     * @param {string} message - Az értesítés szövege.
     */
    function showNotification(message) {
        notificationElement.textContent = message;
        notificationElement.classList.add('show');
        
        setTimeout(() => {
            notificationElement.classList.remove('show');
        }, 2000); // 2 másodperc múlva eltűnik
    }

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('.header');

    menuToggle.addEventListener('click', function() {
        // A 'nav-open' class hozzáadásával/eltávolításával vezéreljük a menü láthatóságát a CSS-ben
        header.classList.toggle('nav-open');
        
        // Frissítjük az 'aria-expanded' állapotot a jobb akadálymentesség érdekében
        const isExpanded = header.classList.contains('nav-open');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
});
});