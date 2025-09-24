// Функция для инициализации сайта
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация кнопки ИИ
  initAIButton();
  
  // Инициализация мобильного меню
  initMobileMenu();
  
  // Плавная прокрутка для навигации
  initSmoothScroll();
  
  // Инициализация анимаций при прокрутке
  initScrollAnimations();
  
  // Инициализация анимаций главной страницы
  initHeroAnimations();
});

// Инициализация кнопки ИИ
function initAIButton() {
  const aiButton = document.querySelector('.ai-button');
  const aiPage = document.querySelector('.ai-page');
  const backButton = document.querySelector('.back-btn');
  const aiSubmitButton = document.querySelector('#askAI');
  const aiTextarea = document.querySelector('#aiQuestion');
  const aiResponse = document.querySelector('#aiResponse');
  
  // Открытие страницы ИИ
  if (aiButton) {
    aiButton.addEventListener('click', function() {
      aiPage.style.display = 'block';
      document.body.style.overflow = 'hidden';
      // Фокус на поле ввода через небольшую задержку
      setTimeout(() => {
        aiTextarea.focus();
      }, 300);
    });
  }
  
  // Возврат на основную страницу
  if (backButton) {
    backButton.addEventListener('click', function() {
      aiPage.style.display = 'none';
      document.body.style.overflow = '';
    });
  }
  
  // Обработка запроса к ИИ
  if (aiSubmitButton && aiTextarea) {
    const submitQuery = function() {
      const query = aiTextarea.value.trim();
      if (query) {
        // Отключаем кнопку и показываем загрузку
        aiSubmitButton.disabled = true;
        aiSubmitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обрабатываем...';
        
        // Показываем анимацию загрузки
        aiResponse.className = 'ai-response loading';
        aiResponse.innerHTML = `
          <div class="loading-dots">
            <span>Анализирую ваш вопрос</span>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>
        `;
        
        // Имитация ответа ИИ с более реалистичными ответами
        setTimeout(function() {
          const responses = getAIResponse(query);
          
          aiResponse.className = 'ai-response';
          aiResponse.innerHTML = `<div class="ai-response-text">${responses}</div>`;
          
          // Возвращаем кнопку в исходное состояние
          aiSubmitButton.disabled = false;
          aiSubmitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить вопрос';
          
          // Плавная прокрутка к ответу
          aiResponse.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 2000 + Math.random() * 1000); // Случайная задержка для реалистичности
      }
    };
    
    // Отправка по клику на кнопку
    aiSubmitButton.addEventListener('click', submitQuery);
    
    // Отправка по Ctrl+Enter
    aiTextarea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        submitQuery();
      }
    });
  }
}

// Функция для заполнения вопроса из подсказок
function fillQuestion(question) {
  const aiTextarea = document.querySelector('#aiQuestion');
  if (aiTextarea) {
    aiTextarea.value = question;
    aiTextarea.focus();
    // Плавная прокрутка к полю ввода
    aiTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Функция генерации ответов ИИ
function getAIResponse(query) {
  const queryLower = query.toLowerCase();
  
  // Ответы на основе ключевых слов
  if (queryLower.includes('регистрац') && queryLower.includes('ип')) {
    return `
      <h4>📋 Регистрация ИП в Казахстане</h4>
      <p><strong>Необходимые документы:</strong></p>
      <ul>
        <li>Удостоверение личности</li>
        <li>Справка о налоговой задолженности</li>
        <li>Заявление установленной формы</li>
      </ul>
      <p><strong>Процедура:</strong></p>
      <ol>
        <li>Подача документов в ЦОН или онлайн через egov.kz</li>
        <li>Оплата государственной пошлины (1 МРП)</li>
        <li>Получение свидетельства о регистрации (1-2 рабочих дня)</li>
      </ol>
      <p><strong>💡 Совет:</strong> Мы поможем вам с полным процессом регистрации, включая выбор кодов деятельности и налогового режима.</p>
    `;
  }
  
  if (queryLower.includes('налог') && queryLower.includes('тоо')) {
    return `
      <h4>💰 Налогообложение ТОО</h4>
      <p><strong>Основные налоги для ТОО:</strong></p>
      <ul>
        <li><strong>Корпоративный подоходный налог:</strong> 20% с прибыли</li>
        <li><strong>НДС:</strong> 12% (при превышении порога в 30 000 МРП)</li>
        <li><strong>Социальный налог:</strong> 9.5% от фонда оплаты труда</li>
        <li><strong>Обязательные пенсионные взносы:</strong> 10% от зарплаты сотрудников</li>
      </ul>
      <p><strong>🎯 Возможности оптимизации:</strong></p>
      <p>Рассмотрите специальные налоговые режимы для малого бизнеса, которые могут значительно снизить налоговую нагрузку.</p>
    `;
  }
  
  if (queryLower.includes('касс') || queryLower.includes('ккм')) {
    return `
      <h4>🏪 Кассовые аппараты: когда нужны</h4>
      <p><strong>Обязательное применение ККМ:</strong></p>
      <ul>
        <li>При розничной торговле товарами</li>
        <li>При оказании услуг физическим лицам</li>
        <li>При работе с наличными деньгами</li>
      </ul>
      <p><strong>Исключения:</strong></p>
      <ul>
        <li>Торговля на рынках (до определенного оборота)</li>
        <li>Некоторые виды услуг</li>
        <li>Работа исключительно по безналичному расчету между ЮЛ</li>
      </ul>
      <p><strong>📱 Современные решения:</strong> WebKassa, ReKassa - облачные кассы, не требующие покупки оборудования.</p>
    `;
  }
  
  if (queryLower.includes('эсф') || queryLower.includes('счет-фактур')) {
    return `
      <h4>📄 Электронные счета-фактуры (ЭСФ)</h4>
      <p><strong>Кто обязан применять ЭСФ:</strong></p>
      <ul>
        <li>Плательщики НДС</li>
        <li>При реализации товаров/услуг на сумму свыше 1000 МРП</li>
        <li>При импорте товаров</li>
      </ul>
      <p><strong>Как работать с ЭСФ:</strong></p>
      <ol>
        <li>Регистрация в информационной системе</li>
        <li>Получение ЭЦП (электронной цифровой подписи)</li>
        <li>Выставление ЭСФ покупателю в течение 15 дней</li>
        <li>Получение подтверждения от покупателя</li>
      </ol>
      <p><strong>⚡ Наши услуги:</strong> Полное сопровождение работы с ЭСФ, обучение персонала.</p>
    `;
  }
  
  if (queryLower.includes('приостанов') || queryLower.includes('заморож')) {
    return `
      <h4>⏸️ Приостановка деятельности ИП</h4>
      <p><strong>Когда можно приостановить:</strong></p>
      <ul>
        <li>Временное прекращение предпринимательской деятельности</li>
        <li>Отсутствие доходов</li>
        <li>Сезонный характер бизнеса</li>
      </ul>
      <p><strong>Процедура:</strong></p>
      <ol>
        <li>Подача уведомления в налоговые органы</li>
        <li>Сдача всей отчетности на момент приостановки</li>
        <li>Закрытие кассового аппарата (если есть)</li>
      </ol>
      <p><strong>📅 Сроки:</strong> Можно приостановить на срок от 1 месяца до 1 года.</p>
      <p><strong>⚠️ Важно:</strong> Во время приостановки нельзя вести предпринимательскую деятельность.</p>
    `;
  }
  
  if (queryLower.includes('сотрудник') || queryLower.includes('наем') || queryLower.includes('работник')) {
    return `
      <h4>👥 Трудовые отношения для ИП</h4>
      <p><strong>ИП может работать:</strong></p>
      <ul>
        <li><strong>Самостоятельно</strong> - без оформления сотрудников</li>
        <li><strong>С сотрудниками</strong> - при заключении трудовых договоров</li>
        <li><strong>С подрядчиками</strong> - по договорам ГПХ</li>
      </ul>
      <p><strong>При найме сотрудников необходимо:</strong></p>
      <ol>
        <li>Уведомить комитет труда о начале деятельности</li>
        <li>Вести трудовые книжки</li>
        <li>Производить обязательные выплаты (ВОСС, ОПВ, ИПН)</li>
        <li>Соблюдать трудовое законодательство</li>
      </ol>
      <p><strong>💡 Альтернатива:</strong> Сотрудничество с ИП на основе договоров ГПХ может быть выгоднее в некоторых случаях.</p>
    `;
  }
  
  // Общий ответ для неизвестных вопросов
  return `
    <h4>🤖 Спасибо за ваш вопрос!</h4>
    <p>Я проанализировал ваш запрос, но для предоставления точной информации мне нужно больше деталей о вашей ситуации.</p>
    <p><strong>Рекомендую:</strong></p>
    <ul>
      <li>📞 Связаться с нашими специалистами по телефону: <strong>8 777 253 79 05</strong></li>
      <li>💬 Написать в WhatsApp для быстрой консультации</li>
      <li>📧 Отправить подробный запрос на email: info@biznes-service.kz</li>
    </ul>
    <p>Наши эксперты предоставят вам персональную консультацию с учетом всех особенностей вашего бизнеса.</p>
    <p><strong>⏰ Режим работы:</strong> Пн-Пт с 9:00 до 18:00</p>
  `;
}

// Инициализация мобильного меню
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.menu');
  
  if (mobileMenuBtn && menu) {
    mobileMenuBtn.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }
}

// Плавная прокрутка для навигации
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Учитываем высоту шапки
          behavior: 'smooth'
        });
      }
    });
  }
}

// Функция для открытия WhatsApp
function openWhatsApp() {
  // Номер телефона и текст сообщения
  const phoneNumber = '77074167905';
  const message = 'Здравствуйте! Я хочу узнать подробнее о ваших услугах.';
  
  // Формируем URL для WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Открываем WhatsApp в новой вкладке
  window.open(whatsappUrl, '_blank');
}

// Инициализация анимаций при прокрутке
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Наблюдаем за карточками услуг
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    observer.observe(card);
  });

  // Наблюдаем за статистикой
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach((item, index) => {
    setTimeout(() => {
      observer.observe(item);
    }, index * 100); // Задержка для последовательного появления
  });

  // Наблюдаем за преимуществами
  const advantageCards = document.querySelectorAll('.advantage-card');
  advantageCards.forEach(card => {
    observer.observe(card);
  });
}

// Инициализация анимаций главной страницы
function initHeroAnimations() {
  const heroContent = document.querySelector('.hero-content');
  const heroElements = heroContent.querySelectorAll('.badge, h1, p, .features, .cta-buttons');
  
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s ease';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// Анимация счетчиков в статистике
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = counter.textContent.replace(/\d+/, target);
        clearInterval(timer);
      } else {
        counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
      }
    }, 20);
  });
}

// Анимация появления элементов при наведении
function addHoverEffects() {
  // Кнопки
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}