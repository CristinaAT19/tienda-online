import type { Category, Product } from '../types'

export const CATEGORY_NAMES: Record<Category, string> = {
  cocina: 'Cocina',
  decoracion: 'Decoración',
  textiles: 'Textiles',
  iluminacion: 'Iluminación',
}

// Catálogo de ejemplo: productos y precios ficticios.
export const products: Product[] = [
  {
    id: 'taza-de-gres',
    name: 'Taza de gres',
    category: 'cocina',
    price: 45,
    isNew: true,
    description:
      'Taza torneada a mano con esmalte mate. Cada pieza es ligeramente distinta. Capacidad de 300 ml, apta para lavavajillas y microondas.',
    details: 'Gres cocido a alta temperatura. 8 cm de diámetro y 9 cm de alto. 300 ml.',
    care: 'Apta para lavavajillas y microondas. Evita cambios bruscos de temperatura.',
    colors: [
      { name: 'Arena', hex: '#d9cdb8' },
      { name: 'Gris humo', hex: '#8b9097' },
      { name: 'Azul noche', hex: '#233252' },
    ],
    addedAt: 8,
  },
  {
    id: 'jarron-de-vidrio-soplado',
    name: 'Jarrón de vidrio soplado',
    category: 'decoracion',
    price: 129,
    description:
      'Jarrón de vidrio reciclado soplado a boca, con pequeñas burbujas propias del proceso artesanal.',
    details: 'Vidrio reciclado. 14 cm de diámetro y 26 cm de alto.',
    care: 'Lavar a mano con agua templada y jabón neutro.',
    colors: [
      { name: 'Transparente', hex: '#e6ecee' },
      { name: 'Verde botella', hex: '#4f6b5a' },
    ],
    addedAt: 3,
  },
  {
    id: 'manta-de-lino',
    name: 'Manta de lino',
    category: 'textiles',
    price: 189,
    description:
      'Manta de lino lavado, ligera y transpirable, con flecos en los extremos. Se suaviza con cada lavado.',
    details: '100 % lino europeo. 130 × 180 cm.',
    care: 'Lavar a máquina a 30 °C. No usar secadora.',
    colors: [
      { name: 'Natural', hex: '#d8cfc0' },
      { name: 'Gris piedra', hex: '#9a9c9e' },
    ],
    addedAt: 5,
  },
  {
    id: 'lampara-de-mesa-arco',
    name: 'Lámpara de mesa Arco',
    category: 'iluminacion',
    price: 240,
    isNew: true,
    description:
      'Lámpara de mesa de acero con pantalla orientable y luz cálida regulable. Pensada para el escritorio o la mesilla.',
    details: 'Acero lacado. 38 cm de alto. Bombilla E14 incluida. Cable de 1,8 m.',
    care: 'Limpiar con un paño seco. Desconectar antes de cambiar la bombilla.',
    colors: [
      { name: 'Negro mate', hex: '#22252a' },
      { name: 'Blanco roto', hex: '#ecebe6' },
    ],
    addedAt: 7,
  },
  {
    id: 'cuenco-de-olivo',
    name: 'Cuenco de olivo',
    category: 'cocina',
    price: 78,
    description:
      'Cuenco tallado en una sola pieza de madera de olivo. El veteado hace que no haya dos iguales.',
    details: 'Madera de olivo. 22 cm de diámetro y 7 cm de alto.',
    care: 'Lavar a mano y secar al momento. Hidratar con aceite de vez en cuando.',
    colors: [{ name: 'Olivo natural', hex: '#b08d5b' }],
    addedAt: 2,
  },
  {
    id: 'cojin-de-algodon',
    name: 'Cojín de algodón',
    category: 'textiles',
    price: 65,
    oldPrice: 82,
    description:
      'Cojín de algodón orgánico con tejido en relieve y funda desenfundable con cremallera oculta.',
    details: 'Funda 100 % algodón orgánico. Relleno incluido. 45 × 45 cm.',
    care: 'Funda lavable a máquina a 30 °C.',
    colors: [
      { name: 'Crudo', hex: '#e7e1d5' },
      { name: 'Salvia', hex: '#9aa791' },
      { name: 'Tinta', hex: '#2c3442' },
    ],
    addedAt: 4,
  },
  {
    id: 'portavelas-de-ceramica',
    name: 'Portavelas de cerámica',
    category: 'decoracion',
    price: 39,
    description:
      'Portavelas de cerámica esmaltada para velas de té o velas finas. Da una luz suave a cualquier rincón.',
    details: 'Cerámica esmaltada. 9 cm de diámetro y 6 cm de alto. Vela no incluida.',
    care: 'Retirar los restos de cera con agua caliente.',
    colors: [
      { name: 'Blanco', hex: '#f0eeea' },
      { name: 'Gris humo', hex: '#8b9097' },
    ],
    addedAt: 6,
  },
  {
    id: 'juego-de-4-platos',
    name: 'Juego de 4 platos',
    category: 'cocina',
    price: 156,
    description:
      'Cuatro platos llanos de gres con borde irregular y esmalte reactivo. Resistentes para el uso diario.',
    details: 'Gres. 4 platos de 26 cm de diámetro.',
    care: 'Aptos para lavavajillas y microondas.',
    colors: [
      { name: 'Arena', hex: '#d9cdb8' },
      { name: 'Azul noche', hex: '#233252' },
    ],
    addedAt: 1,
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
