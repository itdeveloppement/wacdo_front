let commandeProduit = [];
let commandeMenus=[];

// -------------- AU CHARGEMENT --------------------
document.addEventListener('DOMContentLoaded', () => {
  const currentUrl = window.location.pathname; // url relative
  const urlParams = new URLSearchParams(window.location.search); // parametre de l'url pour chevalet

  // page choix
  if (currentUrl === '/assets/pages/choix.html') { 
    datasCategorie();
    carousselCategorie ();
    afficherNumeroChevalet(urlParams);
    afficherMontantCommande(0)
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
            <p class="nomProduit">${card.nom}</p>
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
      afficherModaleTailleMenu(produit);
      togglerModale(".modaleTailleMenu");
    } else {
      console.log("ajouter produit à commande")
      afficherProduitCommande(produit)
    }
  });
});
}

// -------------- MODALES MENU ------------------------------------------
let produit = null;
/**
 * role : affiche la modale menu
 * param : htmlElement : le produit selectionné
 */
function afficherModaleTailleMenu(produit){
  let commandeMenu = [];
  
  console.log(commandeMenu);
  // ouverture modale menu
  // togglerModale(".modaleTailleMenu");

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
     <div class="erreurtTailleMenu modal-hidden">
        <p>Vous devez selectionner une taille</p>
     </div>
    <div>
        <button id="btnModalTailleMenu" >Etape suivante</button>
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
    // afficherModaleTailleMenu(produit)
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
      <nav>
        <ul>
            <li>
              <button id="btnRetourFrite">Retour</button>
            </li>
            <li> 
              <div id="croixImageFrite">
                <img src="../images/images/supprimer.png" alt="croix pour fermer la popup">
              </div>
            </li>
        </ul>
      </nav>
      <!-- titre -->
      <div>
          <h4>Choisissez votre accompagnement</h4>
          <p>Frites, potatoes, la pomme de terre dans tous ses états</p>
      </div>
      <!-- frite / potatoes -->
      <section>
          <article class="friteModal">
              <div>
                    <img src="../images/frites/GRANDE_FRITE.png" alt="barquette de grande frite">
              </div>
              <p>Frites</p>
          </article>
          <article class="potatoesModal">
              <div>
                    <img src="../images/frites/GRANDE_POTATOES.png" alt="barquette de grande frite potetoes">
              </div>
              <p>Potatoes</p>
          </article>
      </section>
      <div class="erreurtFrite modal-hidden">
        <p>Vous devez selectionner un accompagnement</p>
     </div>
      <div>
          <button id="btnModalFrite">Etape suivante</button>
      </div>
    `

  zone.innerHTML = template;

  // ouverture - fermeture modale
  // togglerModale(".modaleFrite")

  // fermeture modale par la croix
  const croix = document.getElementById("croixImageFrite");
  croix.addEventListener("click", function(){

    // ouverture fermeture modale
    togglerModale(".modaleFrite")
    // afficherModaleFrite(produit);
  });

  // bouton retour
  const btnRetour = document.getElementById("btnRetourFrite");
  btnRetour.addEventListener("click", (event) => {
    // event.stopPropagation();
    togglerModale(".modaleFrite")
    togglerModale(".modaleTailleMenu");

    // afficherModaleTailleMenu(produit);
    // afficherModaleFrite(produit);
 });

  // boutton etape suivante
  const btnModalFrite = document.getElementById("btnModalFrite");
  btnModalFrite.addEventListener("click", () => {
    if(commandeMenu.frite){
      togglerModale(".modaleBoissons");
      afficherModaleBoisson(produit, commandeMenu);
      togglerModale(".modaleFrite")
    
      // afficherModaleFrite(produit);
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
      <nav>
        <ul>
            <li>
              <button id="btnRetourBoisson">Retour</button>
            </li>
            <li> 
              <div id="croixImageBoisson">
                <img src="../images/images/supprimer.png" alt="croix pour fermer la popup">
              </div>
            </li>
        </ul>
      </nav>
      <!-- titre -->
      <div>
          <h4>Choisissez votre accompagnement</h4>
          <p>Frites, potatoes, la pomme de terre dans tous ses états</p>
      </div>
      <!-- caroussel boissons -->
      <div class="carouselBoisson">
          <div>
              <img class="prevBoisson" src="../images/images/fleche-slider.png" alt="Fleche precedent">
          </div>
          <div class="carousel-boisson">
              <!-- fct js afficherCardBoisson -->
          </div>
          <div>
              <img class="nextBoisson" src="../images/images/fleche-slider-next.png"  alt="Fleche suivant">
          </div>
      </div>
      <div class="erreurBoisson modal-hidden">
        <p>Vous devez selectionner une boisson</p>
      </div>
      <div>
          <button id="btnModalAjouter">Ajouter le menu à ma commande</button>
      </div>
    `
  zone.innerHTML = template;

  // classe afficher modale
  // togglerModale(".modaleBoissons");

  datasBoissons(commandeMenu)
  carousselBoissons();

  // -----  ecouteurs evenement dans la modale boisson ------

  // fermeture modale par la croix
  const croixBoisson = document.getElementById("croixImageBoisson");
  croixBoisson.addEventListener("click", function(){
    console.log("test")
    togglerModale(".modaleBoissons");
    // afficherModaleBoisson(produit) 
  });

  // retour vers modale frite
  const btnRetourBoisson = document.getElementById("btnRetourBoisson");
  btnRetourBoisson.addEventListener("click", function(){
    togglerModale(".modaleBoissons");
    togglerModale(".modaleFrite")
    //afficherModaleBoisson(produit) 
    // afficherModaleFrite(produit);
  });


  // ajouter menu à la commande
  const btnAjouter = document.getElementById("btnModalAjouter");
  btnAjouter.addEventListener("click", function(){
    console.log(commandeMenu)
    if(commandeMenu.boisson){
      togglerModale(".modaleBoissons");
      // afficherModaleBoisson(produit)
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
 
  console.log(commandeMenu)
  commandeMenus.push(commandeMenu);
 
  let zone = document.getElementById("commandeMenu")
  let template = ''; // declaration
  // extraction des données et construction card / template
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
  // Ecouteur d'événement à la zone (element) pour suppression produit
    zone.addEventListener('click',(event) => {
      console.log(commandeMenus)
      supprimerMenu(event)
  });

  calculerMontantCommandeMenus (commandeMenus)
  // return []; // Retourne un tableau vide
}

/**
 * role : afficher la commande d'un produit individuel
 * @param {*} produit produit selectionnée
 */
function afficherProduitCommande(produit) {
  let nom = produit.querySelector('.nomProduit').textContent
  let price = produit.querySelector('.priceMenu').textContent

  let produitTemp = [];
  produitTemp.nom = nom;
  produitTemp.price = price;

  commandeProduit.push(produitTemp)

  let zone = document.getElementById("commandeProduit")
    let template = ''; // declaration
    // extraction des données et construction card / template
    commandeProduit.forEach(produit=>{
        template += 
        `
          <div>
              <p class="cmd-nomProduit">${produit.nom}</p>
              <p>${produit.price} €</p>
              <div class="poubelleImage">
                <img src="../images/images/trash.png" alt="poubelle">
              </div>
          </div>
        `;    
    });

 zone.innerHTML = template;

// Ecouteur d'événement à la zone (element) pour suppression produit
zone.addEventListener('click', supprimerProduit);

// calculer et afficher montant de la commande
calculerMontantCommandeProduit (commandeProduit)
};

// -------- supression produit ou menus commande --------------------

/**
 * role :suprrimer un produit de la commande
 * @param {role } event (element selectionné)
 */
function supprimerProduit(event) {

  const parentDiv = event.target.closest('.poubelleImage').parentNode; // Trouver la div parente
  console.log(parentDiv)
  const nomProduit = parentDiv.querySelector('.cmd-nomProduit').textContent; // Récupérer l'id du produit
  console.log(nomProduit)
  // Trouver l'index du produit dans le tableau
  const index = commandeProduit.findIndex(produit => produit.nom === nomProduit);

  // Supprimer l'élément du DOM
  parentDiv.remove();

  // Supprimer l'élément du tableau
  commandeProduit.splice(index, 1); // (1 = nb element à suprimer)
  console.log(commandeProduit);
  calculerMontantCommandeProduit (commandeProduit);
}

/**
 * role :suprrimer un menu de la commande
 * @param {role } event (element selectionné)
 */
function supprimerMenu(event) {

  const parentDiv = event.target.closest('.poubelleImageM').parentNode; // Trouver la div parente
  console.log(parentDiv)
  const nomProduit = parentDiv.querySelector('.cmd-nomProduitM').textContent; // Récupérer l'id du produit
  console.log(nomProduit)
  console.log(commandeMenus);
  // Trouver l'index du produit dans le tableau
  const index = commandeMenus.findIndex(menu => menu.nom === nomProduit);
  console.log(index);
  // Supprimer l'élément du DOM
  parentDiv.remove();
  console.log(commandeMenus);
  // Supprimer l'élément du tableau
  commandeMenus.splice(index, 1); // (1 = nb element à suprimer)
  
  calculerMontantCommandeMenus (commandeMenus);
}

// ------------ calculer et afficher montant commande -----------------

/**
 * role : calaculer le montant de la commande produits individuel
 * param : array : liste des produits individuels de la commande
 */
function calculerMontantCommandeProduit (commandeProduit) {
  console.log(commandeProduit)
  let montanProduit = 0;
  commandeProduit.forEach(produit => {
    montanProduit +=  parseFloat(produit.price);
})
console.log(montanProduit)
param = "produits";
sommeCommande(montanProduit, param)

}

/**
 * role : calaculer le montant de la commande menus
 * param : array : liste menus selectionnés
 */
function calculerMontantCommandeMenus (commandeMenus) {
  console.log(commandeMenus)
  let montantMenus = 0;
  commandeMenus.forEach(menu => {
    console.log("test")
    console.log(menu.priceMenu)
    montantMenus +=  parseFloat(menu.priceMenu);
})
param = "menus";
sommeCommande(montantMenus, param)
console.log(montantMenus)

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
  console.log(param)
  if (param == "menus") {
    tabMontant[param] = montant
  } else if (param == "produits"){
    tabMontant[param] = montant
  }

  let somme = tabMontant.menus + tabMontant.produits
  afficherMontantCommande (somme)

console.log(somme)
}

/**
 * role : afficher le prix de la commande
 */
function afficherMontantCommande (montant) {
  let zone = document.getElementById("commandeMontant")
  let template= 
    `
    <div>          
        <p>TOTAL</p>
        <p>(ttc)</p>
    </div>
    <p>${montant} €</p>
    `
  zone.innerHTML = template
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
    /*
  const modale = document.querySelector(classModal);
  modale.classList.toggle("modal-hidden");
  */
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
  if(nombreChevalet) { 
    let zone = document.querySelector(".surplace")
    let template=
    `
      <p>Numero Chevalet : ${nombreChevalet}</div>
    `
    zone.innerHTML = template;
  }
}



  