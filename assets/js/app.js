// variables globales
let commandeProduit = [];
let commandeProduitTemp = [];
let commandeMenus=[];
// let produit = null;
const maxLengthNombre = 1;

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
  }

});

// ---------------------- FETCHE ------------------------------------

/**
 * role : recuperation de la liste des categories
 * param : no
 * return :array : liste des produits
 */
function datasCategorie(callback) { 
fetch('../../json/categories.json')
// fetch('http://exam-back.mcastellano.mywebecom.ovh/public/selectcategorieAPI')

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
function datasProduits(categorie, categorieId) { 
  // fetch('../../json/produits.json')
 fetch('http://exam-back.mcastellano.mywebecom.ovh/public/selectproduitAPI')

  .then(response => {
    return response.json();
  })
  .then (datas => {
    afficherProduitTitre(categorie)
    afficherCardsProduit(datas, categorie, categorieId)
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

/**
 * role : envoyer le contenu de la commande 
 * param : array : contenu de la commande
 * return :
 */
function envoyercommande(datas) {
  fetch('/mon-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datas)
  })
  .catch(error => {
    console.error('Erreur lors de l\'envoi de la commande :', error);
  });
  
}
// ---------------- CHANGEMENT TYPO ------------------------

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
      <article data-idCategorie=${card.id} class="cardCategorie">
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
    // recuperation id categorie
    let article = event.currentTarget;
    let categorieId = article.dataset.idcategorie;
    datasProduits(categorie, categorieId);
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
 * role : afficher cards produits
 * param : string : category
 * param : tableau d'objet : liste des produits
 * return : no
 */
function afficherCardsProduit(datas, categorie, categorieId){

  let zone2 = document.querySelector(".listeProduitsCards")
  let cardPoduit= ''; 
  datas[categorie].forEach(card =>{
    cardPoduit += 
      `
        <article class="cardProduit articleProduit" itemscope itemtype="http://schema.org/Product">
          <div data-id=${card.id} data-categorie=${categorieId} class="articleProduit" ></div>
          <div class="cardProduitCoprs flex">
            <div class="cardProduitImg flex">
                <img itemprop="image" src="../images/${card.image}" alt="menu ${card.image}">
            </div>
            <p class="nomProduit" itemprop="name">${card.nom}</p>
            <div class="flex price">
              <p class="priceMenu" itemprop="price">${parseFloat(card.prix).toFixed(2)}</p>
              <p class="euro"> €</p>
            </div>
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
     // GESTION DES MENUS
    if (categorie == "menus") {
      afficherModaleTailleMenu(event.currentTarget);
      togglerModale(".modaleTailleMenu");
      // GESTION DES PRODUITS BOISSON QUANTITE TAILLE
    } else if (categorie == "boissons"){
      togglerModale(".modaleQuantiteTaille");
      afficherModaleQuantiteTaille(event.currentTarget)
       // GESTION DES PRODUITS AUTRES PRODUIT QUANTITE
    } else {
      togglerModale(".modaleQuantite");
      afficherModaleQuantite(event.currentTarget)
    }
  });
});

const modal = document.getElementById('modaleTailleMenu');
}

// -------------- MODALES QUANTITE ----------------------------------

/**
 * role : affiche la modale quantite
 * param : htmlElement : le produit selectionné
 */
function afficherModaleQuantite (produit){
 
  // traitement des données
  const nom = produit.querySelector('p').textContent;
  const price = produit.querySelector('.priceMenu').textContent;
  const urlImage =  produit.querySelector('img').src;
  // recuperation id categorie et produit
  const article = produit.querySelector('.articleProduit')
  const idProduit = article.dataset.id;
  const idCategorie = article.dataset.categorie;
  
  const quantite = 1;

  let produitQuantite = {
    "idProduit": idProduit,
    "idCategorie": idCategorie,
    "nom": nom,
    "price": price,
    "quantite": quantite,
  };
  commandeProduitTemp = produitQuantite;

  let zone = document.querySelector(".modaleQuantite")
  let template= 
  `
  <div class="overlayFond">
        <nav class="flex">
          <ul class="flex overlayNav">
              <li>
                <button class="btnTransparent btnRetourQu" id="btnRetourFrite">Annuler</button>
              </li>
              <li> 
                <div id="croixImageFrite" class="croixImg">
                  <img src="../images/images/supprimer.png" alt="croix pour fermer la popup">
                </div>
              </li>
          </ul>
        </nav>

    <div class="flex overlayCoprs">

        <!-- titre -->
        <div class="flex overlayTitre">
            <h4>Choississer la quantité</h4>
            <p>${nom}, choisisser la quantite </p>
        </div>

        <!-- taille produits -->
        <section class="flex overlayCardParent">
            <article class="produitNormal flex cardSegondaireCoprs">
                <div class="cardSegondaireImg flex">
                    <img src="${urlImage}" alt="menu ${nom}">
                </div>
                <p class="cardSegondaireText">${nom}</p>
                <span hidden>${price}</span>
            </article>
        </section>
        <!-- btn quantite -->
            <div class="quantite flex">
              <button id="btnQuantiteMoins" class="btnJaune btnMoins">-</button>
              <div id="quantiteProduit" class="quantiteProduitQ">${quantite}</div>
              <button id="btnQuantitePlus" class="btnJaune btnPlus">+</button>
            </div>
        <!-- message erreur -->
            <div class="erreurtTailleMenu modal-hidden erreurMessage">
                <p class="cardSegondaireText">Selectionner une taille</p>
            </div>
        <!-- button -->
        <div class="btnCorps flex">
            <button id="btnmodaleQuantiteTaille" class="btnJaune btnmodQuantite">Ajouter à la commande</button>
        </div>
    </div>
  </div>
  `
  zone.innerHTML = template;

  // ajouter une quantité
  const quantitePlusQ = document.querySelector(".btnPlus");
  quantitePlusQ.addEventListener("click", () => {
      let quantite = 1;
      let param = null;
      preparartionCommandeProduit(param, produitQuantite, quantite)
  // Suppression de l'écouteur après le premier clic
  quantitePlusQ.removeEventListener('click', arguments.callee);
  });

  // supprime une quantité
  const quantiteMoinsQ = document.querySelector(".btnMoins");
  quantiteMoinsQ.addEventListener("click", () => {
      let quantite = -1;
      let param = null;
      preparartionCommandeProduit(param, produitQuantite, quantite)
  // Suppression de l'écouteur après le premier clic
  quantiteMoinsQ.removeEventListener('click', arguments.callee);
  });

  // bouton annuler
    const btnRetourQ = document.querySelector(".btnRetourQu");
    btnRetourQ.addEventListener("click", (event) => {
      togglerModale(".modaleQuantite")
    // Suppression de l'écouteur après le premier clic
    btnRetourQ.removeEventListener('click', arguments.callee);
  });

  // fermeture modale par la croix
  const croixFermetureQ = document.querySelector(".croixImg");
  croixFermetureQ.addEventListener("click", function(){
    togglerModale(".modaleQuantite");
    // Suppression de l'écouteur après le premier clic
    croixFermetureQ.removeEventListener('click', arguments.callee);
  });

  // boutton etape suivante
  const btnModalTailleMenuQ = document.querySelector(".btnmodQuantite");
  btnModalTailleMenuQ.addEventListener("click", () => {
    togglerModale(".modaleQuantite");
    afficherProduitsCommande(commandeProduitTemp);
    //Suppression de l'écouteur après le premier clic
    btnModalTailleMenuQ.removeEventListener('click', arguments.callee);
  });
  
}

// -------------- MODALES QUANTITE TAILLE----------------------------------

/**
 * role : affiche la modale quantite taille
 * param : htmlElement : le produit selectionné
 */
function afficherModaleQuantiteTaille(produit){
  let selectionTaille = false; // etat si card taille selectionnée = true sinon false
  let messageErreurEtat = false; // etat si message est affiché = true sinon false (class = modal-hidden)
  // traitement des données
  const nom = produit.querySelector('p').textContent
  const price = produit.querySelector('.priceMenu').textContent
  const urlImage =  produit.querySelector('img').src
  const quantite = 1;

  // recuperation id categorie et produit
  const article = produit.querySelector('.articleProduit')
  const idProduit = article.dataset.id;
  const idCategorie = article.dataset.categorie;
 
  let produitQuantite = {
    "idProduit": idProduit,
    "idCategorie": idCategorie,
    "nom": nom,
    "price": price,
    "quantite": quantite,
  };

  commandeProduitTemp = produitQuantite;

  let zone = document.querySelector(".modaleQuantiteTaille");
  let template= 
  `
  <div class="overlayFond">
        <nav class="flex">
          <ul class="flex overlayNav">
              <li>
                <button class="btnTransparent" id="btnRetourFrite">Annuler</button>
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
            <h4>Choississer la taille et la quantité</h4>
            <p>${nom}, choisisser la taille et la quantité </p>
        </div>

        <!-- taille produits -->
        <section class="flex overlayCardParent">
            <article class="produitNormal flex cardSegondaireCoprs">
                <div class="cardSegondaireImg">
                    <img src="${urlImage}" alt="menu ${nom}">
                </div>
                <p class="cardSegondaireText">${nom}</p>
                <p class="cardSegondaireText">30Cl</p>
                <span hidden>${price}</span>
            </article>
            <article class="produitMax flex cardSegondaireCoprs">
                <div class="cardSegondaireImg">
                    <img src="${urlImage}" alt="menu ${nom}">
                </div>
                <p class="cardSegondaireText">${nom} Maxi</p>
                <p class="cardSegondaireText">50Cl</p>
                <p>+</p><p id="supplement">0.50</p><p> €</p>
                <span hidden>${price}</span>
            </article>
        </section>
        <!-- btn quantite -->
            <div class="quantite flex">
              <button id="btnQuantiteMoins" class="btnJaune">-</button>
              <div id="quantiteProduit">${quantite}</div>
              <button id="btnQuantitePlus" class="btnJaune">+</button>
            </div>
        <!-- message erreur -->
            <div class="erreurtTailleMenu modal-hidden erreurMessage">
                <p class="cardSegondaireText">Selectionner une taille</p>
            </div>
        <!-- button -->
        <div class="btnCorps flex">
            <button id="btnmodaleQuantiteTaille" class="btnJaune">Ajouter à la commande</button>
        </div>
    </div>
  </div>
  `
  zone.innerHTML = template;

  // -----  ecouteurs evenement dans la modale quantite taille------

  //ajouter le choix taille normale à la commande
  const produitNormal = document.querySelector(".produitNormal");
  produitNormal.addEventListener("click", (event) => {
    produitMax.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurtTailleMenu")
    let quantite = 0;
    produitQuantite.taille = "normale";
    preparartionCommande(event.currentTarget, produitQuantite, quantite)
    selectionTaille = true;
    // Suppression de l'écouteur après le premier clic
    produitNormal.removeEventListener('click', arguments.callee);
  });

  // ajouter le choix taille max à la commande
  const produitMax = document.querySelector(".produitMax");
  produitMax.addEventListener("click", (event) => {
    produitNormal.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurtTailleMenu")
    let quantite = 0;
    produitQuantite.taille = "maxi";
    preparartionCommande(event.currentTarget, produitQuantite, quantite)
    selectionTaille = true;
    // Suppression de l'écouteur après le premier clic
    produitMax.removeEventListener('click', arguments.callee);
  });

  // ajouter une quantité
  const quantitePlus = document.getElementById("btnQuantitePlus");
  quantitePlus.addEventListener("click", () => {
    let messageErreur = document.querySelector('.erreurtTailleMenu');
    messageErreur.classList.contains('.modal-hidden')
    if(selectionTaille) {
      
      let quantite = 1;
      let param = null;
      messageErreurEtat = false;
      preparartionCommande(param, produitQuantite, quantite)
    // Suppression de l'écouteur après le premier clic
    quantitePlus.removeEventListener('click', arguments.callee);
    } else if (!selectionTaille && !messageErreurEtat) {
      messageErreurEtat = true;
      togglerModale(".erreurtTailleMenu");
    // Suppression de l'écouteur après le premier clic
    quantitePlus.removeEventListener('click', arguments.callee);
    }
  });

  // supprime une quantité
  const quantiteMoins = document.getElementById("btnQuantiteMoins");
  quantiteMoins.addEventListener("click", () => {
    let messageErreur = document.querySelector('.erreurtTailleMenu');
    messageErreur.classList.contains('.modal-hidden')
    if(selectionTaille) {
      let quantite = -1;
      let param = null;
      messageErreurEtat = false;
      preparartionCommande(param, produitQuantite, quantite)
          // Suppression de l'écouteur après le premier clic
          quantiteMoins.removeEventListener('click', arguments.callee);
    } else if (!selectionTaille && !messageErreurEtat) {
      messageErreurEtat = true;
      togglerModale(".erreurtTailleMenu");
  // Suppression de l'écouteur après le premier clic
  quantiteMoins.removeEventListener('click', arguments.callee);
    }
  });

  // bouton annuler
    const btnRetour = document.getElementById("btnRetourFrite");
    btnRetour.addEventListener("click", (event) => {
      togglerModale(".modaleQuantiteTaille")
  });

  // fermeture modale par la croix (a faire)
  const croixFermeture = document.getElementById("croixImageFrite");
  croixFermeture.addEventListener("click", function(){
    togglerModale(".modaleQuantiteTaille");
  // Suppression de l'écouteur après le premier clic
  croixFermeture.removeEventListener('click', arguments.callee);
  });

  // boutton etape suivante
  const btnModalTailleMenu = document.getElementById("btnmodaleQuantiteTaille");
  btnModalTailleMenu.addEventListener("click", () => {
    if(selectionTaille){
    togglerModale(".modaleQuantiteTaille");
    afficherProduitsCommande(commandeProduitTemp);
    messageErreurEtat = false;
    // Suppression de l'écouteur après le premier clic
    btnModalTailleMenu.removeEventListener('click', arguments.callee);
  } else if (!selectionTaille && !messageErreurEtat) {
    messageErreurEtat = true;
    togglerModale(".erreurtTailleMenu");
    // Suppression de l'écouteur après le premier clic
    btnModalTailleMenu.removeEventListener('click', arguments.callee);
    afficherProduitsCommande(commandeProduitTemp);
  }
  });
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

  // recuperation id categorie et produit menu
  const article = produit.querySelector('.articleProduit')
  const idProduit = article.dataset.id;
  const idCategorie = article.dataset.categorie;
  const quantite = 1;

   let produitMenu = {
    "idProduit": idProduit,
    "idCategorie": idCategorie,
    "nom": name,
    "price": price,
    "quantite": quantite,
  };

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

  //ajouter taille normale à la commande
  const menuNormal = document.querySelector(".menuNormal");
  menuNormal.addEventListener("click", (event) => {
    menuMax.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurtTailleMenu")
    // let produit = event.currentTarget;
    produitMenu.taille = "normale";
  
    ajouterMenuNormalCommande(produitMenu, commandeMenu);
  });

  // ajouter taille max à la commande
  const menuMax = document.querySelector(".menuMax");
  menuMax.addEventListener("click", (event) => {
    menuNormal.classList.remove('activeBordureJaune'); 
    activeBordureJaune(event.currentTarget);
    messageErreur (".erreurtTailleMenu")
    // let produit = event.currentTarget;
    produitMenu.taille = "maxi";
    ajouterMenuMaxCommande(produitMenu, commandeMenu);
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
    afficherModaleFrite(produitMenu, commandeMenu);
    // Suppression de l'écouteur après le premier clic
    btnModalTailleMenu.removeEventListener('click', arguments.callee);
    } else {
      togglerModale(".erreurtTailleMenu");
    }
  });
}

// ----------------- MODAL MENU FRITE -----------------------

/**
 * role : affiche la modale frite
 * param : HTMLelement : le produit menu en cours
 */
function afficherModaleFrite(produitMenu, commandeMenu){
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
      afficherModaleBoisson(commandeMenu);
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
    commandeMenu.idFrite = 44; 
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
    commandeMenu.idFrite = 46; 
  });
}

// --------------- MODAL MENUS BOISSONS ---------------------------------

function afficherModaleBoisson(commandeMenu) {
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

  // btn ajouter menu à la commande
  const btnAjouter = document.getElementById("btnModalAjouter");
  btnAjouter.addEventListener("click", function(){
    if(commandeMenu.boisson){
      togglerModale(".modaleBoissons");
      const article = document.querySelector('.cardBoisson')
      const idBoisson = article.dataset.id;
      commandeMenu.idBoisson = idBoisson; 
      afficherMenuCommande(commandeMenu);

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
      <article data-id=${card.id} class="cardBoisson">
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

//  ecouteur sur card boissons
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
  commandeMenu.quantite=1;
  commandeMenus.push(commandeMenu);
  console.log(commandeMenus)

  let zone = document.getElementById("commandeMenu")
  let template = ''; 
  commandeMenus.forEach(menu=>{
      template += 
      `
        <div class="menuCmdDetail flex">
            <div class="menuCmd">
                <p class="cmd-nomProduitM titleCmd">${menu.menu ? menu.menu : ''} ${menu.taille ? menu.taille : ''}</p>
                <ul>
                    <li>${menu.frite ? menu.frite : ''}</li>
                    <li>${menu.boisson ? menu.boisson : ''}</li>
                    <li>Prix : ${(menu.taille == "normale" ? parseFloat(menu.price) : parseFloat(menu.price) + 0.5)} €</li>
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
function afficherProduitsCommande(commandeProduitTemp) {
  commandeProduit.push(commandeProduitTemp)
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
                <li>Quantité : ${produit.quantite}</li>
              </ul>
              <ul>
                <li>Unité : ${produit.price} €</li>
              </ul>
            </div>
            <div class="poubelleImage pblCmd">
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

/**
 * role : met a jour le produitCurrent et incremeté ou decrementer la quantite
 * param : le produit selectionnée (event.currentTarget)
 * param : le produit courent : objet 
 * param : quantité (1 pour ajouter, -1 pour supression)
 */

function preparartionCommande(produitCurrent, produitQuantite2, quantite) {
  // si event.currentTarget est null
  if (produitCurrent == null) {   
    produitCurrent = produitQuantite2;
    let quantiteTemp = produitQuantite2.quantite + quantite
    if (quantiteTemp <=0) {
      produitQuantite2.quantite = 1;
      document.getElementById("quantiteProduit").innerText = 1; // mise a jour affichage
    } else {
      produitQuantite2.quantite = produitQuantite2.quantite + quantite;
      document.getElementById("quantiteProduit").innerText = produitQuantite2.quantite;
    }
    document.getElementById("quantiteProduit").innerText  //mise a jour quantite
     // si event.currentTarget n'est pas null
  } else {
    let nom =produitCurrent.querySelector('p').textContent;   // modification nom
    produitQuantite2.nom = nom;
    let priceSupplementPrice = null; // modification prix
    let priceProduit = produitCurrent.querySelector('span').textContent;
    if (!produitCurrent.querySelector('#supplement')) { // supplement prix : si supplement exsite ajoute le sinon prix identique
      produitQuantite2.price = parseFloat(priceProduit);
    } else { 
      priceSupplementPrice = produitCurrent.querySelector('#supplement').textContent;
      produitQuantite2.price = parseFloat(priceSupplementPrice) + parseFloat(priceProduit);
    }
    // quantite
    let quantiteTemp = produitQuantite2.quantite + quantite
    if (quantiteTemp <=0) {
      produitQuantite2.quantite = 1;
      document.getElementById("quantiteProduit").innerText = 1; // mise a jour affichage
    } else {
      produitQuantite2.quantite = produitQuantite2.quantite + quantite;
      document.getElementById("quantiteProduit").innerText = produitQuantite2.quantite; // mise a jour affichage
    }
  }

  commandeProduitTemp = produitQuantite2;
}

/**
 * role : met a jour le produitCurrent et incremeter ou decrementer la quantite
 * param : le produit selectionnée (event.currentTarget)
 * param : le produit courent : objet 
 * param : quantité (1 pour ajouter, -1 pour supression)
 */

function preparartionCommandeProduit(produitCurrent, produitQuantite2, quantite) {
  if (produitCurrent == null) {   // si event.currentTarget est null
    produitCurrent = produitQuantite2;
    let quantiteTemp = produitQuantite2.quantite + quantite
    if (quantiteTemp <=0) {
      produitQuantite2.quantite = 1;
      document.querySelector(".quantiteProduitQ").innerText = 1; // mise a jour affichage
    } else {
      produitQuantite2.quantite = produitQuantite2.quantite + quantite;
      document.querySelector(".quantiteProduitQ").innerText = produitQuantite2.quantite;
    }
    document.querySelector(".quantiteProduitQ").innerText  //mise a jour quantite
  } else { // si event.currentTarget n'est pas null
    let nom =produitCurrent.querySelector('p').textContent;   // modification nom
    produitQuantite2.nom = nom;
    let priceSupplementPrice = null; // modification prix
    let priceProduit = produitCurrent.querySelector('span').textContent;
    if (!produitCurrent.querySelector('#supplement')) { // supplement prix : si supplement exsite ajoute le sinon prix identique
      produitQuantite2.price = parseFloat(priceProduit);
    } else { 
      priceSupplementPrice = produitCurrent.querySelector('#supplement').textContent;
      produitQuantite2.price = parseFloat(priceSupplementPrice) + parseFloat(priceProduit);
    }
    // quantite
    let quantiteTemp = produitQuantite2.quantite + quantite
    if (quantiteTemp <=0) {
      produitQuantite2.quantite = 1;
      document.querySelector(".quantiteProduitQ").innerText = 1; // mise a jour affichage
    } else {
      produitQuantite2.quantite = produitQuantite2.quantite + quantite;
      document.querySelector(".quantiteProduitQ").innerText = produitQuantite2.quantite; // mise a jour affichage
    }
  }
 
  commandeProduitTemp = produitQuantite2;
}

  // ------ fct preparation commande MENU --------------

/**
 * role : ajouter menu normal à la commande
 * param : htmlElement : produit selectionné
 */
function ajouterMenuNormalCommande(produitMenu, commandeMenu) {
  /*
    menu = produit.querySelector('p').textContent;
    priceMenu = produit.querySelector('span').textContent;
    priceMenu = parseFloat(priceMenu)
    commandeMenu.menu= menu;
    commandeMenu.priceMenu= priceMenu;
  */
   
    
   commandeMenu.idCategorie= produitMenu.idCategorie;
   commandeMenu.idProduit = produitMenu.idProduit;
   commandeMenu.idFrite= produitMenu.idFrite;
   commandeMenu.idBoisson= produitMenu.idBoisson;
   commandeMenu.menu= produitMenu.nom;
   commandeMenu.price= produitMenu.price;
   commandeMenu.quantite=produitMenu.quantite;
   commandeMenu.taille=produitMenu.taille;
   // commandeMenu = produitMenu;
 
   
  }

/**
 * role : ajouter menu max à la commande
 * param : htmlElement : produit selectionné
 */
function ajouterMenuMaxCommande(produitMenu, commandeMenu) {
  /*
    menu = produit.querySelector('p').textContent;
    priceMenu = produit.querySelector('span').textContent;
    priceMenu = parseFloat(priceMenu)+ 0.5;
    commandeMenu.menu= menu;
    commandeMenu.priceMenu= priceMenu;
*/

   commandeMenu.idCategorie= produitMenu.idCategorie;
   commandeMenu.idProduit= produitMenu.idProduit;
   commandeMenu.idFrite= produitMenu.idFrite;
   commandeMenu.idBoisson= produitMenu.idBoisson;
   commandeMenu.menu= produitMenu.nom;
   commandeMenu.price= produitMenu.price;
   commandeMenu.quantite=produitMenu.quantite;
   commandeMenu.taille=produitMenu.taille;
   //commandeMenu = produitMenu;
  
  }

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
 * role : calaculer le montant de la commande produits individuels
 * param : array : liste des produits individuels de la commande
 */
function calculerMontantCommandeProduit (commandeProduit) {
  let montanProduit = 0;
  commandeProduit.forEach(produit => {
    montanProduit +=  parseFloat(produit.price) * parseInt(produit.quantite);
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
    if (menu.taille == "maxi") {
      montantMenus +=  parseFloat(menu.price) + 0.5;
    } else { 
    montantMenus +=  parseFloat(menu.price);
  }
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
  // window.location.href = "./abientot.html";   // Redirection
});

}

// --------------------- ENNVOYER COMMANDE AU BACK ------------------------------
/**
 * role : enregistrer le paiement
 */
function enregistrerPayment() {
  const urlParams = new URLSearchParams(window.location.search); // parametre de l'url pour chevalet
  const nombreChevalet = urlParams.get('nombreChevalet');
  // Données à envoyées en AJAX vers serveur
  let commande = {};
  let datas = {};
  if(!nombreChevalet) {
    commande = {
      "status": "emporter",
      "numChevalet": "non",
      "numCommande": numeroCommande
    }
  } else {
    commande = {
      "status": "surplace",
      "numChevalet": nombreChevalet,
      "numCommande": numeroCommande
    }
  }
let commandeMenusJson = preparerCommandeMenu(commandeMenus)
datas = [commande, commandeProduit, commandeMenusJson];
console.log(datas);
envoyerCommandeAPI(datas)

}

/**
 * role : preparer les données vommandeMenu avant envoi
 */
function preparerCommandeMenu(commandeMenus) {
  const tableauJSON = [];
  commandeMenus.forEach(element => {
    
    const nouvelObjet = {};
    // Copier les propriétés pertinentes dans le nouvel objet
    nouvelObjet.boisson = element.boisson;
    nouvelObjet.frite = element.frite;
    nouvelObjet.idCategorie = element.idCategorie;
    nouvelObjet.idBoisson = element.idBoisson;
    nouvelObjet.idFrite = element.idFrite;
    nouvelObjet.idMenu = element.idProduit ;
    nouvelObjet.menu = element.menu;
    nouvelObjet.price = element.price;
    nouvelObjet.quantite = element.quantite;
    nouvelObjet.taille = element.taille;
    // Ajouter l'objet au tableau JSON

    console.log(nouvelObjet)
    tableauJSON.push(nouvelObjet);
  });
return tableauJSON;

}
/**
 * role : envoyer les donnée de commande au serveur
 * @param {*} datasaenvoyer : tableau de sommande avec service / commandeMenus et commandeProduits
 */
function envoyerCommandeAPI(datas) {
  const data = JSON.stringify(datas);
  fetch('http://exam-back.mcastellano.mywebecom.ovh/public/insertcommandeAPI', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: data
    })
    .then(response => response.text())
    .then(dataconf => {
        console.log('Réponse du serveur :', dataconf);
    })
    .catch(error => {
        console.error('Erreur lors envoi des données :', error);
    });
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
  nombre1.addEventListener("input",testNombre1);
  nombre2.addEventListener("input",testNombre2);
  nombre3.addEventListener("input",testNombre3);

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
    // si input nombre1 contien inputerro tu enleve
    let input = document.getElementById(id);
    if (input.classList.contains('input-error')){
    input.classList.remove("input-error");
    let p = document.getElementById("error-"+id);
    p.innerText ="";
    p.classList.add("d-none");
  }
  });
}

/* FONCTIONS TESTE */

/**CHAMPS VIDE : verifier si la valeur du champ est vide
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
  if(valueField.length > longueurMax) {
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


  