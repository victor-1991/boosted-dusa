const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
    freeMode: true,

    // slidesPerView: 7,
    spaceBetween: 20,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
      1440: {
        slidesPerView: 7,
      }
      },
    });

  const hamburger = new Hamburger('.hamburger', '.header__nav', '.header__nav-link');

  // scroll 
  const headerMainElement = document.querySelector('.header__main');
  const headerMainInnerElement = document.querySelector('.header__main-inner');
  const menuElement = document.querySelector('.header__nav');
  console.log(document.body.clientWidth)
  window.addEventListener('scroll', () => {
    const yOffset = window.pageYOffset;
    if (yOffset <= 29) {
      headerMainElement.style.top = `${29 - yOffset}px`;
      menuElement.dataset.heightCorrection = 29 - yOffset + 66;
    } else {
      headerMainElement.style.top = `0px`;
      menuElement.dataset.heightCorrection = 66;
    }

    if (yOffset > 29 && yOffset < 40) {
      headerMainInnerElement.style.height = `${66 - (yOffset - 29)}px`;
      menuElement.dataset.topOffset = `${66 - (yOffset - 29).toFixed(2)}px`;
      menuElement.dataset.heightCorrection = 66 - (yOffset - 29).toFixed(2);
      
    } else  if (yOffset >= 40) {
      headerMainInnerElement.style.height = `50px`;
      menuElement.dataset.topOffset = `50px`;
      menuElement.dataset.heightCorrection = 50;
    } else {
      headerMainInnerElement.style.height = `66px`;
      menuElement.dataset.topOffset = `66px`;
  }})