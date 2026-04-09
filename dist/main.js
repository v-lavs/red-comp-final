/*
 * to include js file write: `//= include ./path-to-file`
 */

'use strict'
//MOB-MENU
const btnBurger = document.querySelector('.btn_burger');
const nav = document.querySelector('.header__nav');
const btnClose = document.querySelector('.btn_close');
const backdrop = document.querySelector('.backdrop');
const body = document.querySelector('body');


btnBurger.addEventListener('click', (e) => {
    e.preventDefault();
    nav.classList.add('is-open');
    backdrop.style.display = 'block';
    body.classList.add('disable-scroll');
});
[btnClose, backdrop].forEach(function (element){
    element.addEventListener('click', () => {
        nav.classList.remove('is-open');
        backdrop.style.display = 'none';
        body.classList.remove('disable-scroll');
    });
});


//HEADER-SCROLL
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('is-pinned', window.scrollY > 46);
});

// SLIDERS
if (document.querySelector('.slider-members')) {
    const sliderMembers = new Swiper('.slider-members', {
        spaceBetween: 20,
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.members-nav .slider__arrow_next',
            prevEl: '.members-nav .slider__arrow_prev',
        },
    });
}
if (document.querySelector('.recently-viewed')) {
    const recentlyViewedSlider = new Swiper('.recently-viewed', {
        spaceBetween: 20,
        slidesPerView: 3,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.slider__arrow_next',
            prevEl: '.slider__arrow_prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1
            },

            534: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            },
        }
    });
}
if (document.querySelector('.slider-product')) {

    const swiperThumbnail = new Swiper(".slider-thumbnail", {

        breakpoints: {
            320: {
                slidesPerView: 5,
                spaceBetween: 8,
            },
            768: {
                slidesPerView: 'auto',
                watchSlidesProgress: true,
                spaceBetween: 0,
                freeMode: {
                    enabled: true,
                },
            },

        }
    });

    const swiperProduct = new Swiper(".slider-product", {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: '.slider__arrow_next',
            prevEl: '.slider__arrow_prev',
        },

        thumbs: {
            swiper: swiperThumbnail,
        },
    });
}

// CUSTOM SELECT CHOICE.JS
const filters = document.querySelectorAll('.js-choice');

filters.forEach((select) => {
    new Choices(select, {
        allowHTML: true,
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        placeholder: true,
    });
});

//CUSTOM SORT

const sortBtn = document.getElementById('sortBtn');
const sortList = document.querySelector('.sort-list');
const sortItems = document.querySelectorAll('.sort-list li');
const sortInput = document.querySelector('#sortInput');

if (sortBtn) {
    sortBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sortList.classList.toggle('open');
    });
    sortItems.forEach(item => {
        item.addEventListener('click', (e) => {
            sortItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            sortInput.value = item.dataset.value;

            sortList.classList.remove('open');
        });
    })
    window.addEventListener('click', () => {
        sortList.classList.remove('open');
    });
}

// RANGE SLIDER
const slider = document.getElementById('priceSlider');
const priceFrom = document.getElementById('priceFrom');
const priceTo = document.getElementById('priceTo');

if (slider) {
    const minVal = parseInt(slider.dataset.min);
    const maxVal = parseInt(slider.dataset.max);
    const fromVal = parseInt(slider.dataset.from);
    const toVal = parseInt(slider.dataset.to);

    noUiSlider.create(slider, {
        start: [fromVal, toVal],
        connect: true,
        range: {
            'min': minVal,
            'max': maxVal
        },
        step: 1,
        format: {
            to: value => Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
            from: value => Number(value.replace(/\s/g, ''))
        }

    });

    slider.noUiSlider.on('update', function (values, handle) {
        if (handle === 0) priceFrom.innerHTML = values[0];
        if (handle === 1) priceTo.innerHTML = values[1];
    });
}


//ACCORDION
const acItems = document.querySelectorAll('.accordion__item');

acItems.forEach((item) => {
    const acHeader = item.querySelector('.accordion__header');

    acHeader.addEventListener("click", () => {

        toggleItem(item);
    });
});

const toggleItem = (item) => {
    const acDescription = item.querySelector('.accordion-collapse');

    if (item.classList.contains('show')) {
        acDescription.style.height = acDescription.scrollHeight + 'px';
        setTimeout(() => {
            acDescription.style.height = '0';
        }, 10);
        item.classList.remove('show');
    } else {
        acDescription.style.height = acDescription.scrollHeight + 'px';
        item.classList.add('show');

        acDescription.addEventListener('transitionend', function () {
            if (item.classList.contains('show')) {
                acDescription.style.height = 'auto';
            }
        }, {once: true});
    }
};

//SHARE BTN
document.addEventListener('click', (event) => {
    const allDetails = document.querySelectorAll('.share-dropdown');

    allDetails.forEach((details) => {

        if (!details.contains(event.target)) {
            details.removeAttribute('open');
        }
    });
});

// LIGHTBOX
if (document.querySelector('.glightbox')) {
    const lightbox = GLightbox({
        selector: '.glightbox',
        loop: true,
        zoomable: true,
        draggable: true,
        touchNavigation: true,
    });
}

//BANNER-ANIM
// const lines = document.querySelectorAll('.line');
//
// document.addEventListener('mousemove', (e) => {
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;
//     lines.forEach(line => {
//         const rect = line.getBoundingClientRect();
//         const centerX = rect.left + rect.width / 2;
//         const centerY = rect.top + rect.height / 2;
//
//         const dx = mouseX - centerX;
//         const dy = mouseY - centerY;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//
//         if (distance < 20) return;
//
//         if (distance < 450) {
//             let angle = Math.atan2(dy, dx) * (180 / Math.PI);
//             const maxTilt = 35;
//             const limitedAngle = Math.max(-maxTilt, Math.min(maxTilt, angle));
//
//             line.style.transform = `rotate(${limitedAngle}deg)`;
//         } else {
//             line.style.transform = `rotate(0deg)`;
//         }
//     });
// });

const lines = document.querySelectorAll('.line');
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const isTouch = window.matchMedia("(pointer: coarse)").matches;

// Масив для збереження поточного кута кожної лінії (для плавності)
const currentAngles = new Array(lines.length).fill(0);
const baseAngles = [];

// Ініціалізація початкових кутів
lines.forEach(line => {
    const rect = line.getBoundingClientRect();
    const angle = (rect.width || rect.height)
        ? Math.atan2(rect.height, rect.width) * (180 / Math.PI)
        : 0;
    baseAngles.push(angle);
});

if (!isTouch) {
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
}

let time = 0;
function animate() {
    time += 0.02;

    lines.forEach((line, i) => {
        let targetAngle;

        if (isTouch) {
            // Мобільна версія: плавне погойдування
            const swing = Math.sin(time * (0.5 + i * 0.08)) * 20;
            targetAngle = baseAngles[i] + swing;
        } else {
            // Десктоп: слідування за курсором
            const rect = line.getBoundingClientRect();
            const dx = mouse.x - (rect.left + rect.width / 2);
            const dy = mouse.y - (rect.top + rect.height / 2);
            targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        }

        // Плавність (LERP): 0.1 — це швидкість (чим менше, тим плавніше)
        const diff = targetAngle - currentAngles[i];
        currentAngles[i] += diff * 0.1;

        line.style.transform = `rotate(${currentAngles[i]}deg)`;
    });

    requestAnimationFrame(animate);
}

animate();

// $(document).ready(function () {
//
//   CUSTOM SELECT2
//     $('.js-choice').each(function () {
//         $(this).select2({
//             minimumResultsForSearch: Infinity,
//             width: '100%',
//             placeholder: $(this).data('placeholder'),
//         });
//     });
//
// });







//# sourceMappingURL=main.js.map
