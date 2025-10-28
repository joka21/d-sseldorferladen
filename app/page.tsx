import Link from 'next/link'
import { getStores } from '@/lib/supabase'

export default async function Home() {
  const stores = await getStores()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Airbnb Style */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-purple-400 to-indigo-500"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Entdecken Sie Düsseldorf
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Einzigartige Geschäfte für jeden Geschmack
          </p>

          {/* Search Bar - Airbnb Style */}
          <div className="bg-white rounded-full shadow-2xl p-2 max-w-2xl mx-auto flex items-center">
            <input
              type="text"
              placeholder="Was suchen Sie?"
              className="flex-1 px-6 py-3 rounded-full focus:outline-none text-gray-700"
            />
            <button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-3 font-semibold transition-colors">
              Suchen
            </button>
          </div>
        </div>
      </div>

      {/* Stores Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Unsere Geschäfte
          </h2>
          <p className="text-gray-600 text-lg">
            Stöbern Sie durch unsere einzigartigen Spezialgeschäfte
          </p>
        </div>

        {/* Stores Grid - Airbnb Card Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/${store.slug}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Placeholder for store image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-6xl">
                    {getStoreEmoji(store.slug)}
                  </span>
                </div>
              </div>

              <div className="px-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                  {store.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  Düsseldorf
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* No Stores Message */}
        {stores.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Noch keine Geschäfte verfügbar
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bereit zum Einkaufen?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Wählen Sie eines unserer Geschäfte und entdecken Sie unser Sortiment
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper function to assign emojis to stores
function getStoreEmoji(slug: string): string {
  const emojiMap: Record<string, string> = {
    'buecherladen': '📚',
    'kaffeeladen': '☕',
    'fairtrade': '🌍',
    'kulturladen': '🎨',
    'gebaeckladen': '🥐',
    'kleiderladen': '👕',
    'hundeladen': '🐕',
    'biofleisch': '🥩',
    'weinladen': '🍷',
    'blumenladen': '🌸',
  }
  return emojiMap[slug] || '🏪'
}
