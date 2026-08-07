import type { Category, ColorName } from './products'
import type { ShopPreset } from '../lib/store'

export const CATEGORY_LABELS: Record<Category, string> = {
  Sofas: 'Диваны',
  Chairs: 'Кресла и стулья',
  Tables: 'Столы',
  Beds: 'Кровати',
  Storage: 'Хранение',
  Lighting: 'Освещение',
  Accessories: 'Аксессуары',
  Outdoor: 'Для улицы',
}

export const COLOR_LABELS: Record<ColorName, string> = {
  Ivory: 'Слоновая кость',
  Sand: 'Песочный',
  Taupe: 'Серо-бежевый',
  Walnut: 'Орех',
  Charcoal: 'Графит',
}

export const MATERIAL_LABELS: Record<string, string> = {
  Oak: 'Дуб',
  Walnut: 'Орех',
  Linen: 'Лён',
  Wool: 'Шерсть',
  Cotton: 'Хлопок',
  Steel: 'Сталь',
  Stone: 'Камень',
  Ceramic: 'Керамика',
  Rattan: 'Ротанг',
}

export const PRESET_LABELS: Record<ShopPreset, string> = {
  sale: 'Распродажа',
  office: 'Для кабинета',
}

export const categoryLabel = (category: Category): string => CATEGORY_LABELS[category]
export const colorLabel = (color: ColorName): string => COLOR_LABELS[color]
export const materialLabel = (material: string): string => MATERIAL_LABELS[material] ?? material
