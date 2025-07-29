import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import PageWrapper from '../components/PageWrapper'

const base = import.meta.env.BASE_URL

const artifactFiles = {
  artifact_001: {
    la: `${base}data/artifact_001_la.json`,
    en: `${base}data/artifact_001_en.json`,
  }
}

const Home = () => {
  const { lang, switchLanguage } = useLanguage()
  const [artifacts, setArtifacts] = useState([])

  useEffect(() => {
    const fetchArtifact = async () => {
      const file = artifactFiles['artifact_001'][lang]
      try {
        const res = await fetch(file)
        const data = await res.json()
        setArtifacts([data])
      } catch {
        setArtifacts([])
      }
    }
    fetchArtifact()
  }, [lang])

  return (
    <PageWrapper>
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">
          {lang === 'la' ? 'ຂອງສະແດງໃນພິພິດທະພັນ' : 'Exhibition Artifacts'}
        </h1>
        <LanguageSwitcher lang={lang} switchLanguage={switchLanguage} />
      </div>

      {/* Artifact Card List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {artifacts.map(a => (
          <Link
            key={a.id}
            to={`/champasack-museum/artifact/${a.id}`}
            className="group rounded-2xl border shadow hover:shadow-lg transition-all duration-200 bg-white overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={a.images?.[0]}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                {a.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3">{a.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </PageWrapper>
  )
}

export default Home

const LanguageSwitcher = ({ lang, switchLanguage }) => (
  <div className="space-x-2 text-sm">
    <button
      onClick={() => switchLanguage('la')}
      className={`hover:underline ${lang === 'la' ? 'font-bold text-indigo-600' : ''}`}
    >
      🇱🇦 LA
    </button>
    <button
      onClick={() => switchLanguage('en')}
      className={`hover:underline ${lang === 'en' ? 'font-bold text-indigo-600' : ''}`}
    >
      🇺🇸 EN
    </button>
  </div>
)
