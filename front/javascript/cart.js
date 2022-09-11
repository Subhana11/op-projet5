/***************************************   FONCTIONS POUR AJOUT DES ELEMENTS DANS LE DOM  **************************************/
// Ajouter un article (ajout d'un id pour y rattacher les éléments enfants)
function addArticle(basket, index) {
    let article = document.createElement('article');
    article.setAttribute('class', 'cart__item cart__item-' + index);
    article.setAttribute('data-id', basket[index].id);
    article.setAttribute('data-color', basket[index].color);
    document.getElementById('cart__items').appendChild(article);
  }
  
  // Ajouter une div contenant l'image
  function addImgContent(index) {
    let cartItemImage = document.createElement('div');
    cartItemImage.setAttribute(
      'class',
      'cart__item__img cart__item__img-' + index
    );
    document
      .getElementsByClassName('cart__item-' + index)[0]
      .appendChild(cartItemImage);
  }
  
  // Insérer l'image du produit
  function addImg(data, index) {
    let img = document.createElement('img');
    img.setAttribute('alt', "Photographie d'un canapé");
    img.setAttribute('class', 'img-' + index);
    img.setAttribute('src', data.imageUrl);
    document
      .getElementsByClassName('cart__item__img-' + index)[0]
      .appendChild(img);
  }
  
  // Ajouter une div avec le contenu du produit
  function addItemContent(index) {
    let content = document.createElement('div');
    content.setAttribute(
      'class',
      'cart__item__content cart__item__content-' + index
    );
    document
      .getElementsByClassName('cart__item-' + index)[0]
      .appendChild(content);
  }
  
  // Ajouter une div avec la description du produit
  function addItemDescription(index) {
    let description = document.createElement('div');
    description.setAttribute(
      'class',
      'cart__item__content__description content__description-' + index
    );
    document
      .getElementsByClassName('cart__item__content-' + index)[0]
      .appendChild(description);
  }
  
  // Ajouter nom du produit (h2)
  function addItemTitle(data, index) {
    let productTitle = document.createElement('h2');
    productTitle.setAttribute('id', 'item__content__title-' + index);
    productTitle.textContent = data.name;
    document
      .getElementsByClassName('content__description-' + index)[0]
      .appendChild(productTitle);
  }
  
  // Ajouter la couleur du produit (p)
  function addItemColor(basket, index) {
    let color = document.createElement('p');
    color.setAttribute('id', 'item__color-' + index);
    color.textContent = basket[index].color;
    document
      .getElementsByClassName('content__description-' + index)[0]
      .appendChild(color);
  }
  
  // Ajouter le prix du produit (p)
  function addProductPrice(data, index) {
    let price = document.createElement('p');
    price.setAttribute('id', 'item__price-' + index);
    price.textContent = data.price + '€';
    document
      .getElementsByClassName('content__description-' + index)[0]
      .appendChild(price);
  }
  
  // Contenu intéraction produit (ajouter/supprimer)
function addItemSettings(index) {
    let settings = document.createElement('div');
    settings.setAttribute(
      'class',
      'cart__item__content__settings content__settings-' + index
    );
    document
      .getElementsByClassName('cart__item__content-' + index)[0]
      .appendChild(settings);
  }
  // Ajouter contenu pour modifier quantité
function setItemQuantity(index) {
    let setQuantity = document.createElement('div');
    setQuantity.setAttribute(
      'class',
      'cart__item__content__settings__quantity set__quantity-' + index
    );
    document
      .getElementsByClassName('content__settings-' + index)[0]
      .appendChild(setQuantity);
  }
  
  // Ajouter affichage de la quantité du produit (p)
function addItemQuantity(index) {
    let quantity = document.createElement('p');
    quantity.setAttribute('id', 'quantity-' + index);
    quantity.textContent = 'Qté =';
    document
      .getElementsByClassName('set__quantity-' + index)[0]
      .appendChild(quantity);
  }
  
  // Ajouter input pour indiqué la quantité de base et pouvoir la modifier
  function addInputQuantity(basket, index) {
    let input = document.createElement('input');
    input.setAttribute('class', 'itemQuantity itemQuantity-' + index);
    input.setAttribute('name', 'itemQuantity');
    input.setAttribute('type', 'number');
    input.setAttribute('min', '1');
    input.setAttribute('max', '100');
    input.setAttribute('value', `${basket[index].quantity}`);
    document
      .getElementsByClassName('set__quantity-' + index)[0]
      .appendChild(input);
  }
  
  // Ajouter contenant supprimer
  function addContainerOfDelete(index) {
    let containerOfDelete = document.createElement('div');
    containerOfDelete.setAttribute(
      'class',
      'cart__item__content__settings__delete settings__delete-' + index
    );
    document
      .getElementsByClassName('content__settings-' + index)[0]
      .appendChild(containerOfDelete);
  }
  
  // Ajouter texte "supprimer" un produit du panier
  function addDeleteProductContent(index) {
    let deleteButton = document.createElement('p');
    deleteButton.setAttribute('class', 'deleteItem deleteItem-' + index);
    deleteButton.textContent = 'Supprimer';
    document
      .getElementsByClassName('settings__delete-' + index)[0]
      .appendChild(deleteButton);
  }
  /********************************************************   GESTION DU PANIER  *************************************************************/
// initialisation panier
function getBasket() {
    let basket = localStorage.getItem('basket');
  
    if (basket !== null) {
      return JSON.parse(basket);
      
    }
  
    return [];
    
  }
  // Affichage quantité totale : filtrage avec map(), addition par paire de chaque quantité avec reduce()
function updateTextQuantity() {
    const totalQuantity = getBasket()
      .map((p) => p.quantity)
      .reduce((prevTotal, quantity) => prevTotal + quantity, 0);
    const textQuantity = document.getElementById('totalQuantity');
    textQuantity.textContent = totalQuantity;
  }
 // Affichage prix total :

// création d'un objet avec clé/value = id/prix (1/2)
let productPriceMapping = {};

function updateTotalPrice() {
  const totalPrice = getBasket()
    .map((p) => ({
      id: p.id,
      quantity: p.quantity,
    }))
    .reduce(
      (prevTotal, currentItem) =>
        prevTotal + currentItem.quantity * productPriceMapping[currentItem.id],
      0
    );

  const textTotalPrice = document.getElementById('totalPrice');
  textTotalPrice.textContent = totalPrice;
}
// sauvegarder  le panier de l'API au format JSON
function saveToBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
  }
  
  // Supprimer le produit du panier et du DOM
  function deleteProduct() {
    let basket = getBasket();
  
    for (let j = 0; j < basket.length; j++) {
      const clickToDelete = document.getElementsByClassName('deleteItem-' + j)[0];
      const currentItem = basket[j];
  
      clickToDelete.addEventListener('click', () => {
        let basket = getBasket();
        const itemsToKeep = basket.filter(
          (p) => p.id !== currentItem.id || p.color !== currentItem.color
        );
  
        let section = document.getElementById('cart__items');
        let article = document.getElementsByClassName('cart__item-' + j)[0];
        section.removeChild(article);
  
        saveToBasket(itemsToKeep);
        updateTextQuantity();
        updateTotalPrice();
      });
    }
  }
  
  // Modifier la quantité d'un produit
  function modifyQuantity() {
    let basket = getBasket();
  
    for (let k = 0; k < basket.length; k++) {
      let input = document.getElementsByClassName('itemQuantity-' + k)[0];
      let product = document.getElementsByClassName('cart__item-' + k)[0];
  
      input.addEventListener('change', (e) => {
        // quantité modifiée
        const updateQuantity = Number(e.target.value);
        // détermination de l'index du produit selectionné
        const addedProductIndex = basket.findIndex(
          (p) => p.id === product.dataset.id && p.color === product.dataset.color
        );
        const addedProduct = basket[addedProductIndex];
  
        // Changement de la quantité du produit du panier
        addedProduct.quantity = updateQuantity;
  
        // Plafonnement de la quantité à 100
        if (addedProduct.quantity > 100) {
          addedProduct.quantity = 100;
          alert(
            'Vous avez atteint la limite de quantité à 100 par commande pour ce produit'
          );
        }
  
        saveToBasket(basket);
        updateTextQuantity();
        updateTotalPrice();
      });
    }
  }
  
  
  