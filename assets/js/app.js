let commande = [];

// -------------- AU CHARGEMENT --------------------
document.addEventListener('DOMContentLoaded', () => {
  const currentUrl = window.location.pathname; // url relative
  const urlParams = new URLSearchParams(window.location.search); // parametre de l'url pour chevalet

  // page choix
  if (currentUrl === '/assets/pages/choix.html') { 
   
    datasCategorie();
    carousselCategorie ();
    afficherNumeroChevalet(urlParams);
    datasProduits('menus')
  }

  // page chevalet
  if (currentUrl === '/assets/pages/chevalet.html') { 
    
    // verification des champs du formulaire
    const regex = /^[0-9]$/;
    const nombre1 = document.getElementById('nombre1');
    nombre1.addEventListener('input', () => {
      if (!regex.test(nombre1.value)) {
        alert('Veuillez entrer un chiffre de 0 à 9.')
    }});
  
    const nombre2 = document.getElementById('nombre2');
    nombre2.addEventListener('input', () => {
      if (!regex.test(nombre2.value)) {
        alert('Veuillez entrer un chiffre de 0 à 9.')
    }});

    const nombre3 = document.getElementById('nombre3'); 
    nombre3.addEventListener('input', () => {
      if (!regex.test(nombre3.value)) {
        alert('Veuillez entrer un chiffre de 0 à 9.')
    }});
    formChevalet ();
}

});

// ---------------------- FETCHE ------------------------------------

/**
 * role : recuperation de la liste des categorie
 * param : no
 * return :array : liste des produits
 */
function datasCategorie() { 
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
}

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
    console.error('Erreur lors de la recuperation de la liste des produits :', error);
  });
}

/**
 * role : recuperation de la liste des boissons
 * param : no
 * return :array : liste des produits
 */
function datasBoissons() {
  fetch('../../json/produits.json')
    .then(response => response.json())
    .then(datas => {
    afficherCardsBoissons(datas)
   
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des boissons :', error);
    });
}


// ----------------- CAROUSSEL CATEGORIE -------------------------

function carousselCategorie() {
  
  // selection des elements
  const carousel = document.querySelector('.carousel-categorie');
  const cards = document.querySelectorAll('.cardCategorie');
  
  const prevBtn = document.querySelector('.prevCategorie');
  const nextBtn = document.querySelector('.nextCategorie'); 

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
}

// ----------------- CAROUSSEL BOISSONS -------------------------

function carousselBoissons() {
  
  // selection des elements
  const carousel = document.querySelector('.carousel-boisson');
  const cards = document.querySelectorAll('.cardBoisson');
  
  const prevBtn = document.querySelector('.prevBoisson');
  const nextBtn = document.querySelector('.nextBoisson'); 

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
}


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
  let zone = document.querySelector(".listeProduits")
  // let templateTitre = '';
  let templateTitre=
  `
    <div>
      <h3>Nos ${categorie}</h3>
      <p>Choississez nos ${categorie}</p>
    </div>
  `;

  let cardPoduit= ''; 
  datas[categorie].forEach(card=>{
    cardPoduit += 
      `
        <article class="cardProduit">
          <div>
            <div>
                <img src="../images/${card.image}" alt="menu">
            </div>
            <p>${card.nom}</p>
            <p class="priceMenu">${card.prix}</p><p>€</p>
          </div>
        </article>
      `;    
  });  
 
  // ajout au html
  zone.innerHTML = templateTitre + cardPoduit;

// --------- ECOUTEUR EVENEMENT CARD PRODUIT apres ajout du DOM template------------------

// faire la partie : hors menu pour ajouter produit au panier

const cardsProduit = document.querySelectorAll('.cardProduit');
cardsProduit.forEach(card => {
  card.addEventListener('click', (event) => {
    const produit = event.currentTarget;
    if (categorie == "menus") {
      afficherModaleTailleMenu(produit)
    
    } else {
      console.log("ajouter produit à commande")
    }
  });
});
}

// -------------- MODALES MENU ------------------------------------------

/**
 * role : affiche la modale menu
 * param : htmlElement : le produit selectionné
 */
function afficherModaleTailleMenu(produit){
  // traitement des données
  const name = produit.querySelector('p').textContent
  const price = produit.querySelector('.priceMenu').textContent
  const urlImage =  produit.querySelector('img').src

  
  let zone = document.querySelector(".modaleTailleMenu")
  let template= 
  `
    <!-- nav-->
    <nav >
      <div id="croixImageMenu">
        <img src="../images/images/supprimer.png" alt="croix pour fermer la popup">
      </div>
    </nav>
    <!-- titre -->
    <div>
        <h4>Une grosse fin ?</h4>
        <p>Le ${name} comprend un sandwich, une frite et une boisson</p>
    </div>
    <!-- taille produits -->
    <section>
        <article class="menuNormal">
            <div>
                 <img src="${urlImage}" alt="menu ${name}">
            </div>
            <p>${name}</p>
            <span hidden>${price}</span>
        </article>
        <article class="menuMax">
            <div>
                <img src="${urlImage}" alt="menu ${name}">
            </div>
            <p>${name} Maxi</p>
            <p>+ 0.50 €</p>
            <span hidden>${price}</span>
        </article>
    </section>
    <div>
        <button id="btnModalTailleMenu" >Etape suivante</button>
    </div>
  `
  zone.innerHTML = template
  // classe afficher modale
  togglerModale(".modaleTailleMenu")
  // fermeture modale par la croix
  const croix = document.getElementById("croixImageMenu");
  croix.addEventListener("click", function(){
    togglerModale(".modaleTailleMenu")
  });

  // -----  ecouteurs evenement dans la modale taille menu ------

  //ajouter le choix taille normale à la commande
  const menuNormal = document.querySelector(".menuNormal");
  menuNormal.addEventListener("click", (event) => {
    let produit = event.currentTarget;
    ajouterMenuNormalCommande(produit);
  });

  // ajouter le choix taille max à la commande
  const menuMax = document.querySelector(".menuMax");
  menuMax.addEventListener("click", (event) => {
    let produit = event.currentTarget;
    ajouterMenuMaxCommande(produit);
  });

  // boutton etape suivante
  const btnModalTailleMenu = document.getElementById("btnModalTailleMenu");
  btnModalTailleMenu.addEventListener("click", () => {
    togglerModale(".modaleTailleMenu");
   afficherModaleFrite(produit);
  });
}

// ------ fct preparation commande --------------

/**
 * role : ajouter menu normal à la commande
 * param : htmlElement : produit selectionné
 */
function ajouterMenuNormalCommande(produit) {
  menu = produit.querySelector('p').textContent;
  priceMenu = produit.querySelector('span').textContent;
  priceMenu = parseFloat(priceMenu)
  commande.menu= menu;
  commande.priceMenu= priceMenu;
  console.log(commande);
  return commande;
}

/**
 * role : ajouter menu max à la commande
 * param : htmlElement : produit selectionné
 */
function ajouterMenuMaxCommande(produit) {
  menu = produit.querySelector('p').textContent;
  priceMenu = produit.querySelector('span').textContent;
  priceMenu = parseFloat(priceMenu)+ 0.5;
  commande.menu= menu;
  commande.priceMenu= priceMenu;
  console.log(commande);
  return commande;
}

// ----------------- MODAL FRITE -----------------------

/**
 * role : affiche la modale frite
 * param : HTMLelement : le produit menu en cours
 */
function afficherModaleFrite(produit){
  // classe afficher modale
  togglerModale(".modaleFrite")

  // fermeture modale par la croix
  const croix = document.getElementById("croixImageFrite");
  croix.addEventListener("click", function(){
    togglerModale(".modaleFrite")
  });

  // retour vers modale menu
  const btnRetour = document.getElementById("btnRetourFrite");
  btnRetour.addEventListener("click", function(){
    togglerModale(".modaleFrite")
    afficherModaleTailleMenu(produit)
  });

// -----  ecouteurs evenement dans la modale frite ------

  //ajouter frite à la commande
  const friteModal = document.querySelector(".friteModal");
  friteModal.addEventListener("click", (event) => {
    let produit = event.currentTarget;
    let frite = produit.querySelector('p').textContent;
    commande.frite = frite; 
    console.log(commande)
  });

  // ajouter le choix taille max à la commande
  const potatoesModal = document.querySelector(".potatoesModal");
  potatoesModal.addEventListener("click", (event) => {
    let produit = event.currentTarget;
    let frite = produit.querySelector('p').textContent;
    commande.frite = frite; 
    console.log(commande)
  });

  // boutton etape suivante
  const btnModalTailleMenu = document.getElementById("btnModalFrite");
  btnModalTailleMenu.addEventListener("click", () => {
    togglerModale(".modaleFrite");
    afficherModaleBoisson(produit);
  });

}

// --------------- MODAL BOISSONS ---------------------------------


function afficherModaleBoisson() {
  togglerModale(".modaleBoissons");
  console.log(commande);

    // 1. recuperer les données
    datasBoissons()
     // 3. acctionner le carousel
     carousselBoissons();

}


/**
 * role : afficher les cards boisson
 * param : {array} tableau de données
 * return : no
 */
function afficherCardsBoissons(datas){
  console.log(datas.boissons);
  let zone = document.querySelector(".carousel-boisson") // ciblage
  let template = ''; // declaration
  // extraction des données et construction card / template
  datas.boissons.forEach(card=>{
      template += 
      `
      <article class="cardBoisson">
        <div>
          <div>
              <img src="../images/${card.image}" alt="menu">
          </div>
          <p>${card.nom}</p>
        </div>
      </article>
      `;    
  });  
  
  // ajout au html
  zone.innerHTML = template;
}

// ----------- OUVERTURE ET FERMETURE MODALES --------------------

/**
 * role : ajoute la classe pour affichage de la modale ou l'enleve
 * param : string le nom de la class au forma .nomdelaclasse
 * return : no
 */
function togglerModale(classModal) {
  const modale = document.querySelector(classModal);
  modale.classList.toggle("modal-hidden");
}

// ------- FORM CHEVALET ----------------------------------------------

/**
 * role : envoi les données du formulaire pour affichage
 * param no
 */
function formChevalet () {

const form = document.getElementById('formChevalet');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs
    const nombre1 = document.getElementById('nombre1').value;
    const nombre2 = document.getElementById('nombre2').value;
    const nombre3 = document.getElementById('nombre3').value;  

    numeroChevalet = nombre1+nombre2+nombre3;
  
    // Envoyer les données à la nouvelle page
    const params = new URLSearchParams();
    params.append('nombreChevalet', numeroChevalet);
    window.location.href = 'choix.html?' + params.toString();
});
}

/**
 * role : affiche le numero du chevalet si il existe
 * @param {*} urlParams 
 */
function afficherNumeroChevalet(urlParams){
  const nombreChevalet = urlParams.get('nombreChevalet'); // recuperation parametre
  if(nombreChevalet) { 
    let zone = document.querySelector(".surplace")
    let template=
    `
      <p>Numero Chevalet : ${nombreChevalet}</div>
    `
    zone.innerHTML = template;
  }
}



  