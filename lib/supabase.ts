import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Store = {
  id: string
  slug: string
  name: string
}

export type Product = {
  id: string
  store_id: string
  name: string
  slug: string
  price: number
  stock: number
}

// Fetch all stores from Supabase
export async function getStores(): Promise<Store[]> {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching stores:', error)
    return []
  }

  return data || []
}
