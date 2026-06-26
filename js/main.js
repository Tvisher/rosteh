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
    // Находим все блоки таймеров на странице
    const timerBlocks = document.querySelectorAll('.timer-block');

    timerBlocks.forEach(timerBlock => {
        // Получаем дату из атрибута data-date
        const dateString = timerBlock.getAttribute('data-date');
        if (!dateString) return;

        // Парсим дату из формата "ДД.ММ.ГГГГ"
        const [day, month, year] = dateString.split('.');

        // В JavaScript месяцы начинаются с 0, поэтому отнимаем 1 (month - 1)
        const targetDate = new Date(year, month - 1, day, 0, 0, 0).getTime();

        // Находим все span внутри текущего блока
        const spans = timerBlock.querySelectorAll('span');

        // Проверяем, что у нас ровно 3 тега span (часы, минуты, секунды)
        if (spans.length !== 3) {
            console.error('Неверная разметка таймера. Ожидается 3 тега <span>.');
            return;
        }

        const hoursSpan = spans[0];
        const minutesSpan = spans[1];
        const secondsSpan = spans[2];

        let countdownInterval;

        // Функция для пересчета и вывода времени
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // Если время вышло, останавливаем таймер и выводим нули
            if (distance <= 0) {
                clearInterval(countdownInterval);
                hoursSpan.textContent = '00';
                minutesSpan.textContent = '00';
                secondsSpan.textContent = '00';
                return;
            }

            // Считаем общее количество оставшихся часов, минут и секунд
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Обновляем текст в span, добавляя ведущий ноль (09 вместо 9)
            hoursSpan.textContent = String(hours).padStart(2, '0');
            minutesSpan.textContent = String(minutes).padStart(2, '0');
            secondsSpan.textContent = String(seconds).padStart(2, '0');
        };

        // Запускаем обновление сразу, чтобы не было задержки при загрузке
        updateTimer();

        // Запускаем интервал на каждую секунду
        countdownInterval = setInterval(updateTimer, 1000);
    });
});