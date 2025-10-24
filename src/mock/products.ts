export type Product = {
  id: string
  name: string
  flavor: string
  imageUrl: string
  sizeMl: number
  caffeineMg: number
  sugarGr?: number | null
  tags?: string[]
}

export const productsMock: Product[] = [
  {
    id: 'ultra-white-500',
    name: 'Monster Ultra White',
    flavor: 'Citrus',
    imageUrl: 'https://images.unsplash.com/photo-1598133894008-88cbdc47ecdc?q=80&w=400&auto=format&fit=crop',
    sizeMl: 500,
    caffeineMg: 160,
    sugarGr: 0,
    tags: ['ultra', 'zero-sugar']
  },
  {
    id: 'original-green-500',
    name: 'Monster Original',
    flavor: 'Original',
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-5eb1359bd1dc?q=80&w=400&auto=format&fit=crop',
    sizeMl: 500,
    caffeineMg: 160,
    sugarGr: 54,
    tags: ['classic']
  },
  {
    id: 'mango-loco-500',
    name: 'Mango Loco',
    flavor: 'Mango',
    imageUrl: 'https://images.unsplash.com/photo-1613478224020-8b8bfbefb9ac?q=80&w=400&auto=format&fit=crop',
    sizeMl: 500,
    caffeineMg: 150,
    sugarGr: 55,
    tags: ['juice']
  },
]
