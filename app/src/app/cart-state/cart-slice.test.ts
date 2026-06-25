
import {
  cartActions,
  cartReducer,
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from './cart-slice';
import type { Product } from '../../core/product/domain/product';

const pomme: Product = {
  id: 'p-1', name: 'Pomme', category: 'fruits', priceCents: 299, unit: 'kg', inStock: true,
};
const baguette: Product = {
  id: 'p-2', name: 'Baguette', category: 'boulangerie', priceCents: 130, unit: 'unite', inStock: true,
};

describe('cart-slice', () => {
  it('démarre avec un panier vide', () => {
    // On passe undefined comme state pour que le reducer applique son initialState.
    // On passe une action bidon (@@INIT) qui ne matche aucun reducer — le state
    // reste donc à initialState.
    const state = cartReducer(undefined, { type: '@@INIT' });
    expect(state.cart.items).toHaveLength(0);
  });

  it('ajoute un produit au panier', () => {
    // cartActions.added(...) construit une action avec le bon type et payload.
    const state = cartReducer(undefined, cartActions.added({ product: pomme }));
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].quantity).toBe(1);
  });

  it('incrémente la quantité si le produit est déjà présent', () => {
    // On chaine : un ajout par défaut (qty=1), puis un ajout qty=2.
    // Résultat attendu : 1 + 2 = 3.
    let state = cartReducer(undefined, cartActions.added({ product: pomme }));
    state = cartReducer(state, cartActions.added({ product: pomme, quantity: 2 }));
    expect(state.cart.items[0].quantity).toBe(3);
  });

  it('retire un produit', () => {
    let state = cartReducer(undefined, cartActions.added({ product: pomme }));
    state = cartReducer(state, cartActions.added({ product: baguette }));
    state = cartReducer(state, cartActions.removed('p-1'));
    // Il ne reste que la baguette.
    expect(state.cart.items.map((i) => i.productId)).toEqual(['p-2']);
  });

  it('met à jour une quantité (et retire si <= 0)', () => {
    let state = cartReducer(undefined, cartActions.added({ product: pomme }));
    state = cartReducer(state, cartActions.quantityUpdated({ productId: 'p-1', quantity: 5 }));
    expect(state.cart.items[0].quantity).toBe(5);

    // Quantité 0 → on s'attend à voir le produit RETIRÉ.
    state = cartReducer(state, cartActions.quantityUpdated({ productId: 'p-1', quantity: 0 }));
    expect(state.cart.items).toHaveLength(0);
  });

  it('vide entièrement le panier', () => {
    let state = cartReducer(undefined, cartActions.added({ product: pomme, quantity: 3 }));
    state = cartReducer(state, cartActions.cleared());
    expect(state.cart.items).toHaveLength(0);
  });

  it('expose les sélecteurs panier (items, total, count)', () => {
    let state = cartReducer(undefined, cartActions.added({ product: pomme, quantity: 2 }));
    state = cartReducer(state, cartActions.added({ product: baguette, quantity: 3 }));
    // Pour appeler les selectors, on simule le state COMPLET de l'app.
    // Le slice s'attend à state.cart, donc on construit { cart: state }.
    const root = { cart: state };

    expect(selectCartItems(root)).toHaveLength(2);
    // Math : 2×299 + 3×130 = 598 + 390 = 988 centimes.
    expect(selectCartTotal(root)).toBe(2 * 299 + 3 * 130);
    // 2 pommes + 3 baguettes = 5 articles.
    expect(selectCartItemCount(root)).toBe(5);
  });
});
