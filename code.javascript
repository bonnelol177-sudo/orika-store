document.addEventListener('DOMContentLoaded', () => {
    // Load saved data from localStorage
    loadProducts();

    // Make images editable
    document.querySelectorAll('.editable-image').forEach(img => {
        img.addEventListener('click', () => {
            const newSrc = prompt('Enter new image URL:', img.src);
            if (newSrc) {
                img.src = newSrc;
                saveProducts();
            }
        });
    });

    // Make prices editable
    document.querySelectorAll('.editable-price').forEach(price => {
        price.addEventListener('click', () => {
            const newPrice = prompt('Enter new price:', price.textContent);
            if (newPrice) {
                price.textContent = newPrice;
                saveProducts();
            }
        });
    });

    function saveProducts() {
        const products = [];
        document.querySelectorAll('.product').forEach(product => {
            const id = product.dataset.id;
            const imgSrc = product.querySelector('.editable-image').src;
            const price = product.querySelector('.editable-price').textContent;
            products.push({ id, imgSrc, price });
        });
        localStorage.setItem('spiceProducts', JSON.stringify(products));
    }

    function loadProducts() {
        const saved = localStorage.getItem('spiceProducts');
        if (saved) {
            const products = JSON.parse(saved);
            products.forEach(p => {
                const productEl = document.querySelector(`.product[data-id="${p.id}"]`);
                if (productEl) {
                    productEl.querySelector('.editable-image').src = p.imgSrc;
                    productEl.querySelector('.editable-price').textContent = p.price;
                }
            });
        }
    }
});
