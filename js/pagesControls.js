const carousel = document.querySelector('.carousel');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

prev.addEventListener('click', () => {
    carousel.scrollBy({
        left: -286,
    })
})

next.addEventListener('click', () => {
    carousel.scrollBy({
        left: 286,
    })
})