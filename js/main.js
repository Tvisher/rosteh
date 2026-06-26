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
    // Функция для правильного склонения слов (русский язык)
    // На вход принимает число и массив из трех вариантов слова
    const declOfNum = (n, textForms) => {
        n = Math.abs(n) % 100;
        const n1 = n % 10;
        if (n > 10 && n < 20) return textForms[2];
        if (n1 > 1 && n1 < 5) return textForms[1];
        if (n1 === 1) return textForms[0];
        return textForms[2];
    };

    // Находим все блоки таймеров на странице
    const timerBlocks = document.querySelectorAll('.timer-block');

    timerBlocks.forEach(timerBlock => {
        // Получаем дату из атрибута data-date
        const dateString = timerBlock.getAttribute('data-date');
        if (!dateString) return;

        // Парсим дату
        const [day, month, year] = dateString.split('.');
        const targetDate = new Date(year, month - 1, day, 0, 0, 0).getTime();

        // Находим все блоки .num внутри текущего таймера
        const numBlocks = timerBlock.querySelectorAll('.num');

        // Проверяем, что в верстке ровно 3 блока .num
        if (numBlocks.length !== 3) {
            console.error('Неверная разметка: ожидается 3 блока .num');
            return;
        }

        // Распределяем элементы: [0] - цифра, [1] - подпись
        const daysNumSpan = numBlocks[0].querySelectorAll('span')[0];
        const daysTextSpan = numBlocks[0].querySelectorAll('span')[1];

        const hoursNumSpan = numBlocks[1].querySelectorAll('span')[0];
        const hoursTextSpan = numBlocks[1].querySelectorAll('span')[1];

        const minutesNumSpan = numBlocks[2].querySelectorAll('span')[0];
        const minutesTextSpan = numBlocks[2].querySelectorAll('span')[1];

        let countdownInterval;

        // Функция пересчета
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // Если время вышло, ставим нули и дефолтные склонения
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

            // Считаем дни, часы, минуты
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // Обновляем цифры (с ведущим нулем) и склонения слов
            daysNumSpan.textContent = String(days).padStart(2, '0');
            daysTextSpan.textContent = declOfNum(days, ['день', 'дня', 'дней']);

            hoursNumSpan.textContent = String(hours).padStart(2, '0');
            hoursTextSpan.textContent = declOfNum(hours, ['час', 'часа', 'часов']);

            minutesNumSpan.textContent = String(minutes).padStart(2, '0');
            minutesTextSpan.textContent = declOfNum(minutes, ['минута', 'минуты', 'минут']);
        };

        // Запускаем сразу и вешаем интервал
        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    });
});