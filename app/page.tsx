'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
type Lang = 'en' | 'uk' | 'ru'
const t: Record<Lang, Record<string, string>> = {
  en: {
    badge: 'AI Landings for Business',
    h1a: 'A landing that', h1b: 'sells', h1c: 'in 3 days',
    sub: 'We create AI landings for entrepreneurs. Fast, beautiful, with a lead form.',
    cta: 'I want a landing',
    c1t: 'In 3 days', c1d: 'Ready landing in 72 hours after payment',
    c2t: 'AI Design', c2d: 'Modern design tailored to your business',
    c3t: 'Leads instantly', c3d: 'Lead capture form from day one',
    formTitle: 'Get in touch', formSub: 'We will contact you within 1 hour',
    namePh: 'Your name', phonePh: 'Phone or Telegram', msgPh: 'Tell us about your business',
    btn: 'Send request', sending: 'Sending...', doneTitle: 'Request received!', doneMsg: 'We will contact you within 1 hour',
  },
  uk: {
    badge: 'AI лендинги для бізнесу',
    h1a: 'Лендинг який', h1b: 'продає', h1c: 'за 3 дні',
    sub: 'Створюємо AI лендинги для підприємців. Швидко, красиво, з формою заявок.',
    cta: 'Хочу лендинг',
    c1t: 'За 3 дні', c1d: 'Готовий лендинг за 72 години після оплати',
    c2t: 'AI дизайн', c2d: 'Сучасний дизайн під ваш бізнес',
    c3t: 'Заявки одразу', c3d: 'Форма збору заявок з першого дня',
    formTitle: 'Залиш заявку', formSub: "Зв'яжемося протягом 1 години",
    namePh: "Ваше ім'я", phonePh: 'Телефон або Telegram', msgPh: 'Розкажіть про ваш бізнес',
    btn: 'Надіслати заявку', sending: 'Надсилаємо...', doneTitle: 'Заявку прийнято!', doneMsg: "Зв'яжемося з вами протягом 1 години",
  },
  ru: {
    badge: 'AI лендинги для бизнеса',
    h1a: 'Лендинг который', h1b: 'продаёт', h1c: 'за 3 дня',
    sub: 'Создаём AI лендинги для предпринимателей. Быстро, красиво, с формой заявок.',
    cta: 'Хочу лендинг',
    c1t: 'За 3 дня', c1d: 'Готовый лендинг за 72 часа после оплаты',
    c2t: 'AI дизайн', c2d: 'Современный дизайн под ваш бизнес',
    c3t: 'Заявки сразу', c3d: 'Форма сбора заявок с первого дня',
    formTitle: 'Оставь заявку', formSub: 'Свяжемся в течение 1 часа',
    namePh: 'Ваше имя', phonePh: 'Телефон или Telegram', msgPh: 'Расскажите о вашем бизнесе',
    btn: 'Отправить заявку', sending: 'Отправляем...', doneTitle: 'Заявка принята!', doneMsg: 'Свяжемся с вами в течение 1 часа',
  },
}
export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, message }) })
const { error } = await res.json()
    if (!error) setSent(true)
    setLoading(false)
  }
  const l = t[lang]
  return (
    <main className="min-h-screen bg-[#050008] text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-30" style={{background:`radial-gradient(600px circle at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.12), transparent 80%)`}} />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-fuchsia-700/10 blur-[120px]" />
      </div>
      <nav className="relative z-20 flex justify-end px-8 pt-6">
        <div className="flex items-center gap-1 border border-white/10 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1">
          {(['en','uk','ru'] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${lang === l ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              {l === 'uk' ? 'UA' : l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center z-10 -mt-16">
        <div className="inline-block border border-purple-500/50 bg-purple-500/10 text-purple-300 text-sm px-4 py-1 rounded-full mb-6 backdrop-blur-sm">
          {l.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight">
          {l.h1a}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">{l.h1b}</span>
          {' '}{l.h1c}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10">{l.sub}</p>
        <a href="#form" className="group relative inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:scale-105">
          {l.cta}
          <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
        </a>
      </section>
      <section className="relative max-w-4xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-6 text-center z-10">
        {[
          { icon: '⚡', title: l.c1t, desc: l.c1d },
          { icon: '🤖', title: l.c2t, desc: l.c2d },
          { icon: '📊', title: l.c3t, desc: l.c3d },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>
      <section id="form" className="relative max-w-lg mx-auto px-4 py-20 z-10">
        <h2 className="text-3xl font-bold text-center mb-2">{l.formTitle}</h2>
        <p className="text-gray-400 text-center mb-8">{l.formSub}</p>
        {sent ? (
          <div className="rounded-2xl p-8 text-center border border-purple-500/50 bg-purple-500/10 backdrop-blur-sm shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">{l.doneTitle}</h3>
            <p className="text-gray-300">{l.doneMsg}</p>
          </div>
        ) : (
          <div className="rounded-2xl p-8 flex flex-col gap-4 border border-white/10 bg-white/5 backdrop-blur-sm">
            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-all duration-300" placeholder={l.namePh} value={name} onChange={(e) => setName(e.target.value)} />
            <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-all duration-300" placeholder={l.phonePh} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition-all duration-300 resize-none" placeholder={l.msgPh} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSubmit} disabled={loading || !name || !phone} className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:scale-[1.02]">
              {loading ? l.sending : l.btn}
            </button>
          </div>
        )}
      </section>
      <footer className="relative text-center text-gray-600 py-8 z-10">2024 AI Landing Agency</footer>
    </main>
  )
}