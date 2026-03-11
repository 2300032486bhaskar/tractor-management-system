import { useState } from "react"
import { translations } from "../data/translations"
import { services } from "../data/services"
import { contact } from "../data/contact"

export default function Home() {
  const [lang, setLang] = useState("en")
  const t = translations[lang]

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">🚜 Tractor Services</h1>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setLang(lang === "en" ? "te" : "en")}
            className="bg-white text-green-700 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100"
          >
            {lang === "en" ? "తెలుగు" : "English"}
          </button>

          <a
            href="/login"
            className="bg-white text-green-700 px-4 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Admin Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-green-700 text-white text-center py-12 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {t.title}
        </h1>
        <p className="text-lg opacity-90">
          {t.subtitle}
        </p>
      </section>

      {/* Intro */}
      <section className="text-center py-10 px-6">
        <h2 className="text-2xl font-semibold text-green-800 mb-2">
          {t.heading}
        </h2>

        <p className="text-gray-700 max-w-2xl mx-auto">
          {t.description}
        </p>
      </section>

      {/* Services */}
      <section className="py-10 px-6 bg-white">
        <h3 className="text-2xl font-bold text-green-700 text-center mb-8">
          {lang === "en" ? "Our Services" : "మా సేవలు"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services[lang].map((service, index) => (
            <div
              key={index}
              className="bg-green-50 border rounded-lg p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h4 className="font-semibold text-lg text-green-800 mb-1">
                {service.name}
              </h4>

              <p className="text-gray-600 text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-green-700 text-white text-center py-12 px-6">
        <h3 className="text-2xl font-bold mb-3">
          {lang === "en" ? "Contact Us" : "సంప్రదించండి"}
        </h3>

        <p className="mb-6">
          {lang === "en"
            ? "Call us or WhatsApp for tractor services"
            : "ట్రాక్టర్ సేవల కోసం కాల్ చేయండి లేదా వాట్సాప్ చేయండి"}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">

          <a
            href={`tel:${contact.phone}`}
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            📞 {lang === "en" ? "Call Now" : "కాల్ చేయండి"}
          </a>

          <a
            href={`https://wa.me/91${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
          >
            💬 WhatsApp
          </a>

        </div>

        <p className="text-sm opacity-90">
          📍 {contact.location}
        </p>
      </section>

    </div>
  )
}