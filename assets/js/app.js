
// SWIPER
 var swiper = new Swiper('.swiper', {
      slidesPerView: 3,
      direction: getDirection(),
     
      navigation: {
        nextEl: '.swiper-button-next1',
        prevEl: '.swiper-button-prev1',
      },
    
      on: {
        resize: function () {
          swiper.changeDirection(getDirection());
        },
      },
    });

    function getDirection() {
      var windowWidth = window.innerWidth;
      var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

      return direction;
    }