// ----------------- CAROUSSEL -------------------------

// selection des elements
const carousel = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');  
const cards = document.querySelectorAll('.card');

// variables
let currentIndex = 0;
const cardWidth = cards[0].offsetWidth; // calcul du deplacement d'une card

// bornage du defilement
const isFirstSlide = () => currentIndex === 0; // si index card = 0 (premiere card) alors true sinon false
const isLastSlide = () => currentIndex === cards.length - 1; // si index card = cards.length - 1; (derniere card) alors true sinon false

/**
 * role : fonction pour defiler les cards/ Translation d'une longueur egale à la positon de la card * la largeur de la card
 * param : no
 * return : no 
 */
const updateCarousel = () => {
  carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  nextBtn.disabled = isLastSlide(); // Désactiver le bouton "Suivant" à la fin
  prevBtn.disabled = isFirstSlide(); // Désactiver le bouton "Précédent" au début (optionnel)
};

/**
 * role : faire defiler ou pas le caroussel (precedent)
 * param : no
 * return : no
 * algo : au click si defilement possible decrementte l'index et effectue la translation
 */
const goToPrevSlide = () => {
  if (!isFirstSlide()) {
    currentIndex--;
    updateCarousel();
  }
};

/**
 * role : faire defiler ou pas le caroussel (precedent)
 * param : no
 * return : no
 * algo : au click si defilement possible incremente l'index et effectue la translation
 */
const goToNextSlide = () => {
  if (!isLastSlide()) {
    currentIndex++;
    updateCarousel();
  }
};

// ecouteurs evenements
prevBtn.addEventListener('click', goToPrevSlide);
nextBtn.addEventListener('click', goToNextSlide);