import type {Product} from "../../core/product/domain/product";
import {added, cartReducer} from "./cart-slice";

const product1: Product = {
    id: '1',
    name: 'Product 1',
    price: 100,
    category: 'Category 1',
    description: 'Description 1',
    inStock: true,
    quantityMax: 10,
};




// Panier vide 

describe('cartSlice emtpy', () => {

    // Panier vide
    it('On créer un panier vide', () => {
        const state = cartReducer(undefined, {type: 'unknown'});
        expect(state.cart.items).toEqual([]);
    })
});



// Panier vide 

// Ajoute un produit au panier

// Ajoute un produit au panier avec une quantité supérieure à 1

// Ajoute un produit au panier avec une quantité supérieure à la quantité maximale

// Ajouter un produit au panier qui est déjà présent dans le panier

// Ajouter un produit au panier qui n'existe pas

// Supprime un produit du panier

// Supprime un produit du panier qui n'existe pas

// Supprime un produit du panier qui est déjà présent dans le panier

// Diminuer la quantité d'un produit dans le panier