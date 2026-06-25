const sliderWrapper = document.querySelector('.six-section__slider-wrapper');

const juriSlider = new Swiper('.six-section__slider', {
    speed: 800,
    slidesPerView: 'auto',
    spaceBetween: 20,
    on: {
        progress: function (swiper, progress) {
            // if (progress > 0 && progress != 1) {
            //     sliderWrapper.classList.add('move');
            //     sliderWrapper.classList.remove('end')
            // } else if (progress == 0) {
            //     sliderWrapper.classList.remove('move')
            // }
            // else if (progress == 1) {
            //     sliderWrapper.classList.add('end')
            // }

            if (progress != 1) {
                sliderWrapper.classList.remove('end')
                sliderWrapper.classList.remove('move');
            } else {
                sliderWrapper.classList.add('end')
                sliderWrapper.classList.add('move');

            }

        }
    },
});

