import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Send, X } from 'lucide-react'
import type { FormEvent } from 'react'

const email = import.meta.env.VITE_CONTACT_EMAIL?.trim() || ''
const whatsapp = import.meta.env.VITE_CONTACT_WHATSAPP?.replace(/\D/g, '') || ''
const hasContact = Boolean(email || whatsapp)

export default function ContactDialog({ initialRole, onClose }: { initialRole: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current!
    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = `Olá, equipe PedalFree!\n\nQuero participar como ${data.get('role')}.\n\nNome: ${data.get('name')}\nOrganização: ${data.get('company')}\nE-mail: ${data.get('email')}\n\n${data.get('message') || 'Gostaria de conhecer o projeto e conversar sobre possibilidades de parceria.'}`
    setMessage(text)
  }

  function download() {
    const url = URL.createObjectURL(new Blob([message], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url; link.download = 'meu-interesse-pedalfree.txt'; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return <dialog ref={dialogRef} className="contact-dialog" aria-labelledby="contact-title" onCancel={onClose} onClick={event => {
    if (event.target === dialogRef.current) {
      const bounds = dialogRef.current.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }
  }}>
    <button className="dialog-close icon-button" onClick={onClose} aria-label="Fechar contato"><X size={22} /></button>
    <span className="eyebrow"><span /> O PRÓXIMO PASSO É JUNTOS</span>
    <h2 id="contact-title">Vamos colocar essa<br />ideia <em>em movimento?</em></h2>
    {!message ? <>
      <p className="dialog-intro">Conte um pouco sobre você e como gostaria de fazer parte do PedalFree.</p>
      <form onSubmit={submit}>
        <label>Quero participar como<select name="role" defaultValue={initialRole}><option value="patrocinador">Patrocinador</option><option value="investidor">Investidor</option><option value="parceiro">Parceiro / apoiador</option></select></label>
        <div className="form-row"><label>Seu nome<input name="name" autoComplete="name" placeholder="Como podemos chamar você?" required maxLength={100} /></label><label>Organização<input name="company" autoComplete="organization" placeholder="Sua empresa ou instituição" required maxLength={120} /></label></div>
        <label>E-mail<input name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" required maxLength={180} /></label>
        <label>Sua ideia <span className="optional">(opcional)</span><textarea name="message" rows={3} maxLength={1500} placeholder="O que você gostaria de construir com a gente?" /></label>
        <p className="privacy-note">Seus dados ficam nesta página até você compartilhar sua apresentação.</p>
        <button className="button button-green full-width" type="submit">Preparar minha apresentação <ArrowUpRight size={19} /></button>
      </form>
    </> : <div className="contact-result">
      <span className="result-check"><Check size={26} /></span>
      <h3>Sua apresentação está pronta.</h3>
      <p>{hasContact ? 'Confira sua mensagem e escolha como enviar para a equipe. O envio acontece pelo seu aplicativo.' : 'Baixe ou copie sua apresentação para compartilhar com a equipe PedalFree. Nenhuma mensagem foi enviada.'}</p>
      <pre>{message}</pre>
      <div className="result-actions">
        {whatsapp && <a className="button button-green" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`}>Abrir WhatsApp <Send size={16} /></a>}
        {email && <a className="button button-green" href={`mailto:${email}?subject=${encodeURIComponent('Quero fazer parte do PedalFree')}&body=${encodeURIComponent(message)}`}>Abrir e-mail <Send size={16} /></a>}
        {!hasContact && <button className="button button-green" onClick={download}>Baixar apresentação <Download size={17} /></button>}
        <button className="button button-outline" onClick={async () => {
          try { await navigator.clipboard.writeText(message); setCopied(true); setCopyError(false) } catch { setCopyError(true) }
        }}>{copied ? 'Copiado!' : 'Copiar mensagem'} {copied ? <Check size={16} /> : <Copy size={16} />}</button>
      </div>
      <p className="privacy-note" role="status">{copyError ? 'Não foi possível copiar automaticamente. Selecione a mensagem acima ou baixe a apresentação.' : copied ? 'Mensagem copiada para a área de transferência.' : ''}</p>
      <button className="text-button" onClick={() => { setMessage(''); setCopied(false); setCopyError(false) }}>Criar outra apresentação</button>
    </div>}
  </dialog>
}
