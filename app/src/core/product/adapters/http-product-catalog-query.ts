// =============================================================================
// ADAPTATEUR HTTP — ProductCatalogQuery
// =============================================================================
// Implémentation du port via fetch sur une API distante.
//
// RÔLE CRUCIAL : c'est l'ENDROIT UNIQUE qui parle à l'API. Si demain l'API
// change son format (renomme un champ, change un type), seul ce fichier
// devra évoluer. Le reste de l'app (use cases, UI, slice Redux) ne s'en
// rendra même pas compte.
//
// C'est testé avec MSW (Mock Service Worker) → on intercepte fetch côté Node
// et on renvoie des réponses simulées. On teste le VRAI code (vrai fetch,
// vraie sérialisation JSON), pas une mock.
// =============================================================================

import type { ProductCatalogQuery } from "../application/catalog-query";
import type { Category, Product, Unit } from "../domain/product";


/**
 * Type DTO (Data Transfer Object) = la forme RÉELLE renvoyée par l'API.
 *
 * Notez que les noms SONT DIFFÉRENTS du domaine :
 *   API : product_id, label, price_cents, available
 *   Domaine : id, name, priceCents, inStock
 *
 * C'est volontaire — l'API impose ses conventions (snake_case, vocabulaire
 * back-end), mais on ne laisse PAS ces conventions polluer notre domaine.
 * Le mapping est centralisé ici.
 *
 * Si l'API change, on adapte le DTO + le map. Le domaine reste stable.
 */
type ProductDto = {
  product_id: string;
  label: string;
  category: Category;
  price_cents: number;
  unit: Unit;
  available: boolean;
  description?: string;
};

/**
 * Factory de l'adaptateur HTTP.
 *
 * Paramètre `endpoint` : on injecte l'URL pour pouvoir avoir plusieurs
 * instances (dev, staging, prod) sans dupliquer le code.
 */
export function createHttpProductCatalogQuery(endpoint: string): ProductCatalogQuery {
  return {
    execute: async () => {
      // 1. On fait l'appel HTTP via le fetch global du navigateur (ou de Node).
      const response = await fetch(endpoint);

      // 2. fetch ne THROW PAS sur les codes 4xx/5xx (différent de axios).
      //    On doit vérifier response.ok manuellement et throw nous-mêmes.
      //    Si on oublie ça, on essaie de parser un body d'erreur → bug.
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // 3. On parse le JSON. Le cast `as ProductDto[]` est une promesse à
      //    TypeScript : "fais-moi confiance, le serveur renvoie cette forme".
      //    Dans un projet plus solide, on validerait avec Zod ou similaire.
      const payload = (await response.json()) as ProductDto[];

      // 4. MAPPING DTO → DOMAINE. C'est la partie la plus importante de
      //    l'adaptateur. Chaque champ est explicitement traduit.
      //    Le générique <Product> sur .map aide TypeScript à inférer le type
      //    de retour.
      return payload.map<Product>((dto) => ({
        id: dto.product_id,
        name: dto.label,
        category: dto.category,
        priceCents: dto.price_cents,
        unit: dto.unit,
        inStock: dto.available,
        description: dto.description,
      }));
    },
  };
}
