
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
    afficherNumeroCommande()
    afficherMontantCommande(0)
    datasProduits('menus')
    datasCategorie(() => {
      carousselCategorie();
    });
    
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
    formChevalet();
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
function datasBoissons(commandeMenu) {
  fetch('../../json/produits.json')
    .then(response => response.json())
    .then(datas => {
    afficherCardsBoissons(datas, commandeMenu)
  })
    .catch(error => {
      console.error('Erreur lors de la récupération des boissons :', error);
  });
}

// CHANGEMENT TYPO

function typo(){
  const btnTypo = document.getElementById("btn-typo")
  btnTypo.addEventListener("click", () => {
    console.log("test")
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
// ----------------- CAROUSSEL CATEGORIE -------------------------

/**
 * orole : organise le defilement du caroussel
 */
function carousselCategorie() {
  
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

  // selection des elements
  const carousel = document.querySelector('.carousel-categorie');
  const cards = document.querySelectorAll('.cardCategorie');
  const prevBtn = document.querySelector('.prevCategorie');
  const nextBtn = document.querySelector('.nextCategorie'); 
  // variables
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth; // calcul du deplacement d'une card
  const carouselWidth = carousel.offsetWidth; // Largeur visible du carrousel
  const visibleCards = Math.floor(carouselWidth / cardWidth); // Nombre de cartes visibles
  // bornage du defilement
  const isFirstSlide = () => currentIndex === 0; // si index card = 0 (premiere card) alors true sinon false
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
    prevBtn.disabled = isFirstSlide(); // Désactiver le bouton "Précédent" au début
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
  card.addEventListener('click', (event) => {
    const categorie = event.currentTarget.querySelector('p').textContent;
    datasProduits(categorie);
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
            <div class="cardProduitImg">
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
    const produit = event.currentTarget;
    if (categorie == "menus") {
      afficherModaleTailleMenu(produit);
      togglerModale(".modaleTailleMenu");
    } else {
      afficherProduitCommande(produit)
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
                <div>
                    <img src="${urlImage}" alt="menu ${name}">
                </div>
                <p class="cardSegondaireText">${name}</p>
                <span hidden>${price}</span>
            </article>
            <article class="menuMax flex cardSegondaireCoprs">
                <div>
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
    messageErreur (".erreurtTailleMenu")
    let produit = event.currentTarget;
    ajouterMenuNormalCommande(produit, commandeMenu);
  });

  // ajouter le choix taille max à la commande
  const menuMax = document.querySelector(".menuMax");
  menuMax.addEventListener("click", (event) => {
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
    let produit = event.currentTarget;
    let frite = produit.querySelector('p').textContent;
    commandeMenu.frite = frite; 
  });

  // ajouter potetose à la commande
  const potatoesModal = document.querySelector(".potatoesModal");
  potatoesModal.addEventListener("click", (event) => {
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

  datasBoissons(commandeMenu)
  carousselBoissons();

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
        <div>
            <div>
                <p class="cmd-nomProduitM">${menu.menu ? menu.menu : ''}</p>
                <p>${menu.frite ? menu.frite : ''}</p>
                <p>${menu.boisson ? menu.boisson : ''}</p>
                <p>${menu.priceMenu ? menu.priceMenu : ''} €</p>
            </div>
            <div class="poubelleImageM">
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
          <div>
              <p class="cmd-nomProduit">${produit.nom}</p>
              <p>${produit.price}</p>
              <div class="poubelleImage">
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
  let zone = document.querySelector(".surplace")
  if(nombreChevalet) { 
    let template=
    `
      <p>Surplace</P>
      <p>Chevalet : ${nombreChevalet}</p>
    `
    zone.innerHTML = template;
  } else {
    let template=
    `
      <p>A emporter</P>
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



  