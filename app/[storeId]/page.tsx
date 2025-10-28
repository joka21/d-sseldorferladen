import { supabase, type Product, type Store } from '@/lib/supabase'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ storeId: string }>
}

async function getStoreAndProducts(storeSlug: string) {
  // Fetch store by slug
  const { data: store, error: storeError } = await supabase
    .from('stores')
    .select('*')
    .eq('slug', storeSlug)
    .single()

  if (storeError || !store) {
    return null
  }

  // Fetch products for this store
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id)
    .order('name')

  if (productsError) {
    console.error('Error fetching products:', productsError)
    return { store, products: [] }
  }

  return { store, products: products || [] }
}

export default async function StorePage({ params }: Props) {
  const { storeId } = await params
  const data = await getStoreAndProducts(storeId)

  if (!data) {
    notFound()
  }

  const { store, products } = data

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Store Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {store.name}
          </h1>
          <p className="text-gray-600">
            Browse our collection of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm ${
                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
