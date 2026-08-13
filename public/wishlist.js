const buttons = document.querySelectorAll('.wishlist-btn, .product-favorite-btn');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const id = button.dataset.productId;
    const active = button.classList.toggle('is-active');

    if (active) {
      fetch('/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id }),
      });
    } else {
      fetch('/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id }),
      }).then(() => {
        if (window.location.pathname === '/wishlist') {
          window.location.reload();
        }
      });
    }
  });
});
