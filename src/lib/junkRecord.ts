/**
 * Junk-record detection for public (Open Food Facts / Open Beauty Facts) sheets.
 *
 * Some public entries exist but carry nothing usable: no name, no brand, an
 * empty nutriments object and a garbled ingredient string ("POR AQUI 4 QUEIJOS
 * QUEIJOS a AS"). Rendering those as a real product sheet is worse than saying
 * honestly that we have no reliable data.
 *
 * The detector is deliberately conservative: an *incomplete* sheet (name +
 * nutrients but no ingredients, or name + ingredients but no table) is NOT
 * junk — those already have their own "complete it with photos" affordances.
 */
import type { ProductData } from '@/lib/productLookup';

export interface JunkVerdict {
  junk: boolean;
  reasons: string[];
}

const NO_NAME_MARKERS = [
  'producto sin nombre',
  'unknown product',
  'sin nombre',
  'produit sans nom',
];

const INGREDIENT_MARKERS = [
  'ingredient', 'ingrédient', 'ingrediente',
  'agua', 'aqua', 'water', 'eau',
  'azúcar', 'azucar', 'sugar', 'sucre',
  'sal', 'salt', 'sel', 'sodium',
  'aceite', 'oil', 'huile', 'oleum',
  'harina', 'flour', 'farine',
  'leche', 'milk', 'lait', 'lactis',
  'trigo', 'wheat', 'triticum',
  'glycerin', 'parfum', 'alcohol', 'acid', 'ácido', 'acide',
  'extract', 'extracto', 'extrait',
  'sodium', 'potassium', 'citrate', 'oxide', 'stearate', 'glycol',
  'proteina', 'proteína', 'protein', 'almidón', 'almidon', 'starch',
  'cacao', 'tomate', 'tomato', 'arroz', 'rice', 'maíz', 'maiz', 'corn',
  'huevo', 'egg', 'oeuf', 'queso', 'cheese', 'fromage',
  'oliva', 'olive', 'girasol', 'sunflower', 'tournesol',
];

const hasEAdditive = (t: string) => /\be\s?\d{3}[a-z]?\b/i.test(t);

const looksLikeIngredientList = (rawText: string): boolean => {
  const text = rawText.trim();
  if (!text) return false;
  const lower = text.toLowerCase();

  const hasMarker = INGREDIENT_MARKERS.some(m => lower.includes(m)) || hasEAdditive(lower);
  const separators = (text.match(/[,;]/g) || []).length;

  // A long, well-separated list is a list even if we don't know its words.
  if (separators >= 3 && text.length >= 25) return true;
  // A short list is fine when it clearly names ingredients
  // ("Aceite de oliva virgen extra", "Agua, sal").
  if (hasMarker) return true;

  // Otherwise: no separators, no known words → check for gibberish repetition.
  return false;
};

const isGibberish = (rawText: string): boolean => {
  const text = rawText.trim();
  if (!text) return false;
  const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  if (words.length < 2) return true;
  const unique = new Set(words);
  const repetitionRatio = 1 - unique.size / words.length;
  const shortWords = words.filter(w => w.length <= 2).length / words.length;
  return repetitionRatio >= 0.25 || shortWords >= 0.4;
};

const hasRealNutriments = (raw: unknown): boolean => {
  if (!raw || typeof raw !== 'object') return false;
  const n = (raw as Record<string, unknown>).nutriments;
  if (!n || typeof n !== 'object') return false;
  const values = Object.values(n as Record<string, unknown>);
  return values.some(v => {
    const num = typeof v === 'string' ? Number(v.replace(',', '.')) : v;
    return typeof num === 'number' && Number.isFinite(num) && num !== 0;
  });
};

/**
 * Evaluate whether a public product sheet is unusable.
 * Only public sources (off/obf) are evaluated — user-contributed maseya rows
 * and photo captures are never treated as junk.
 */
export function evaluateJunkRecord(p: ProductData): JunkVerdict {
  if (p.source !== 'off' && p.source !== 'obf') return { junk: false, reasons: [] };

  const reasons: string[] = [];

  const name = (p.name || '').trim();
  const noName = !name || NO_NAME_MARKERS.some(m => name.toLowerCase() === m) || name.length < 3;
  if (noName) reasons.push('no_name');

  if (!(p.brand || '').trim()) reasons.push('no_brand');

  if (!hasRealNutriments(p.raw)) reasons.push('no_nutriments');

  const ing = (p.ingredients_text || '').trim();
  const junkIngredients = ing.length > 0
    && (!looksLikeIngredientList(ing) || (ing.length < 25 && isGibberish(ing)));
  if (junkIngredients) reasons.push('junk_ingredients');

  const grade = (p.nutriscore_grade || '').toLowerCase();
  if (!grade || grade === 'unknown' || grade === 'not-applicable') reasons.push('no_grade');

  if (p.category === 'unknown') reasons.push('unknown_category');

  // Conservative gate: several signals AND at least one that proves the sheet
  // is actively broken (unnamed or garbled ingredients).
  const junk = reasons.length >= 3 && (noName || junkIngredients);
  return { junk, reasons };
}
