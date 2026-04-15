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
window.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.magnetic-grid');
    let mouse = { x: -2000, y: -2000 };
    let isAuto = true;
    let time = 0;

    // Функція перевірки, чи миша всередині будь-якого банера
    const checkMouseInBanner = (x, y) => {
        let inside = false;
        document.querySelectorAll('.section-banner_anim').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                inside = true;
            }
        });
        return inside;
    };

    const updateMouse = (e) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;

        // Вмикаємо мишу тільки якщо вона всередині банера
        if (checkMouseInBanner(x, y)) {
            mouse.x = x;
            mouse.y = y;
            isAuto = false;
        } else {
            isAuto = true;
        }
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchmove', updateMouse, { passive: true });
    // Якщо миша зовсім покинула вікно браузера — вмикаємо авто
    document.addEventListener('mouseleave', () => { isAuto = true; });

    let gridData = [];

    function initGrid(data) {
        const { grid, section } = data;
        grid.innerHTML = '';
        data.lines = [];

        const isMobile = window.innerWidth < 768;
        const isWhite = section.classList.contains('white-theme');

        // КРОК: 75 для мобайлу (щоб не було занадто густо), 100/60 для десктопа
        const step = isMobile ? 75 : (isWhite ? 100 : 60);

        const cols = Math.ceil(window.innerWidth / step) + 1;
        const rows = Math.ceil(section.offsetHeight / step) + 1;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < cols * rows; i++) {
            const line = document.createElement('div');
            line.className = 'line';
            const wrap = document.createElement('div');
            wrap.className = 'line-wrapper';
            wrap.style.width = wrap.style.height = step + 'px';
            wrap.appendChild(line);
            fragment.appendChild(wrap);
            data.lines.push({ el: line, angle: 0 });
        }
        grid.appendChild(fragment);
        grid.style.gridTemplateColumns = `repeat(${cols}, ${step}px)`;
    }

    function animate() {
        const isMobile = window.innerWidth < 768;
        time += 0.008;

        gridData.forEach(data => {
            const { section, lines } = data;
            const isWhite = section.classList.contains('white-theme');
            const title = section.querySelector('h1');
            const titleRect = title ? title.getBoundingClientRect() : null;
            const sectionRect = section.getBoundingClientRect();

            const radius = isMobile ? 150 : (isWhite ? 220 : 160);
            const baseCol = getComputedStyle(section).getPropertyValue('--line-color').trim();
            const activeCol = getComputedStyle(section).getPropertyValue('--active-color').trim();

            let targetX, targetY;

            if (isAuto) {

                targetX = sectionRect.left + (section.offsetWidth / 2) + Math.cos(time) * (isMobile ? 100 : 250);
                targetY = sectionRect.top + (section.offsetHeight / 2) + Math.sin(time * 0.8) * 80;
            } else {
                targetX = mouse.x;
                targetY = mouse.y;
            }

            lines.forEach(l => {
                const rect = l.el.getBoundingClientRect();
                if (rect.top > window.innerHeight + 50 || rect.bottom < -50) return;

                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                let isUnderText = false;
                if (titleRect) {
                    isUnderText = (
                        cx > titleRect.left - 20 && cx < titleRect.right + 20 &&
                        cy > titleRect.top - 15 && cy < titleRect.bottom + 15
                    );
                }

                const dx = targetX - cx;
                const dy = targetY - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                l.angle += (angle - l.angle) * 0.12;

                const prox = Math.max(0, 1 - dist / radius);
                const scaleAmount = isWhite ? 0.6 : 0.4;

                l.el.style.transform = `rotate(${l.angle}deg) scaleY(${1 + prox * scaleAmount})`;
                l.el.style.opacity = isUnderText ? 0 : (0.22 + prox * 0.78);
                l.el.style.background = prox > 0.1 ? activeCol : baseCol;
            });
        });

        requestAnimationFrame(animate);
    }

    grids.forEach(grid => {
        gridData.push({
            grid,
            section: grid.closest('.section-banner_anim'),
            lines: []
        });
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            gridData.forEach(initGrid);
        }, 250);
    });

    gridData.forEach(initGrid);
    animate();
});

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
