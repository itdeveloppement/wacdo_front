// variables globales
let commandeProduit = [];
let commandeMenus=[];
let produit = null;

// -------------- AU CHARGEMENT --------------------
document.addEventListener('DOMContentLoaded', () => {
  const currentUrl = window.location.pathname; // url relative
  const urlParams = new URLSearchParams(window.location.search); // parametre de l'url pour chevalet
  typo()
 
    // page choix
  if (currentUrl === '/assets/pages/choix.html') { 
    afficherNumeroChevalet(urlParams);
    modaleLaterale();
    afficherNumeroCommande();
    afficherMontantCommande(0);
    datasProduits('menus');
    datasCategorie(() => {
        carousselCategorie();
        headerFondTransparent();
    });
  }

  // page chevalet
  if (currentUrl === '/assets/pages/chevalet.html') { 
  let monform = document.getElementById('formChevalet');
  let nombre1 = document.getElementById('nombre1');
  let nombre2 = document.getElementById('nombre2');
  let nombre3 = document.getElementById('nombre3');

  verificationFormChevalet (nombre1, nombre2, nombre3) 
  submitFormChevalet (monform, nombre1, nombre2, nombre3)
  // formChevalet();
  }

});




// ---------------------- FETCHE ------------------------------------

/**
 * role : recuperation de la liste des categorie
 * param : no
 * return :array : liste des produits
 */
function datasCategorie(callback) { 
fetch('../../json/categories.json')
  .then(response => {
    return response.json();
  })
  .then (datas => {
    afficherCardsCategorie(datas)
    callback();
  })
  .catch(error => {
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
    afficherProduitTitre(categorie)
    afficherCardsProduit(datas, categorie)
  })
  .catch(error => {
    console.error('Erreur lors de la recuperation de la liste des produits :', error);
  });
}

/**
 * role : recuperation de la liste des boissons
 * param : no
 * return :array : liste des produits
 */
function datasBoissons(commandeMenu, callback) {
  fetch('../../json/produits.json')
    .then(response => response.json())
    .then(datas => {
    afficherCardsBoissons(datas, commandeMenu)
    callback();
  })
    .catch(error => {
      console.error('Erreur lors de la récupération des boissons :', error);
  });
}

// CHANGEMENT TYPO

function typo(){
  const btnTypo = document.getElementById("btn-typo")
  btnTypo.addEventListener("click", () => {
    changeTypo()

  });

/** change typo du site
 *  @param {*} // pas de parametre
 *  @return ne retourne rien
 */
function changeTypo() {
    // ciblage
    let body = document.querySelector("body");
    let btnTypo = document.getElementById("btn-typo");
    // ajout de classe
    body.classList.toggle("newTypo");
    btnTypo.classList.toggle("newTypo");
}
}
// ----------------- CAROUSSEL -------------------------

// ----------------- carousel categorie ----------------

/**
 * orole : préparation des données du caroussel categorie
 */
function carousselCategorie() {
  
  // selection des elements
  const carousel = document.querySelector('.carousel-categorie');
  const cards = document.querySelectorAll('.cardCategorie');
  let cat = "Categorie";
  caroussel (carousel, cards, cat)
}

// ----------------- caroussel boisson -------------------------

/**
 * orole : préparation des données du caroussel categorie
 */
function carousselBoissons() {
  
  // selection des elements
  const carousel = document.querySelector('.carousel-boisson');
  const cards = document.querySelectorAll('.cardBoisson');
  let cat = "Boisson";
  caroussel (carousel, cards, cat)
}

// ----------------- carousel general ----------------
/**
 * role : organise le defilement du carousel
 * @param {*} carousel eltHtml caroussel
 * @param {*} cards eltHtml cards
 * @param {*} cat : utilisation du carouselle pour (ex categories ou boissons)
 */
function caroussel (carousel, cards, cat) {

  /**
   * Algo : au click fleche de droite
   *  si index different de 0
   *  j'effectue une translation de la largeur d une carde multiplier par la valeur de lindex ()
   *  je d'ecremente l'inde de 1
   *  je desactive la fleche si index = 0
   * Algo : au click fleche de  gauche
   *  si index different du nombre de carte - 1
   *  j'effectue une translation de la largeur d une carde multiplier par la valeur de lindex ()
   *  je d'ecremente l'inde de 1
   *  je desactive la fleche si index = 0
   */

  const selectorPrev = "prev" + cat;
  const selectorNext = "next" + cat;
  const prevBtn = document.querySelector('.' + selectorPrev);
  const nextBtn = document.querySelector('.' + selectorNext); 
  // variables
  let currentIndex = 0;
  let cardWidth = cards[0].offsetWidth; // calcul du deplacement d'une card
  let carouselWidth = carousel.offsetWidth; // Largeur visible du carrousel
  let visibleCards = Math.floor(carouselWidth / cardWidth); // Nombre de cartes visibles
  // bornage du defilement
  const isLastSlide = () => currentIndex === cards.length - visibleCards; // si index card = cards.length - visibleCards; (derniere card) alors true sinon false
  
  /**
   * role : fonction pour defiler les cards/ Translation d'une longueur egale à la positon de la card * la largeur de la card
   * param : no
   * return : no 
   */
  const updateCarousel = () => {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    nextBtn.disabled = isLastSlide(); // Désactiver  le bouton "Suivant" à la fin / desiable desactive l'elementy
    prevBtn.disabled = currentIndex === 0;  // Désactiver le bouton "Précédent" au début (optionnel)
  };

  /**
   * role :  passer a la slide precedente (fleche gauche)
   * return : no
   * algo : au click si defilement possible decrementte l'index et effectue la translation
   */
  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  };

  /**
   * role : passer a la slide psuivante(fleche droite)
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


  // Fonction pour recalculer les dimensions et ajuster le carrousel
  const recalculate = () => {
    cardWidth = cards[0].offsetWidth; // Recalculer la largeur d'une carte
    carouselWidth = carousel.offsetWidth; // Recalculer la largeur visible du carrousel
    visibleCards = Math.floor(carouselWidth / cardWidth); // Recalculer le nombre de cartes visibles

    // S'assurer que l'index actuel n'est pas hors des limites après le redimensionnement
    if (currentIndex > cards.length - visibleCards) {
      currentIndex = cards.length - visibleCards;
    }

    updateCarousel(); // Mettre à jour la position du carrousel
  };

  // Écouteur d'événement pour le redimensionnement de la fenêtre
  window.addEventListener('resize', recalculate);

  // Initialisation
  recalculate();
}



// ---------- AFFICHAGE CARDS CATEGORIE --------------------------

/**
 * role : afficher les cards categorie
 * param : {array} tableau de données
 * return : no
 */
function afficherCardsCategorie(datas){
  let zone = document.querySelector(".carousel-categorie")
  let template = '';
  datas.forEach(card=>{
      template += 
      `
      <article class="cardCategorie">
        <div class="cardCarouselCorps flex">
            <div class="cardImgCarousel flex">
                <img src="../images/${card.image}" alt="menu">
            </div>
            <p>${card.title}</p>
        </div>
      </article>
      `;    
  });  
  zone.innerHTML = template;

// --------- ECOUTEUR EVENEMENT CARD CATEGORIE apres ajout du DOM template------------------

const cardsCategorie = document.querySelectorAll('.cardCategorie');



cardsCategorie.forEach(card => {
  if(card.querySelector('p').textContent == 'menus') {
    activeBordureJaune(card);
  };
  card.addEventListener('click', (event) => {
    desactiveBordureJaune(cardsCategorie);
    const categorie = event.currentTarget.querySelector('p').textContent;
    datasProduits(categorie);
    activeBordureJaune(event.currentTarget);
  });
});
}

// ---------- AFFICHAGE CARDS PRODUITS --------------------------

/**
 * role : afficher le titre des cards produits
 * param : strin : category
 * return : no
 */
function afficherProduitTitre(categorie){
  let zone1 = document.querySelector(".listeProduits")
  let templateTitre=
  `
      <h3>Nos ${categorie}</h3>
      <p>Choississez nos ${categorie}</p>
  `;
zone1.innerHTML = templateTitre; 
}
 
/**
 * role : afficher le titre des cards produits
 * param : string : category
 * param : tableau d'objet : liste des produits
 * return : no
 */
function afficherCardsProduit(datas, categorie){
  let zone2 = document.querySelector(".listeProduitsCards")
  let cardPoduit= ''; 
  datas[categorie].forEach(card=>{
    cardPoduit += 
      `
        <article class="cardProduit" itemscope itemtype="http://schema.org/Product">
          <div class="cardProduitCoprs flex">
            <div class="cardProduitImg flex">
                <img itemprop="image" src="../images/${card.image}" alt="menu ${card.image}">
            </div>
            <p class="nomProduit" itemprop="name">${card.nom}</p>
            <p class="priceMenu" itemprop="price">${card.prix.toFixed(2)} €</p>
          </div>
        </article>
      `;    
  });
zone2.innerHTML = cardPoduit;

// --------- ecouteurs evenements cards produits ------------------

const cardsProduit = document.querySelectorAll('.cardProduit');
cardsProduit.forEach(card => {
  card.addEventListener('click', (event) => {
    desactiveBordureJaune(cardsProduit); 
    activeBordureJaune(event.currentTarget); 
    if (categorie == "menus") {
      afficherModaleTailleMenu(event.currentTarget);
      togglerModale(".modaleTailleMenu");
    } else {
      afficherProduitCommande(event.currentTarget)
    }
      
  });
});

const modal = document.getElementById('modaleTailleMenu');
}

// -------------- MODALES MENU ----------------------------------

/**
 * role : affiche la modale menu
 * param : htmlElement : le produit selectionné
 */
function afficherModaleTailleMenu(produit){
  let commandeMenu = [];
  // traitement des données
  const name = produit.querySelector('p').textContent
  const price = produit.querySelector('.priceMenu').textContent
  const urlImage =  produit.querySelector('img').src

  let zone = document.querySelector(".modaleTailleMenu")
  let template= 
  `
  <div class="overlayFond">
    <!-- nav-->
    <nav class="flex overlayNav">
      <div id="croixImageMenu">
        <img src="../images/images/supprimer.png" alt="croix pour fermer la popup">
      </div>
    </nav>

    <div class="flex overlayCoprs">

        <!-- titre -->
        <div class="flex overlayTitre">
            <h4>Une grosse fin ?</h4>
            <p>Le ${name} comprend un sandwich, une frite et une boisson</p>
        </div>

        <!-- taille produits -->
        <section class="flex overlayCardParent">
            <article class="menuNormal flex cardSegondaireCoprs">
                <div class="cardSegondaireImg">
                    <img src="${urlImage}" alt="menu ${name}">
                </div>
                <p class="cardSegondaireText">${name}</p>
                <span hidden>${price}</span>
            </article>
            <article class="menuMax flex cardSegondaireCoprs">
                <div class="cardSegondaireImg">
                    <img src="${urlImage}" alt="menu ${name}">
                </div>
                <p class="cardSegondaireText">${name} Maxi</p>
                <p>+ 0.50 €</p>
                <span hidden>${price}</span>
            </article>
        </section>

        <!-- message erreur -->
        <div class="erreurtTailleMenu modal-hidden erreurMessage">
            <p class="cardSegondaireText">Selectionner une taille</p>
        </div>

        <!-- button -->
        <div class="btnCorps flex">
            <button id="btnModalTailleMenu" class="btnJaune">Etape suivante</button>
        </div>

    </div>
  </div>
  `
  zone.innerHTML = template;

  // -----  ecouteurs evenement dans la modale taille menu ------

  //ajouter le choix taille normale à la commande
  const menuNormal = document.querySelector(".menuNormal");
  menuNormal.addEventListener("click", (event) => {
    menuMax.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurtTailleMenu")
    let produit = event.currentTarget;
    ajouterMenuNormalCommande(produit, commandeMenu);
  });

  // ajouter le choix taille max à la commande
  const menuMax = document.querySelector(".menuMax");
  menuMax.addEventListener("click", (event) => {
    menuNormal.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurtTailleMenu")
    let produit = event.currentTarget;
    ajouterMenuMaxCommande(produit, commandeMenu);
  });

  // fermeture modale par la croix
  const croixFermeture = document.getElementById("croixImageMenu");
  croixFermeture.addEventListener("click", function(){
    togglerModale(".modaleTailleMenu");
  });

  // boutton etape suivante
  const btnModalTailleMenu = document.getElementById("btnModalTailleMenu");
  btnModalTailleMenu.addEventListener("click", () => {
    if(commandeMenu.menu){
    togglerModale(".modaleFrite")
    togglerModale(".modaleTailleMenu");
    afficherModaleFrite(produit, commandeMenu);
    // Suppression de l'écouteur après le premier clic
    btnModalTailleMenu.removeEventListener('click', arguments.callee);
    } else {
      togglerModale(".erreurtTailleMenu");
    }
  });
}

// ------ fct preparation commande --------------

/**
 * role : ajouter menu normal à la commande
 * param : htmlElement : produit selectionné
 */
function ajouterMenuNormalCommande(produit, commandeMenu) {
  menu = produit.querySelector('p').textContent;
  priceMenu = produit.querySelector('span').textContent;
  priceMenu = parseFloat(priceMenu)
  commandeMenu.menu= menu;
  commandeMenu.priceMenu= priceMenu;
}

/**
 * role : ajouter menu max à la commande
 * param : htmlElement : produit selectionné
 */
function ajouterMenuMaxCommande(produit, commandeMenu) {
  menu = produit.querySelector('p').textContent;
  priceMenu = produit.querySelector('span').textContent;
  priceMenu = parseFloat(priceMenu)+ 0.5;
  commandeMenu.menu= menu;
  commandeMenu.priceMenu= priceMenu;
}

// ----------------- MODAL FRITE -----------------------

/**
 * role : affiche la modale frite
 * param : HTMLelement : le produit menu en cours
 */
function afficherModaleFrite(produit, commandeMenu){
  let zone = document.querySelector(".modaleFrite")
  let template = 
    `
    <div class="overlayFond">
        <nav class="flex">
          <ul class="flex overlayNav">
              <li>
                <button class="btnTransparent" id="btnRetourFrite">Retour</button>
              </li>
              <li> 
                <div id="croixImageFrite">
                  <img src="../images/images/supprimer.png" alt="croix pour fermer la popup">
                </div>
              </li>
          </ul>
        </nav>

      <div class="flex overlayCoprs">

          <!-- titre -->
          <div class="flex overlayTitre">
              <h4>Choisissez votre accompagnement</h4>
              <p>Frites, potatoes, la pomme de terre dans tous ses états</p>
          </div>

          <!-- frite / potatoes -->
          <section class="flex overlayCardParent">
              <article class="friteModal flex cardSegondaireCoprs">
                  <div>
                        <img src="../images/frites/GRANDE_FRITE.png" alt="barquette de grande frite">
                  </div>
                  <p class="cardSegondaireText">Frites</p>
              </article>
              <article class="potatoesModal flex cardSegondaireCoprs">
                  <div>
                        <img src="../images/frites/GRANDE_POTATOES.png" alt="barquette de grande frite potetoes">
                  </div>
                  <p class="cardSegondaireText">Potatoes</p>
              </article>
          </section>

          <!-- message erreur -->
          <div class="erreurtFrite modal-hidden erreurMessage">
            <p class="cardSegondaireText">Selectionner un accompagnement</p>
          </div>

          <!-- button -->
          <div class="btnCorps flex">
              <button id="btnModalFrite" class="btnJaune">Etape suivante</button>
          </div>

      </div>
    </div>
    `
  zone.innerHTML = template;

  // fermeture modale par la croix
  const croix = document.getElementById("croixImageFrite");
  croix.addEventListener("click", function(){
    togglerModale(".modaleFrite")
  });

  // bouton retour
  const btnRetour = document.getElementById("btnRetourFrite");
  btnRetour.addEventListener("click", (event) => {
    togglerModale(".modaleFrite")
    togglerModale(".modaleTailleMenu");
 });

  // boutton etape suivante
  const btnModalFrite = document.getElementById("btnModalFrite");
  btnModalFrite.addEventListener("click", () => {
    if(commandeMenu.frite){
      togglerModale(".modaleBoissons");
      afficherModaleBoisson(produit, commandeMenu);
      togglerModale(".modaleFrite")
    
    // Suppression de l'écouteur après le premier clic
    btnModalFrite.removeEventListener('click', arguments.callee);
    } else {
      togglerModale(".erreurtFrite");
    }
  });
  
  //ajouter frite à la commande
  const friteModal = document.querySelector(".friteModal");
  friteModal.addEventListener("click", (event) => {
    messageErreur (".erreurtFrite")
    potatoesModal.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    let produit = event.currentTarget;
    let frite = produit.querySelector('p').textContent;
    commandeMenu.frite = frite; 
  });

  // ajouter potetose à la commande
  const potatoesModal = document.querySelector(".potatoesModal");
  potatoesModal.addEventListener("click", (event) => {
    friteModal.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurtFrite")
    let produit = event.currentTarget;
    let frite = produit.querySelector('p').textContent;
    commandeMenu.frite = frite; 
  });
}

// --------------- MODAL BOISSONS ---------------------------------

function afficherModaleBoisson(produit, commandeMenu) {
  let zone = document.querySelector(".modaleBoissons")
  let template = 
    `
    <div class="overlayFond">
       <nav class="flex">
        <ul class="flex overlayNav">
            <li>
              <button class="btnTransparent" id="btnRetourBoisson">Retour</button>
            </li>
            <li> 
              <div id="croixImageBoisson">
                <img src="../images/images/supprimer.png" alt="croix pour fermer la popup">
              </div>
            </li>
        </ul>
      </nav>

      <div class="flex overlayCoprs">

          <!-- titre -->
          <div class="flex overlayTitre">
              <h4>Choisissez votre accompagnement</h4>
              <p>Frites, potatoes, la pomme de terre dans tous ses états</p>
          </div>

          <!-- caroussel boissons -->
          <div class="carouselBoisson">
              <div>
                  <img class="prevBoisson" src="../images/images/fleche-slider.png" alt="Fleche precedent">
              </div>
              <div class="carousel-boisson">
                  <!-- fct js afficherCardBoissons -->
              </div>
              <div>
                  <img class="nextBoisson" src="../images/images/fleche-slider-next.png"  alt="Fleche suivant">
              </div>
          </div>

          <!-- message erreur -->
          <div class="erreurBoisson modal-hidden erreurMessage">
            <p class="cardSegondaireText">Selectionner une boisson</p>
          </div>

          <!-- boutons -->
          <div class="btnCorps flex">
              <button id="btnModalAjouter" class="btnJaune">Ajouter le menu à ma commande</button>
          </div>

      </div>
    </div>
    `
  zone.innerHTML = template;

// carouselBoissons en caalback pour timing dom
datasBoissons(commandeMenu, carousselBoissons);
  
  // -----  ecouteurs evenement dans la modale boisson ------

  // fermeture modale par la croix
  const croixBoisson = document.getElementById("croixImageBoisson");
  croixBoisson.addEventListener("click", function(){
    togglerModale(".modaleBoissons");
  });

  // retour vers modale frite
  const btnRetourBoisson = document.getElementById("btnRetourBoisson");
  btnRetourBoisson.addEventListener("click", function(){
    togglerModale(".modaleBoissons");
    togglerModale(".modaleFrite")
  });

  // ajouter menu à la commande
  const btnAjouter = document.getElementById("btnModalAjouter");
  btnAjouter.addEventListener("click", function(){
    if(commandeMenu.boisson){
      togglerModale(".modaleBoissons");
      afficherMenuCommande (commandeMenu) 

    // Suppression de l'écouteur après le premier clic
    btnAjouter.removeEventListener('click', arguments.callee);
  } else {
      togglerModale(".erreurBoisson");
  }
  });
}

/**
 * role : afficher les cards boisson
 * param : {array} tableau de données
 * return : no
 */
function afficherCardsBoissons(datas, commandeMenu){
  let zone = document.querySelector(".carousel-boisson") // ciblage
  let template = ''; // declaration
  datas.boissons.forEach(card=>{
      template += 
      `
      <article class="cardBoisson">
        <div class="cardCarouselCorps flex">
            <div class="cardImgCarousel flex">
                <img src="../images/${card.image}" alt="menu">
            </div>
            <p>${card.nom}</p>
        </div>
      </article>
      `;    
  });  
  
  zone.innerHTML = template;

//  ecoiteur sur card boissons
const cardsBoisson = document.querySelectorAll('.cardBoisson');
cardsBoisson.forEach(card => {
  card.addEventListener('click', (event) => {
    desactiveBordureJaune(cardsBoisson); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurBoisson")
    const boisson = event.currentTarget.querySelector('p').textContent;
    commandeMenu.boisson = boisson; 
  });
});

}

// ---------------- COMMANDE -----------------------

// -------- affichage commande --------------------

/**
 * role : affiche la commande pour les menus
 * @param {*} commandeMenu 
 * @returns 
 */
function afficherMenuCommande (commandeMenu) {
  // preparation des données
  commandeMenus.push(commandeMenu);

  let zone = document.getElementById("commandeMenu")
  let template = ''; 
  commandeMenus.forEach(menu=>{
      template += 
      `
        <div class="menuCmdDetail flex">
            <div class="menuCmd">
                <p class="cmd-nomProduitM titleCmd">${menu.menu ? menu.menu : ''}</p>
                <ul>
                    <li>${menu.frite ? menu.frite : ''}</li>
                    <li>${menu.boisson ? menu.boisson : ''}</li>
                    <li>${menu.priceMenu ? menu.priceMenu : ''} €</li>
                </ul>
            </div>
            <div class="poubelleImageM pblCmd">
                <img src="../images/images/trash.png" alt="poubelle">
            </div>
        </div>
      `;    
  });  
  
  zone.innerHTML = template;
 
  let siItemsSupprime = false; 
  // ecouteur sur suppression (image poubelle)
  let poubelleImg = document.querySelectorAll(".poubelleImageM")
  poubelleImg.forEach(img => {
    img.addEventListener('click', (event) => {
      supprimerMenu(event);
      siItemsSupprime = true;
      // Supprimer l'écouteur sur cet élément spécifique
      img.removeEventListener('click', arguments.callee);
    });
  });
  if (!siItemsSupprime) {
    calculerMontantCommandeMenus(commandeMenus);
  }
}

/**
 * role : afficher la commande d'un produit individuel
 * @param {*} produit produit selectionnée
 */
function afficherProduitCommande(produit) {
  // recuperation des données
  let nom = produit.querySelector('.nomProduit').textContent
  let price = produit.querySelector('.priceMenu').textContent
  let produitTemp = [];
  produitTemp.nom = nom;
  produitTemp.price = price;
  commandeProduit.push(produitTemp)
  // affichage
  let zone = document.getElementById("commandeProduit")
    let template = ''; // declaration
    commandeProduit.forEach(produit=>{
        template += 
        `
          <div class="menuCmdDetail flex">
            <div class="menuCmd">
              <p class="cmd-nomProduit titleCmd">${produit.nom}</p>
              <ul>
                <li>${produit.price}</li>
              </ul>
            </div>
            <div class="poubelleImage  pblCmd">
              <img src="../images/images/trash.png" alt="poubelle">
            </div>
          </div>
        `;    
    });
 zone.innerHTML = template;

// Ecouteur d'événement à la zone (element) pour suppression produit
zone.addEventListener('click', supprimerProduit);

calculerMontantCommandeProduit (commandeProduit)
};

// -------- supression produit ou menus commande --------------------

/**
 * role :suprrimer un produit de la commande
 * @param {role } event (element selectionné)
 */
function supprimerProduit(event) {
  const parentDiv = event.target.closest('.poubelleImage').parentNode; // Trouver la div parente
  const nomProduit = parentDiv.querySelector('.cmd-nomProduit').textContent; // Récupérer l'id du produit
  const index = commandeProduit.findIndex(produit => produit.nom === nomProduit); // Trouver l'index du produit dans le tableau
  parentDiv.remove(); // Supprimer l'élément du DOM
  commandeProduit.splice(index, 1); // Supprimer l'élément du tableau // (1 = nb element à suprimer)
  calculerMontantCommandeProduit (commandeProduit);
}

/**
 * role :suprrimer un menu de la commande
 * @param {role } event (element selectionné)
 */
function supprimerMenu(event) {
  const parentDiv = event.target.closest('.poubelleImageM').parentNode;
  const nomProduit = parentDiv.querySelector('.cmd-nomProduitM').textContent; 
  const index = commandeMenus.findIndex(menu => menu.menu === nomProduit); 
  parentDiv.remove();
  commandeMenus.splice(index, 1); // (1 = nb element à suprimer)
  calculerMontantCommandeMenus(commandeMenus);
}

// ------------ calculer et afficher montant commande -----------------

/**
 * role : calaculer le montant de la commande produits individuel
 * param : array : liste des produits individuels de la commande
 */
function calculerMontantCommandeProduit (commandeProduit) {
  let montanProduit = 0;
  commandeProduit.forEach(produit => {
    montanProduit +=  parseFloat(produit.price);
  })
  param = "produits";
  sommeCommande(montanProduit, param)
}

/**
 * role : calaculer le montant de la commande menus
 * param : array : liste menus selectionnés
 */
function calculerMontantCommandeMenus (commandeMenus) {
  let montantMenus = 0;
  commandeMenus.forEach(menu => {
    montantMenus +=  parseFloat(menu.priceMenu);
  })
  param = "menus";
  sommeCommande(montantMenus, param)
}

/**
 * role : faire la somme du montant commande menu et montant commande produits
 * @param {*} montant 
 * @param {*} param soit "menus" soit "produits"
 */
let tabMontant = {
  "menus": 0,
  "produits": 0,
};
function sommeCommande(montant, param) {
  if (param == "menus") {
    tabMontant[param] = montant
  } else if (param == "produits"){
    tabMontant[param] = montant
  }
  let somme = tabMontant.menus + tabMontant.produits
  let montantCommande = Math.round(somme * 100) / 100;   // limiter a deux decimale
  afficherMontantCommande (montantCommande)
}

/**
 * role : afficher le prix de la commande
 */
function afficherMontantCommande (montant) {
  let zone = document.getElementById("commandeMontant")
  let template= 
    `
    <div class="montantTotalText flex">
      <div>           
          <p>TOTAL</p>
          <p>(ttc)</p>
      </div>
      <p class="montantTotal">${montant.toFixed(2)} €</p>
    </div>
    <div class="btnCommande flex">
        <a class="btnTransparent" href="../../index.html">Abandon</a>
        <button class="btnJaune" id="btnPayerCommande">Payer</button>
    </div>
    `
  zone.innerHTML = template

  let btnPayerCommande = document.getElementById("btnPayerCommande");
  btnPayerCommande.addEventListener("click", function() {
    enregistrerPayment()
    window.location.href = "./abientot.html";   // Redirection
});

}
/**
 * role : enregistrer le paiement
 */
function enregistrerPayment() {
  const urlParams = new URLSearchParams(window.location.search); // parametre de l'url pour chevalet
  const nombreChevalet = urlParams.get('nombreChevalet');
  // Données à envoyées en AJAX vers serveur
  if(nombreChevalet) {
    console.log(nombreChevalet)
  }
  console.log(numeroCommande);
  console.log(commandeMenus)
  console.log(commandeProduit)
}

// ----------- OUVERTURE ET FERMETURE MODALES --------------------

let modalOuverte = null;
/**
 * role : ajoute la classe pour affichage de la modale ou l'enleve
 * param : string le nom de la class au forma .nomdelaclasse
 * return : no
 */
function togglerModale(classModal) {
    const modale = document.querySelector(classModal);
    modalOuverte = modalOuverte === classModal ? null : classModal;
    modale.classList.toggle('modal-hidden');
}

/**
 * role : ferme le message d'erreur si il est ouvert
 * param : string le nom de la class au forma .nomdelaclasse
 * return : no
 * @param {*} classModal 
 */
function messageErreur (classModal) { 
    const modale = document.querySelector(classModal);
    const estFermee = modale.classList.contains("modal-hidden");
    if(!estFermee) { 
      togglerModale(classModal);
    }
  }

/**
 * role : active ou desactive la bordure jaune si element est selectionné
 * param : htmlElement : element selectionné
 */
function activeBordureJaune(element) {
  element.classList.toggle("activeBordureJaune");
}
/**
 * role : desactive la bordure jaune
 * param : htmlElement : les elements concernés
 */
function desactiveBordureJaune(elements){ 
  elements.forEach(autresElements=> {
  autresElements.classList.remove('activeBordureJaune');
  });
};

/**
 * trole : ouverture et fermeture modale laterale
 * param : no
 */
function modaleLaterale() { 
  const openBtn = document.querySelector('.open-btn');
  const closeBtn = document.querySelector('.close-btn');
  const modal = document.querySelector('.modal');

  const modalContainer = document.querySelector('.modal-container');
  const sectionPrincipale = document.querySelector('.sectionPrincipale');

  // modale ouverte au chargement
  /*
  modal.classList.add('active');
  modalContainer.classList.add('active');
  sectionPrincipale.classList.add('active');
*/
  openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      modalContainer.classList.add('active');
      sectionPrincipale.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modalContainer.classList.remove('active');
      sectionPrincipale.classList.remove('active');
  });

}
// ------- FORM CHEVALET ----------------------------------------------

const maxLengthNombre = 2;


// SOUMISSION DU FORMULAIRE
// A la soumission du formulaire 
// si toutes les fonctions retournent true
// j'envoie le formulaire
function submitFormChevalet (monform, nombre1, nombre2, nombre3) { 
  monform.addEventListener("submit",(event)=>{
      event.preventDefault();
      let test1 = testNombre1();
      let test2 = testNombre2();
      let test3 = testNombre3();
    
      if(test1===true && 
        test2===true &&
        test3===true
      ) {
       // Envoyer les données à la nouvelle page 
      numeroChevalet = nombre1.value + nombre2.value + nombre3.value
      const params = new URLSearchParams();
      params.append('nombreChevalet', numeroChevalet);
      window.location.href = 'choix.html?' + params.toString();
    }
})
}

/**
 * role : verification des données du formulaire
 */
function verificationFormChevalet (nombre1, nombre2, nombre3) {
  

  nombre1.addEventListener("change",testNombre1);
  nombre2.addEventListener("change",testNombre2);
  nombre3.addEventListener("change",testNombre3);

}
/** CHAMPS NOMBRE : verifie si les donnéeS sont valide
*       si la valeur du champs est vide
*       si la valeur du champs n'est pas plus long que X caractères
*       si la valeur du champ ne comporte pas de code
*       si la valeur du champ n'est pas un nombre
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testNombre1(){
  // si le champs est vide
  if(beEmpty (nombre1.value)){
      // affiche le message d'erreur et bordure
      afficheErreur("nombre1", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
   // si le texte dépasse x caracteres // 
  }else if(maxLength(nombre1.value, maxLengthNombre)){
      afficheErreur("nombre1", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  // si injection de code
  }else if(hasCode(nombre1.value)){ 
      afficheErreur("nombre1", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  // si la valeur du champ n'est pas un nombre
  } else if (onlyNumber (nombre1.value)=== false) {
      afficheErreur("nombre1", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  }
  
  enleveErreur("nombre1")
  return true
};

/** CHAMPS NOMBRE : verifie si les donnéeS sont valide
*       si la valeur du champs est vide
*       si la valeur du champs n'est pas plus long que X caractères
*       si la valeur du champ ne comporte pas de code
*       si la valeur du champ n'est pas un nombre
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testNombre2(){
  // si le champs est vide
  if(beEmpty (nombre2.value)){
      // affiche le message d'erreur et bordure
      afficheErreur("nombre2", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
   // si le texte dépasse x caracteres // 
  }else if(maxLength(nombre2.value, maxLengthNombre)){
      afficheErreur("nombre2", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  // si injection de code
  }else if(hasCode(nombre2.value)){ 
      afficheErreur("nombre2", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  // si la valeur du champ n'est pas un nombre
  } else if (onlyNumber (nombre2.value)=== false) {
      afficheErreur("nombre2", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  }
  
  enleveErreur("nombre2")
  return true
};

/** CHAMPS NOMBRE : verifie si les donnéeS sont valide
*       si la valeur du champs est vide
*       si la valeur du champs n'est pas plus long que X caractères
*       si la valeur du champ ne comporte pas de code
*       si la valeur du champ n'est pas un nombre
* @returns {boolean} false si une erreur de validation
* @returns {boolean} true si aucune erreur
*/
function testNombre3(){
  // si le champs est vide
  if(beEmpty (nombre3.value)){
      // affiche le message d'erreur et bordure
      afficheErreur("nombre3", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
   // si le texte dépasse x caracteres // 
  }else if(maxLength(nombre3.value, maxLengthNombre)){
      afficheErreur("nombre3", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  // si injection de code
  }else if(hasCode(nombre3.value)){ 
      afficheErreur("nombre3", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  // si la valeur du champ n'est pas un nombre
  } else if (onlyNumber (nombre3.value)=== false) {
      afficheErreur("nombre3", "Votre numero de chevalet doit etre composé de chiffres de 0 à 9");
      return false
  }
  
  enleveErreur("nombre3")
  return true
};

// AFFICHAGE DU MESSAGE ERREUR

/** affiche un message d'erreur
 * @param {string} id 
 * @param {string} messageErreur 
 */
function afficheErreur(id,messageErreur){
  enleveErreurs()
  // Role : Afficher une erreur 
  // Parametres : id l'id de l'input dans le quel il y a une erreur
  // messageErreur : le message a afficher
  // retour: rien !
  let input = document.getElementById(id);
  input.classList.add("input-error");
  let p = document.getElementById("error-"+id);
  p.innerText = messageErreur;
  p.classList.remove("d-none");
}
/** efface le message d'erreur
* @param {string} id 
* 
*/
function enleveErreur(id){

  // Role: enlever l'erreur sur l'input et cache le paragraphe associé
  let input = document.getElementById(id);
  input.classList.remove("input-error");
  let p = document.getElementById("error-"+id);
  p.innerText ="";
  p.classList.add("d-none");
}

/** efface tous les messages d'erreur
* @param {string} id 
* 
*/
function enleveErreurs(){
  // Role: enlever l'erreur sur l'input et cache le paragraphe associé
  let ids = ["nombre1", "nombre2", "nombre3"]
  ids.forEach(id => {
    console.log(id)
    // si input nombre1 contien inputerro tu enleve
    let input = document.getElementById(id);
    console.log(input)
    if (input.classList.contains('input-error')){
    input.classList.remove("input-error");
    let p = document.getElementById("error-"+id);
    p.innerText ="";
    p.classList.add("d-none");
  }
  });
  
}

/* FONCTIONS TESTE */

/**CHAMPS VIDE : verifie si la valeur du champ est vide
 * @param {string} valueField la chaine de caractere du champ
 * @returns true si la chaine est vide sinon retourne false
 */
function beEmpty (valueField, texteDescription){
  if ((valueField === "") ||(valueField === texteDescription)) { 
  return true; 
} return false
}
/** TEXTE CODE : verifie si la valeur du champ contient du code
* @param {string} valueField la chaine de caractere du champ
* @returns  true si il y a du code 
* @returns false si il n'y a pas de code
*/
function hasCode(valueField){
  // cette fonction cherche dans une chaine s'il y a une balise script
  // retour true : y'a du code
  // false :y'a pas de code
  let reg = /<script/;
  if (reg.test(valueField)) {
  return true;
  } return false;
}
/** NOMBRE COMPARAISON : compare si la valeur du champ est superieure à une valeur (logueur voulue) passée en parametre
 * @param {number} string la chaine de caractere du champ
 * @param {number} longueurMax la longueur max que peut prendre la chaine
 * @returns true si la chaine de caractere du camps est plus longue que le parametre sinon retourne false
 */
function maxLength (valueField, longueurMax){
  if(valueField.length >= longueurMax) {
  return true;
  } return false
}
/** NOMBRE : verifie si la valeur du champ contient des chiffres
* @param {number} valueField valeur du champs
* @returns true si la valeur du champs contien des chiffre
* @returns false sinon
*/
function onlyNumber (valueField) {
  let reg=/^\d+$/;
  if (reg.test(valueField)) {
      return true;
  } return false

}

/** NOMBRE : verifie si la valeur du champ contient des chiffres
* @param {number} valueField valeur du champs
* @returns true si la valeur du champs contien des chiffre
* @returns false sinon
*/
function onlyThreeNumber (valueField) {
  let reg=/^\d{3}$/;
  if (reg.test(valueField)) {
      return true;
  } return false

}
/**
 * role : affiche le numero du chevalet si il existe
 * @param {*} urlParams 
 */
function afficherNumeroChevalet(urlParams){
  const nombreChevalet = urlParams.get('nombreChevalet'); // recuperation parametre
  if (!(nombreChevalet == null) && !onlyThreeNumber(nombreChevalet)){
    console.log(onlyThreeNumber)
    window.location.href = 'chevalet.html?';
  }

  let zone = document.querySelector(".surplace")
  if(nombreChevalet) { 
    let template=
    `
    <div>
      <p>Surplace</p>
      <p>Chevalet : ${nombreChevalet}</p>
    </div>
    `
    zone.innerHTML = template;
  } else {
    let template=
    `
    <div>
      <p>A emporter</p>
    </div>
    `
    zone.innerHTML = template;
  }
}

let numeroCommande = null;
/**
 * role : affiche le numero de la commande
 * @param {*} 
 */
function afficherNumeroCommande(){
  min = 1;
  max = 100;
  let zone = document.querySelector(".numeroCommande")
  numeroCommande = Math.floor(Math.random() * (max - min + 1)) + min;
  if(numeroCommande) { 
    let template=
    `
      <p>Commande : ${numeroCommande}</div>
    `
    zone.innerHTML = template;
  } 
}

// --------------------- AUTRE ---------------

/**
 * 
 */
 function headerFondTransparent (){
  let header = document.querySelector('.choix header');
  header.classList.add('headerChoix');
 
}


  