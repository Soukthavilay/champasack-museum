import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { QRCodeCanvas } from 'qrcode.react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import PageWrapper from '../components/PageWrapper'

const ArtifactPage = () => {
  const { id } = useParams()
  const { lang } = useLanguage()
  const [data, setData] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  useEffect(() => {
    const jsonFile = `${id}${lang === 'en' ? '_en' : '_la'}.json`

    fetch(`/data/${jsonFile}`)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null))
  }, [id, lang])

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center text-gray-600 text-lg">
        {lang === 'la' ? 'ກຳລັງໂຫຼດ...' : 'Loading...'}
      </div>
    )
  }

  const artifactUrl = `${window.location.origin}/artifact/${id}`

  return (
    <PageWrapper>
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      {/* Breadcrumbs & back */}
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <div>
          <Link to="/" className="hover:underline text-indigo-600">
            ← {lang === 'la' ? 'ກັບໄປໜ້າຫຼັກ' : 'Back to Home'}
          </Link>
        </div>
        <div>
          Trang chủ &gt; <span className="text-gray-700 font-semibold">{data.title}</span>
        </div>
      </div>

      {/* Header */}
      <header className="mb-10 border-b pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">{data.title}</h1>
          <LanguageSwitcher />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <span><strong>ID:</strong> {data.id}</span>
          {data.year && (
            <span className="ml-4">
              <strong>{lang === 'la' ? 'ປີທີ່ສ້າງ:' : 'Year:'}</strong> {data.year}
            </span>
          )}
        </div>
      </header>

      {/* Description */}
      <section className="mb-10">
        <p className="text-lg leading-relaxed">{data.description}</p>
      </section>

      {/* History */}
      {data.history && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
            {lang === 'la' ? 'ປະຫວັດສາດ' : 'History'}
          </h2>
          <p className="leading-relaxed whitespace-pre-line text-gray-700">{data.history}</p>
        </section>
      )}

      {/* Images with lightbox */}
      {data.images?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
            {lang === 'la' ? 'ຮູບພາບ' : 'Images'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.images.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => setLightboxIndex(idx)}
              >
                <img src={img} alt={`image ${idx + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>

          {lightboxIndex >= 0 && (
            <Lightbox
              mainSrc={data.images[lightboxIndex]}
              nextSrc={data.images[(lightboxIndex + 1) % data.images.length]}
              prevSrc={data.images[(lightboxIndex + data.images.length - 1) % data.images.length]}
              onCloseRequest={() => setLightboxIndex(-1)}
              onMovePrevRequest={() =>
                setLightboxIndex((lightboxIndex + data.images.length - 1) % data.images.length)
              }
              onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % data.images.length)}
            />
          )}
        </section>
      )}

      {/* Share */}
      <section className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t pt-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{lang === 'la' ? 'ແບ່ງປັນ' : 'Share'}</h3>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(artifactUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Facebook →
          </a>
        </div>
        <div>
          <QRCodeCanvas value={artifactUrl} size={80} />
        </div>
      </section>
    </div>
    </PageWrapper>
  )
}

export default ArtifactPage

const LanguageSwitcher = () => {
  const { lang, switchLanguage } = useLanguage()

  return (
    <div className="space-x-2 text-sm">
      <button
        onClick={() => switchLanguage('la')}
        className={`hover:underline ${lang === 'la' ? 'font-bold text-indigo-700' : ''}`}
      >
        🇱🇦 LA
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`hover:underline ${lang === 'en' ? 'font-bold text-indigo-700' : ''}`}
      >
        🇺🇸 EN
      </button>
    </div>
  )
}
