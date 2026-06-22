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
    c1t: 'In 3 days', c1d: 'Ready in 72 hours',
    c2t: 'AI Design', c2d: 'Tailored to your business',
    c3t: 'Leads instantly', c3d: 'Lead form from day one',
    c4t: 'Secure', c4d: 'SSL + Vercel',
    c5t: 'Mobile ready', c5d: 'All devices',
    pricing: 'Pricing', pricingSub: 'No hidden fees',
    p1f1: '1 page', p1f2: 'Lead form', p1f3: '1 revision', p1f4: '3 days',
    p2f1: '1 page', p2f2: 'Lead form', p2f3: '3 revisions', p2f4: '3 days',
    p3f1: '3 pages', p3f2: 'Lead form', p3f3: 'Unlimited revisions', p3f4: '5 days',
    popular: 'Popular',
    reviews: 'What clients say', reviewsSub: 'Real results from real businesses',
    formTitle: 'Get in touch', formSub: 'We will contact you within 24 hours',
    namePh: 'Your name', phonePh: 'Phone or Telegram', msgPh: 'Tell us about your business',
    btn: 'Send request', sending: 'Sending...', doneTitle: 'Request received!', doneMsg: 'We will contact you within 24 hours',
  },
  uk: {
    badge: 'AI лендинги для бізнесу',
    h1a: 'Лендинг який', h1b: 'продає', h1c: 'за 3 дні',
    sub: 'Створюємо AI лендинги для підприємців. Швидко, красиво, з формою заявок.',
    cta: 'Хочу лендинг',
    c1t: 'За 3 дні', c1d: 'Готовий за 72 години',
    c2t: 'AI дизайн', c2d: 'Під ваш бізнес',
    c3t: 'Заявки одразу', c3d: 'Форма з першого дня',
    c4t: 'Безпечно', c4d: 'SSL + Vercel',
    c5t: 'Мобільний', c5d: 'Всі пристрої',
    pricing: 'Ціни', pricingSub: 'Без прихованих платежів',
    p1f1: '1 сторінка', p1f2: 'Форма заявок', p1f3: '1 правка', p1f4: '3 дні',
    p2f1: '1 сторінка', p2f2: 'Форма заявок', p2f3: '3 правки', p2f4: '3 дні',
    p3f1: '3 сторінки', p3f2: 'Форма заявок', p3f3: 'Безліміт правок', p3f4: '5 днів',
    popular: 'Популярний',
    reviews: 'Що кажуть клієнти', reviewsSub: 'Реальні результати',
    formTitle: 'Залиш заявку', formSub: "Зв'яжемося протягом 24 годин",
    namePh: "Ваше ім'я", phonePh: 'Телефон або Telegram', msgPh: 'Розкажіть про ваш бізнес',
    btn: 'Надіслати заявку', sending: 'Надсилаємо...', doneTitle: 'Заявку прийнято!', doneMsg: "Зв'яжемося з вами протягом 24 годин",
  },
  ru: {
    badge: 'AI лендинги для бизнеса',
    h1a: 'Лендинг который', h1b: 'продаёт', h1c: 'за 3 дня',
    sub: 'Создаём AI лендинги для предпринимателей. Быстро, красиво, с формой заявок.',
    cta: 'Хочу лендинг',
    c1t: 'За 3 дня', c1d: 'Готовый за 72 часа',
    c2t: 'AI дизайн', c2d: 'Под ваш бизнес',
    c3t: 'Заявки сразу', c3d: 'Форма с первого дня',
    c4t: 'Безопасно', c4d: 'SSL + Vercel',
    c5t: 'Мобильный', c5d: 'Все устройства',
    pricing: 'Цены', pricingSub: 'Без скрытых платежей',
    p1f1: '1 страница', p1f2: 'Форма заявок', p1f3: '1 правка', p1f4: '3 дня',
    p2f1: '1 страница', p2f2: 'Форма заявок', p2f3: '3 правки', p2f4: '3 дня',
    p3f1: '3 страницы', p3f2: 'Форма заявок', p3f3: 'Безлимит правок', p3f4: '5 дней',
    popular: 'Популярный',
    reviews: 'Что говорят клиенты', reviewsSub: 'Реальные результаты',
    formTitle: 'Оставь заявку', formSub: 'Свяжемся в течение 24 часов',
    namePh: 'Ваше имя', phonePh: 'Телефон или Telegram', msgPh: 'Расскажите о вашем бизнесе',
    btn: 'Отправить заявку', sending: 'Отправляем...', doneTitle: 'Заявка принята!', doneMsg: 'Свяжемся с вами в течение 24 часов',
  },
}
const BUBBLES = [
  { icon: '⚡', key: 'c1t', dkey: 'c1d', size: 150, top: '12%', left: '8%', right: 'auto', bottom: 'auto', anim: 'float1', delay: '0s', z: 8 },
  { icon: '🤖', key: 'c2t', dkey: 'c2d', size: 185, top: '52%', left: '8%', right: 'auto', bottom: 'auto', anim: 'float2', delay: '1.5s', z: 20 },
  { icon: '📊', key: 'c3t', dkey: 'c3d', size: 155, top: '10%', left: '70%', right: 'auto', bottom: 'auto', anim: 'float3', delay: '0.8s', z: 8 },
  { icon: '🔒', key: 'c4t', dkey: 'c4d', size: 145, top: '55%', left: '72%', right: 'auto', bottom: 'auto', anim: 'float4', delay: '2s', z: 20 },
  { icon: '📱', key: 'c5t', dkey: 'c5d', size: 130, top: '5%', left: '44%', right: 'auto', bottom: 'auto', anim: 'float5', delay: '1.2s', z: 8 },
]
const REVIEWS = [
  { name: 'Alex M.', biz: 'Bean & Go coffee shop', text: 'Ordered a landing for my coffee shop — got it in 3 days. First week brought 12 delivery leads.', color: '#f97316' },
  { name: 'Inna V.', biz: 'Fitness trainer', text: 'Was hesitant to make a website. Turned out simple — in 3 days I was already showing it to clients.', color: '#ec4899' },
  { name: 'Serhiy D.', biz: 'Auto service', text: 'Thought it would be expensive and slow. Came out $89 and 3 days. Now clients find us on Google.', color: '#3b82f6' },
]
export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
useEffect(() => {}, [])
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
  const allReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS]
  return (
    <main className="min-h-screen bg-[#050008] text-white">
      <style>{`
        @keyframes float1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-16px) scale(1)}}
        @keyframes float2{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-12px) scale(1)}}
        @keyframes float3{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-18px) scale(1)}}
        @keyframes float4{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-14px) scale(1)}}
        @keyframes float5{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-15px) scale(1)}}
        .bubble{transition:box-shadow 0.3s ease,border-color 0.3s ease,background 0.3s ease,filter 0.3s ease}
        .bubble:hover{animation-play-state:paused!important;filter:brightness(1.8) drop-shadow(0 0 20px rgba(139,92,246,0.8))!important;border-color:rgba(139,92,246,0.7)!important}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .marquee-inner{display:flex;width:max-content;animation:marquee 25s linear infinite}
        .marquee-inner:hover{animation-play-state:paused}
      `}</style>
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-10" src="/bg.mp4" />
      <div className="pointer-events-none fixed inset-0 z-30" style={{background:`radial-gradient(250px circle at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.04), transparent 80%)`}} />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-fuchsia-700/10 blur-[120px]" />
      </div>
      <nav className="fixed top-10 right-4 z-50">
        <div className="flex items-center gap-1 border border-white/10 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
          {(['en','uk','ru'] as Lang[]).map((code) => (
            <button key={code} onClick={() => setLang(code)} className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${lang===code?'bg-purple-600 text-white':'text-gray-400 hover:text-white'}`}>
              {code==='uk'?'UA':code.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-40 overflow-hidden" style={{height:'36px'}}>
  <style>{`
    @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    .ticker-track{display:flex;width:max-content;animation:ticker 30s linear infinite;will-change:transform}
  `}</style>
  <div className="ticker-track h-full items-center flex">
    {[...Array(6)].map((_, copy) => (
      <div key={copy} className="flex items-center">
        {['Next.js','Vercel','Supabase','Tailwind CSS','TypeScript','React','Node.js','PostgreSQL'].map((tech, i) => (
          <span key={i} className="flex items-center">
            <span className="text-gray-500 text-xs font-medium tracking-widest uppercase whitespace-nowrap px-6" style={{opacity:0.7}}>{tech}</span>
            <span className="text-purple-800 text-xs">◆</span>
          </span>
        ))}
      </div>
    ))}
  </div>
</div>
        {BUBBLES.map((b, i) => (
          <div key={b.key} className="bubble absolute flex flex-col items-center justify-center text-center cursor-default select-none rounded-full"
            style={{
              width: b.size, height: b.size,
              top: b.top, left: b.left, right: b.right, bottom: b.bottom,
              animation: `${b.anim} ${6+i}s ease-in-out infinite`,
              animationDelay: b.delay,
              background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.18), rgba(60,20,100,0.1))',
              border: '1px solid rgba(139,92,246,0.25)',
              backdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 25px rgba(139,92,246,0.12)',
              padding: b.size * 0.12,
              zIndex: b.z,
            }}
          >
            <div style={{fontSize: b.size * 0.2}} className="mb-1">{b.icon}</div>
            <div className="text-xs font-semibold text-white/80">{l[b.key as keyof typeof l]}</div>
            <div className="text-xs text-purple-300/50 mt-0.5 leading-tight">{l[b.dkey as keyof typeof l]}</div>
          </div>
        ))}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="inline-block border border-purple-500/50 bg-purple-500/10 text-purple-300 text-sm px-4 py-1 rounded-full mb-6 backdrop-blur-sm">{l.badge}</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-3xl leading-tight">
            {l.h1a}{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">{l.h1b}</span>{' '}{l.h1c}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10">{l.sub}</p>
          <a href="#form" className="group relative inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] hover:scale-105">
            {l.cta}<span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </a>
        </div>
      </section>
      <section className="relative max-w-4xl mx-auto px-4 py-20 z-10">
        <h2 className="text-3xl font-bold text-center mb-2">{l.pricing}</h2>
        <p className="text-gray-400 text-center mb-12">{l.pricingSub}</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="text-4xl font-bold mb-1">$49</div>
            <div className="text-gray-400 text-sm mb-6">one time</div>
            {[l.p1f1,l.p1f2,l.p1f3,l.p1f4].map((f) => <div key={f} className="flex items-center gap-2 text-sm text-gray-300 mb-2"><span className="text-purple-400">✓</span>{f}</div>)}
            <a href="#form" className="mt-6 block text-center bg-white/10 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">Choose</a>
          </div>
          <div className="rounded-2xl p-6 border border-purple-500/50 bg-purple-500/10 backdrop-blur-sm relative hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">{l.popular}</div>
            <div className="text-4xl font-bold mb-1">$89</div>
            <div className="text-gray-400 text-sm mb-6">one time</div>
            {[l.p2f1,l.p2f2,l.p2f3,l.p2f4].map((f) => <div key={f} className="flex items-center gap-2 text-sm text-gray-300 mb-2"><span className="text-purple-400">✓</span>{f}</div>)}
            <a href="#form" className="mt-6 block text-center bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">Choose</a>
          </div>
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="text-4xl font-bold mb-1">$149</div>
            <div className="text-gray-400 text-sm mb-6">one time</div>
            {[l.p3f1,l.p3f2,l.p3f3,l.p3f4].map((f) => <div key={f} className="flex items-center gap-2 text-sm text-gray-300 mb-2"><span className="text-purple-400">✓</span>{f}</div>)}
            <a href="#form" className="mt-6 block text-center bg-white/10 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">Choose</a>
          </div>
        </div>
      </section>
      <section className="relative py-20 z-10">
        <h2 className="text-3xl font-bold text-center mb-2">{l.reviews}</h2>
        <p className="text-gray-400 text-center mb-12">{l.reviewsSub}</p>
        <div style={{overflow:'hidden'}}>
          <div className="marquee-inner">
            {allReviews.map((r, i) => (
              <div key={i} style={{width:'300px',flexShrink:0,marginRight:'24px'}} className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div style={{width:36,height:36,borderRadius:'50%',background:r.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:'bold',fontSize:14,flexShrink:0}}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{r.name}</div>
                    <div className="text-xs text-gray-500">{r.biz}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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