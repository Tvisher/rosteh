const sliderWrapper = document.querySelector('.six-section__slider-wrapper');

const juriSlider = new Swiper('.six-section__slider', {
    speed: 800,
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
        nextEl: '.six-section__slider-wrapper .swiper-button-next',
        prevEl: '.six-section__slider-wrapper .swiper-button-prev',
    },
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




$(".faq-item__head").on("click", function () {
    const faqItem = $(this).parent('.faq-item');
    const faqBody = faqItem.find('.faq-item__body');
    faqBody.slideToggle("slow", function () { });
    faqItem.toggleClass('open')
});


const scenes = document.querySelectorAll('.flying-image');
scenes.forEach(scene => {
    const parallaxInstance = new Parallax(scene, {
        relativeInput: true
    });
})



document.addEventListener('DOMContentLoaded', () => {
    const declOfNum = (n, textForms) => {
        n = Math.abs(n) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return textForms[2];
        if (n1 > 1 && n1 < 5) return textForms[1];
        if (n1 === 1) return textForms[0];
        return textForms[2];
    };

    const timerBlocks = document.querySelectorAll('.timer-block');

    timerBlocks.forEach(timerBlock => {
        const dateString = timerBlock.getAttribute('data-date');
        if (!dateString) return;

        const [day, month, year] = dateString.split('.');
        const targetDate = new Date(year, month - 1, day, 0, 0, 0).getTime();

        const numBlocks = timerBlock.querySelectorAll('.num');

        if (numBlocks.length !== 3) {
            console.error('Неверная разметка: ожидается 3 блока .num');
            return;
        }

        const daysNumSpan = numBlocks[0].querySelectorAll('span')[0];
        const daysTextSpan = numBlocks[0].querySelectorAll('span')[1];

        const hoursNumSpan = numBlocks[1].querySelectorAll('span')[0];
        const hoursTextSpan = numBlocks[1].querySelectorAll('span')[1];

        const minutesNumSpan = numBlocks[2].querySelectorAll('span')[0];
        const minutesTextSpan = numBlocks[2].querySelectorAll('span')[1];

        let countdownInterval;

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(countdownInterval);

                daysNumSpan.textContent = '00';
                daysTextSpan.textContent = 'дней';

                hoursNumSpan.textContent = '00';
                hoursTextSpan.textContent = 'часов';

                minutesNumSpan.textContent = '00';
                minutesTextSpan.textContent = 'минут';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            daysNumSpan.textContent = String(days).padStart(2, '0');
            daysTextSpan.textContent = declOfNum(days, ['день', 'дня', 'дней']);

            hoursNumSpan.textContent = String(hours).padStart(2, '0');
            hoursTextSpan.textContent = declOfNum(hours, ['час', 'часа', 'часов']);

            minutesNumSpan.textContent = String(minutes).padStart(2, '0');
            minutesTextSpan.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        };

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    });
});

const menu = document.querySelector('.menu')
const formModal = document.querySelector('.form-modal-wrapper')

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.header__menu-btn')) {
        menu.classList.add('show')
    }

    if ((target.closest('.menu') && !target.closest('.menu__inner')) || target.closest('.menu__close')) {
        menu.classList.remove('show')
    }

    if (target.closest('.menu-link')) {
        menu.classList.remove('show')
    }

    if (target.closest('[data-form-modal]')) {
        formModal.classList.add('show')
    }

    if ((target.closest('.form-modal-wrapper') && !target.closest('.form-modal')) || target.closest('.modal-close-btn')) {
        formModal.classList.remove('show')
    }

    if (target.closest('.nom-item')) {
        const nomItem = target.closest('.nom-item');
        const nomModal = nomItem.querySelector('.nom-modal');
        nomModal.classList.add('show');
    }

    if ((target.closest('.nom-modal') && !target.closest('.nom-modal__content')) || target.closest('.nom-modal__close')) {
        target.closest('.nom-modal').classList.remove('show');
    }

});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const openedModal = document.querySelector('.show');
        openedModal && openedModal.classList.remove('show')
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('participation-form');
    const pubInput = document.getElementById('publicationName');
    const entInput = document.getElementById('enterpriseName');
    const checkboxes = document.querySelectorAll('input[name="category"]');
    const errorDiv = document.getElementById('error-message');

    let isFormSubmitted = false;

    function validateForm() {
        let errors = [];

        const isPubEmpty = pubInput.value.trim() === '';
        const isEntEmpty = entInput.value.trim() === '';

        if (isPubEmpty || isEntEmpty) {
            errors.push('Пожалуйста, заполните оба текстовых поля.');
        }

        const checkedCount = document.querySelectorAll('input[name="category"]:checked').length;
        if (checkedCount === 0) {
            errors.push('Пожалуйста, выберите хотя бы одну номинацию.');
        }

        if (errors.length > 0) {
            errorDiv.style.color = '#d93025';
            errorDiv.innerHTML = errors.join('<br>');
            return false;
        } else {
            errorDiv.innerHTML = '';
            return true;
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        isFormSubmitted = true;

        if (validateForm()) {

            const formData = $(form).serialize();

            $.ajax({
                url: '/api/submit-form',
                type: 'POST',
                data: formData,
                beforeSend: function () {
                    const $btn = $('.submit-btn');
                    $btn.prop('disabled', true).css('opacity', '0.5');
                    errorDiv.style.color = '#555';
                    errorDiv.textContent = 'Отправка данных...';
                },
                success: function (response) {
                    errorDiv.style.color = '#84cc16'; // Зеленый цвет
                    errorDiv.textContent = 'Форма успешно отправлена!';
                    form.reset();
                    isFormSubmitted = false;
                },
                error: function (xhr, status, error) {
                    errorDiv.style.color = '#d93025'; // Красный цвет
                    errorDiv.textContent = 'Произошла ошибка при отправке. Попробуйте позже.';
                    console.error('Ошибка AJAX:', error);
                },
                complete: function () {
                    // Возвращаем кнопку в исходное состояние независимо от результата
                    $('.submit-btn').prop('disabled', false).css('opacity', '1');
                }
            });
        }
    });

    [pubInput, entInput].forEach(input => {
        input.addEventListener('input', () => {
            if (isFormSubmitted) {
                validateForm();
            }
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (isFormSubmitted) {
                validateForm();
            }
        });
    });
});