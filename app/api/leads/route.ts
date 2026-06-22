import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: NextRequest) {
  const { name, phone, message } = await req.json()
  const { error } = await supabase.from('leads').insert([{ name, phone, message }])
  if (error) return NextResponse.json({ error }, { status: 500 })
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: `New lead!\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`,
    }),
  })
  return NextResponse.json({ success: true })
}