import type {Product} from "../domain/product";
import {retrieveCatalog} from "./retrieve-catalog";

const product1: Product = {
    id: '1',
    name: 'Product 1',
    price: 100,
    category: 'Category 1',
    description: 'Description 1',
    inStock: true,
    quantityMax: 10,
};


describe('Retrieve Catalog', () => {


// Renvoi les produits reçu du port
// pareil que la panne sauf que kind a un 'success' et on retourne products : [product1]
    it('Récupère les produits du ports', async () => {

        const query =  {execute: jest.fn().mockResolvedValue([product1]) };
        const result = await retrieveCatalog(query);

        expect(result).toEqual({kind: 'success', products: [product1]});
    });



// Transforme une panne technique en résultat métier failure (503) avec execute : jest.fn
// expect avec await exemple : await expect(retrieveCatalog(fallingQuery).resolves.toEqual...)
// kind message : avec la réponse noté en 'failure'
// message : avec ton message d'erreur.


//  fallingQuery = ... (new Error('503')) ...

    it('récupère un message erreur lisible en cas de fail;', async () => {

        const query =  {execute: jest.fn().mockRejectedValue(new Error('503')) };
        const result = await retrieveCatalog(query);

        expect(result).toEqual({kind: 'failure', message: "Error getting catalog"});
    });
});











