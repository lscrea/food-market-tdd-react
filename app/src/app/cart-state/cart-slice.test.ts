import type { Product } from "../../core/product/domain/product";
import { cartReducer } from "./cart-slice";

const product1 : Product = {
    id: '1',
    name: 'Product 1',
    price: 100,
    category: 'Category 1',
    description: 'Description 1',
    inStock: true,
    quantityMax: 10,
};




// Panier vide 

describe('cartSlice', () => {
    it('On créer un panier vide', () => {
     const state = cartReducer(undefined, { type: 'unknown' });
     expect(state.cart.items).toEqual([]);
    })
});


// Ajoute un produit au panier




// Ajoute un produit au panier avec une quantité supérieure à 1

// Ajouter un produit au panier qui est déjà présent dans le panier

// Ajoute un produit au panier avec une quantité supérieure à la quantité maximale

// Ajouter un produit au panier qui n'existe pas




// Supprime un produit du panier

// Supprime un produit du panier qui n'existe pas

// Supprime un produit du panier qui est déjà présent dans le panier

// Diminuer la quantité d'un produit dans le panier