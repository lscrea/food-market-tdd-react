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

describe('cartSlice emtpy', () => {

    // Panier vide
    it('On créer un panier vide', () => {
        const state = cartReducer(undefined, {type: 'unknown'});
        expect(state.cart.items).toEqual([]);
    })
});


describe('CartSlice', () => {


    // Ajoute un produit au panier
    it('Ajoute un item valide', () => {
        let state = cartReducer(undefined, {type: 'unknown'});
        state = cartReducer(state, added({product: product1, quantity: 1}));

        expect(state.cart.items).toEqual([{
            name: product1.name, quantity: 1, productId: product1.id, priceCents: product1.price
        }]);
    });

    // Ajoute un produit au panier avec une quantité supérieure à 1

    it('Ajoute un item valide avec une quantité supérieur a 1', () => {
        let state = cartReducer(undefined, {type: 'unknown'});
        state = cartReducer(state, added({product: product1, quantity: 3}));

        expect(state.cart.items).toEqual([{
            name: product1.name, quantity: 3, productId: product1.id, priceCents: product1.price
        }]);

    });

    // Ajoute un produit au panier avec une quantité supérieure à la quantité maximale
    it('Ajoute un item valide avec une quantité max', () => {
        let state = cartReducer(undefined, {type: 'unknown'});
        state = cartReducer(state, added({product: product1, quantity: 11}));
        expect(state.cart.items).toEqual([]);

    });

    // Ajouter un produit au panier qui est déjà présent dans le panier
    it('Ajoute plusieurs fois le meme item avec des qty différentes', () => {
        let state = cartReducer(undefined, {type: 'unknown'});
        state = cartReducer(state, added({product: product1, quantity: 1}));
        expect(state.cart.items).toEqual([{
            name: product1.name, quantity: 1, productId: product1.id, priceCents: product1.price
        }]);

        state = cartReducer(state, added({product: product1, quantity: 3}));
        expect(state.cart.items).toEqual([{
            name: product1.name, quantity: 4, productId: product1.id, priceCents: product1.price
        }]);

    });

    // Ajouter un produit au panier qui n'existe pas
    it('Ajoute un item qui existe pas', () => {
        let state = cartReducer(undefined, {type: 'unknown'});
        state = cartReducer(state, added({product: {...product1, id: ''}, quantity: 1}));
        expect(state.cart.items).toEqual([]);

    });

});


// Supprime un produit du panier

// Supprime un produit du panier qui n'existe pas

// Supprime un produit du panier qui est déjà présent dans le panier

// Diminuer la quantité d'un produit dans le panier