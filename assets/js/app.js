
  
  // ----------------- CAROUSSEL CATEGORIE -------------------------

// selection des elements
const carousel = document.querySelector('.carousel-categorie');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');  
const cards = document.querySelectorAll('.cardCategorie');

// variables
let currentIndex = 0;
//  const cardWidth = cards[0].offsetWidth; // calcul du deplacement d'une card
cardWidth = 200; // largeur card

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

// ---------- AFFICHAGE CARDS CATEGORIE --------------------------
/**
 * role : afficher les cards categorie
 * param : {array} tableau de données
 * return : no
 */
function afficherCardsCategorie(datas){
  let zone = document.querySelector(".carousel-categorie") // ciblage
  let template = ''; // declaration
  // extraction des données et construction card / template
  console.log(datas)
  datas.forEach(card=>{
      template += 
      `
      <article class="cardCategorie">
        <div>
          <div>
              <img src="../images/${card.image}" alt="menu">
          </div>
          <p>${card.title}</p>
        </div>
      </article>
      `;    
  });  
  
  // ajout au html
  zone.innerHTML = template;

  // --------- ECOUTEUR EVENEMENT CARD CATEGORIE apres ajout du DOM template------------------
const cardsCategorie = document.querySelectorAll('.cardCategorie');
cardsCategorie.forEach(card => {
  card.addEventListener('click', (event) => {
    const categorie = event.currentTarget.querySelector('p').textContent;
   
    datasProduits(categorie);
  });
});

}

// ---------- AFFICHAGE CARDS PRODUITS --------------------------
/**
 * role : afficher les cards produits
 * param : {array} tableau de données
 * return : no
 */
function afficherCardsProduit(datas, categorie){

console.log(categorie)
console.log(datas[categorie])


  let zone = document.querySelector(".listeProduits")
  // let templateTitre = '';

  let template= ''; 
  datas[categorie].forEach(card=>{
console.log(card.image)
      template += 
      `
      <article class="cardProduit">
        <div>
          <div>
              <img src="../images/${card.image}" alt="menu">
          </div>
          <p>${card.nom}</p>
          <p>${card.prix} €</p>
        </div>
      </article>
      `;    
  });  
 
  // ajout au html
  zone.innerHTML = template;
  
}

// ------- FORM CHEVALET ----------------------------------------------
/*
const form = document.getElementById('formChevalet');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs
    const nombre1 = document.getElementById('nombre1').value;
    const nombre2 = document.getElementById('nombre2').value;
    const nombre3 = document.getElementById('nombre3').value;  

    // Envoyer les données à la nouvelle page (par exemple, en utilisant l'URLSearchParams)
    const params = new URLSearchParams();
    params.append('nombre1', nombre1);
    params.append('nombre2', nombre2);
    params.append('nombre3', nombre3);

    window.location.href = 'nouvelle_page.html?' + params.toString();
});
*/
// ---------------------- FETCHE ------------------------------------

document.addEventListener('DOMContentLoaded', () => {
 
  fetch('../../json/categories.json')
  .then(response => {
    return response.json();
  })
  .then (datas => {
    afficherCardsCategorie(datas)
  })
  .catch(error => {
    // Gérer les erreurs
    console.error('Erreur lors de la recuperation de la liste des categories :', error);
  });


});

/**
 * role : recuperation de la liste des produits
 * param : no
 * return :array : liste des produits
 */
function datasProduits(categorie) { 
  fetch('../../json/produits.json')
  .then(response => {
    return response.json();
  })
  .then (datas => {
    afficherCardsProduit(datas, categorie)
  })
  .catch(error => {
    // Gérer les erreurs
    console.error('Erreur lors de la recuperation de la liste des categories :', error);
  });

}
  