function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // SLIDER
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = sliderWrapper.querySelector(field),
        
        width = window.getComputedStyle(sliderWrapper).width;

    let current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter);

    let slideIndex = 1;

    //1ST SLIDER
    // getAllIndexes();
    // showSlides(slideIndex);
    // function getAllIndexes() {
    //     if (slides.length < 10) {
    //         total.textContent = `0${slides.length}`;
    //     } else {
    //         total.textContent = slides.length;
    //     }
    // }
    // function showSlides(index) {
    //     if (index > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (index < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(slide => {
    //         slide.classList.add('hide');
    //     });
    //     slides[slideIndex - 1].classList.remove('hide');

    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }
    // function changeSlideIndex(n) {
    //     showSlides(slideIndex += n);
    //     showSlides(slideIndex);
    // }
    // prev.addEventListener('click',() => {
    //     changeSlideIndex(-1); 
    // });
    // next.addEventListener('click', () => {
    //     changeSlideIndex(1);
    // });

    //2ND SLIDER

    let offset = 0;
    getAllIndexes();
    changeSlide();

    function getAllIndexes() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }
    }
    function changeSlide() {
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    sliderInner.style.width = 100 * slides.length + '%';

    sliderInner.style.display = 'flex';

    sliderInner.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    function getOffset(str) {
        return (+str.replace(/\D/g, ''));
    }

    //CREATE INDICATORS

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);

        dots.push(dot);
    }

    //EVENT LISTENERS FOR NEXT & PREV
    next.addEventListener('click', () => {
        if (offset == getOffset(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
            changeSlide();
        } else {
            offset += getOffset(width);
            slideIndex += 1;
            changeSlide();
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

        sliderInner.style.transform = `translateX(-${offset}px)`;
    });
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = getOffset(width) * (slides.length - 1);
            slideIndex = 4;
            changeSlide();
        } else {
            offset -= getOffset(width);
            slideIndex -=1;
            changeSlide();
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
    });

    dots.forEach(dot => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = getOffset(width) * (slideTo - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            changeSlide();

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}
export default slider;