import React, { useMemo, useState } from 'react'

type Page = 'home' | 'map' | 'detail' | 'news' | 'login' | 'dashboard' | 'publish' | 'admin'
type EventItem = {
  id: number; title: string; category: string; day: string; month: string
  date: string; time: string; place: string; address: string; description: string
  color: string; x: number; y: number; organizer: string
}

const events: EventItem[] = [
  { id: 1, title: 'Audiência pública sobre mobilidade urbana', category: 'Audiência pública', day: '28', month: 'NOV', date: '28 de novembro de 2026', time: '18h30', place: 'Câmara Municipal de São Paulo', address: 'Viaduto Jacareí, 100 — Bela Vista, São Paulo', description: 'Encontro aberto à população para debater propostas de mobilidade urbana, transporte público e melhorias na circulação da cidade.', color: '#1768dc', x: 48, y: 37, organizer: 'Comissão de Política Urbana' },
  { id: 2, title: 'Manifestação por melhorias no transporte', category: 'Manifestação', day: '30', month: 'NOV', date: '30 de novembro de 2026', time: '14h00', place: 'Avenida Paulista', address: 'Avenida Paulista, São Paulo — SP', description: 'Ato público organizado para discutir a qualidade do transporte coletivo e apresentar reivindicações relacionadas à mobilidade.', color: '#e23d46', x: 62, y: 56, organizer: 'Organização da sociedade civil' },
  { id: 3, title: 'Debate sobre políticas de educação', category: 'Debate', day: '02', month: 'DEZ', date: '2 de dezembro de 2026', time: '19h00', place: 'Centro Cultural São Paulo', address: 'Rua Vergueiro, 1000 — Paraíso, São Paulo', description: 'Debate público sobre políticas educacionais, acesso à escola e participação da comunidade nas decisões públicas.', color: '#d49b00', x: 29, y: 67, organizer: 'Fórum de Educação' },
  { id: 4, title: 'Reunião aberta do conselho municipal', category: 'Reunião política', day: '05', month: 'DEZ', date: '5 de dezembro de 2026', time: '10h00', place: 'Centro de São Paulo', address: 'Praça da Sé — Centro, São Paulo', description: 'Reunião aberta para acompanhamento de pautas e discussão de propostas de interesse municipal.', color: '#1768dc', x: 72, y: 25, organizer: 'Conselho Municipal' },
]

const news = [
  { id: 1, type: 'Política', title: 'Câmara debate propostas para mobilidade urbana', excerpt: 'Audiência pública abre espaço para participação da população nas discussões sobre transporte e circulação.', source: 'Portal de notícias', date: '24 nov. 2026', style: 'hall' },
  { id: 2, type: 'Sociedade', title: 'Participação cidadã ganha espaço nas decisões locais', excerpt: 'Iniciativas de consulta pública aproximam moradores dos processos de decisão municipal.', source: 'Agência de informação', date: '22 nov. 2026', style: 'meeting' },
  { id: 3, type: 'Política', title: 'Entenda como acompanhar sessões e audiências públicas', excerpt: 'Veja onde encontrar informações oficiais sobre reuniões, debates e sessões abertas.', source: 'Jornal público', date: '20 nov. 2026', style: 'data' },
  { id: 4, type: 'Transparência', title: 'Transparência pública: por que acompanhar os atos políticos?', excerpt: 'O acesso à informação é uma ferramenta importante para o exercício da cidadania.', source: 'Observatório cívico', date: '18 nov. 2026', style: 'access' },
  { id: 5, type: 'Sociedade', title: 'Conselhos municipais divulgam calendário de reuniões', excerpt: 'Encontros permitem que a sociedade acompanhe temas relevantes para a cidade.', source: 'Portal institucional', date: '16 nov. 2026', style: 'budget' },
  { id: 6, type: 'Política', title: 'Como funciona a participação em consultas públicas', excerpt: 'Conheça etapas comuns de uma consulta e como enviar contribuições.', source: 'Agência de informação', date: '14 nov. 2026', style: 'hall' },
]

function Logo({ onClick }: { onClick?: () => void }) {
  return <button className="logo" onClick={onClick} aria-label="PolitiZA, página inicial">
    <span className="logo-mark">P<i /></span>
    <strong><span>Politi</span><b>ZA</b>!</strong>
  </button>
}

function MapVisual({ compact = false, selected, onSelect }: { compact?: boolean; selected?: number; onSelect?: (id: number) => void }) {
  return <div className={`map-visual ${compact ? 'compact' : ''}`}>
    <div className="river" /><div className="park park-one" /><div className="park park-two" />
    <span className="map-label l1">CENTRO</span><span className="map-label l2">BELA VISTA</span><span className="map-label l3">PARAÍSO</span><span className="map-label l4">PINHEIROS</span>
    {events.map(e => <button key={e.id} className={`map-pin ${selected === e.id ? 'selected' : ''}`} style={{ left: `${e.x}%`, top: `${e.y}%`, ['--pin' as any]: e.color }} onClick={() => onSelect?.(e.id)} title={e.title}>
      <svg width="31" height="38" viewBox="0 0 31 38" aria-hidden="true"><path d="M15.5 1C7.5 1 1 7.4 1 15.3c0 10.1 14.5 21.7 14.5 21.7S30 25.4 30 15.3C30 7.4 23.5 1 15.5 1Z"/><circle cx="15.5" cy="15" r="5"/></svg>
    </button>)}
    <div className="map-controls"><button type="button">+</button><button type="button">−</button></div>
    <span className="map-key">Mapa ilustrativo • São Paulo</span>
  </div>
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(1)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas as categorias')
  const [newsFilter, setNewsFilter] = useState('Todas')
  const [modalNews, setModalNews] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)
  const [published, setPublished] = useState(false)
  const [requestStatus, setRequestStatus] = useState<'Pendente' | 'Aprovada' | 'Rejeitada'>('Pendente')
  const [fontLarge, setFontLarge] = useState(false)

  const selectedEvent = events.find(e => e.id === selectedId) || events[0]
  const filteredEvents = useMemo(() => events.filter(e =>
    (category === 'Todas as categorias' || e.category === category) &&
    `${e.title} ${e.place} ${e.address}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query])
  const filteredNews = news.filter(n => (newsFilter === 'Todas' || n.type === newsFilter) && `${n.title} ${n.excerpt}`.toLowerCase().includes(query.toLowerCase()))

  const go = (next: Page) => { setPage(next); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const showDetails = (id: number) => { setSelectedId(id); go('detail') }
  const login = (e: React.FormEvent) => { e.preventDefault(); setLogged(true); go('dashboard') }

  const nav = <nav className={`nav ${mobileOpen ? 'open' : ''}`}>
    <button className={page === 'home' ? 'active' : ''} onClick={() => go('home')}>Início</button>
    <button className={page === 'map' || page === 'detail' ? 'active' : ''} onClick={() => go('map')}>Mapa de Atos</button>
    <button className={page === 'news' ? 'active' : ''} onClick={() => go('news')}>Notícias</button>
    <button className="mobile-login" onClick={() => go(logged ? 'dashboard' : 'login')}>{logged ? 'Minha área' : 'Entrar'}</button>
  </nav>

  return <div className={`app ${fontLarge ? 'large-text' : ''}`}>
    <header className="topbar"><div className="shell header-inner">
      <Logo onClick={() => go('home')} />{nav}
      <div className="header-actions">
        <button className="accessibility" onClick={() => setFontLarge(v => !v)} title="Aumentar ou restaurar fonte">Acessibilidade <span>A+</span></button>
        <button className="btn btn-yellow login-btn" onClick={() => go(logged ? 'dashboard' : 'login')}>{logged ? 'Minha área' : 'Entrar'}</button>
        <button className="menu-btn" onClick={() => setMobileOpen(v => !v)} aria-label="Abrir menu">☰</button>
      </div>
    </div></header>

    {page === 'home' && <>
      <section className="hero"><div className="hero-grid-pattern" /><div className="shell hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker"><span /> INFORMAÇÃO E PARTICIPAÇÃO CIDADÃ</div>
          <h1>A política acontece <em>perto de você.</em></h1>
          <p className="hero-text">Descubra manifestações, audiências públicas, reuniões e outros acontecimentos políticos na sua região. Informação para participar, acompanhar e exercer sua cidadania.</p>
          <div className="hero-actions"><button className="btn btn-yellow" onClick={() => go('map')}>⌖ Explorar mapa</button><button className="btn btn-light" onClick={() => go('news')}>Acessar notícias →</button></div>
          <div className="trust-row"><span>✓ Informação acessível</span><span>✓ Plataforma informativa</span><span>✓ Neutralidade política</span></div>
        </div>
        <div className="hero-map"><div className="map-top"><span>⌖ Atos políticos em São Paulo</span><button onClick={() => go('map')}>Ver mapa completo ↗</button></div><MapVisual compact selected={selectedId} onSelect={setSelectedId}/><div className="floating-event"><span className="pulse" /><div><span>PRÓXIMO EVENTO</span><strong>{events[0].title}</strong><small>28 nov. • 18h30 • Centro</small></div><button className="text-link" onClick={() => showDetails(1)}>Ver →</button></div></div>
      </div><div className="shell hero-stat"><span><strong>Atos políticos</strong> em um só lugar</span><i/><span><strong>Informação</strong> para todos</span><i/><span><strong>Participação</strong> cidadã</span></div></section>
      <section className="section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">COMO FUNCIONA</span><h2>Fique por dentro do que acontece.</h2><p>O PolitiZA! facilita o acesso a informações sobre eventos políticos e oportunidades de participação.</p></div>
        <div className="steps"><div className="step"><div className="step-icon">⌖<span>01</span></div><h3>Encontre</h3><p>Explore o mapa e descubra atos políticos próximos ou pesquise por uma região.</p><div className="step-line"/></div><div className="step"><div className="step-icon">▤<span>02</span></div><h3>Informe-se</h3><p>Consulte data, horário, local e detalhes de cada acontecimento.</p><div className="step-line"/></div><div className="step"><div className="step-icon">◎<span>03</span></div><h3>Participe</h3><p>Acompanhe notícias e encontre oportunidades para exercer sua cidadania.</p></div></div>
      </div></section>
      <section className="section events-section"><div className="shell"><div className="section-row"><div className="section-heading"><span className="eyebrow">AGENDA CIDADÃ</span><h2>Atos em destaque</h2><p>Confira alguns dos próximos acontecimentos cadastrados na plataforma.</p></div><button className="text-link" onClick={() => go('map')}>Ver todos os atos →</button></div>
        <div className="event-grid">{events.slice(0,3).map(e => <EventCard key={e.id} event={e} onClick={() => showDetails(e.id)}/>)}</div>
      </div></section>
      <section className="section news-section"><div className="shell"><div className="section-row"><div className="section-heading"><span className="eyebrow">INFORMAÇÃO</span><h2>Notícias e contexto</h2><p>Acompanhe conteúdos informativos e acesse as fontes originais.</p></div><button className="text-link" onClick={() => go('news')}>Ver notícias →</button></div><div className="news-grid home-news">{news.slice(0,3).map(n => <NewsCard key={n.id} item={n} onClick={() => setModalNews(n.id)}/>)}</div></div></section>
      <section className="cta"><div className="shell cta-inner"><div className="cta-icon">✦</div><div><h2>Conhecer a política também é participar.</h2><p>Explore os acontecimentos e encontre informações perto de você.</p></div><button className="btn btn-yellow" onClick={() => go('map')}>Explorar o mapa →</button></div></section>
      <Footer go={go}/>
    </>}

    {page === 'map' && <div className="map-page">
      <aside className="map-sidebar"><div className="map-sidebar-head"><h1>Mapa de atos políticos</h1><p>Encontre acontecimentos políticos em São Paulo.</p></div>
        <div className="search-box">⌕<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar local ou acontecimento"/><button onClick={() => setQuery(query.trim())}>Buscar</button></div>
        <button className="location-button" onClick={() => alert('Para usar sua localização, permita o acesso quando o navegador solicitar. Você também pode pesquisar um endereço manualmente.')}>⌖ Usar minha localização</button><p className="privacy-note">ⓘ Sua localização é usada somente para encontrar atos próximos.</p>
        <div className="filter-title"><strong>⚙ Filtros</strong><button onClick={() => {setCategory('Todas as categorias');setQuery('')}}>Limpar filtros</button></div>
        <label className="field-label">Categoria<select value={category} onChange={e => setCategory(e.target.value)}><option>Todas as categorias</option>{['Manifestação','Audiência pública','Reunião política','Debate'].map(x => <option key={x}>{x}</option>)}</select></label>
        <div className="result-title"><strong>Atos encontrados</strong><span>{filteredEvents.length} resultados</span></div>
        <div className="map-results">{filteredEvents.map(e => <button className={`result ${selectedId === e.id ? 'active' : ''}`} key={e.id} onClick={() => setSelectedId(e.id)}><span className="result-dot" style={{background:e.color}}/><div><small>{e.category}</small><strong>{e.title}</strong><span>{e.date} • {e.place}</span></div><b>›</b></button>)}</div>
      </aside><main className="map-main"><MapVisual selected={selectedId} onSelect={setSelectedId}/>{selectedEvent && <div className="map-popup"><button className="popup-close" onClick={() => setSelectedId(0)}>×</button><span className="tag">{selectedEvent.category}</span><h3>{selectedEvent.title}</h3><p>◷ {selectedEvent.date} • {selectedEvent.time}</p><p>⌖ {selectedEvent.place}</p><button className="btn btn-primary" onClick={() => showDetails(selectedEvent.id)}>Ver detalhes do ato →</button></div>}</main>
    </div>}

    {page === 'detail' && <main className="subpage"><div className="shell"><button className="back-link" onClick={() => go('map')}>← Voltar ao mapa</button><div className="detail-hero"><div><span className="tag light-tag">{selectedEvent.category}</span><h1>{selectedEvent.title}</h1><p>Informações para acompanhar e participar dos acontecimentos da cidade.</p></div><span className="verified">✓ Informações do evento</span></div><div className="detail-layout"><div className="detail-main"><div className="card detail-summary"><div>◷<span>DATA E HORÁRIO<strong>{selectedEvent.date}<small>{selectedEvent.time}</small></strong></span></div><div>⌖<span>LOCAL<strong>{selectedEvent.place}</strong></span></div><div>⌂<span>ENDEREÇO<strong>{selectedEvent.address}</strong></span></div></div><div className="card prose-card"><h2>Sobre o evento</h2><p>{selectedEvent.description}</p><div className="neutral-note"><span>ⓘ</span><p><strong>Informação e neutralidade</strong>O PolitiZA! disponibiliza informações para consulta pública e não apoia organizações, partidos ou posicionamentos políticos.</p></div></div><div className="card map-detail"><div className="card-title-row"><div><h2>Localização</h2><p>{selectedEvent.address}</p></div><button onClick={() => go('map')}>Ver no mapa ↗</button></div><MapVisual compact selected={selectedEvent.id}/></div></div><aside className="detail-aside"><div className="card organizer"><h3>Organização responsável</h3><div className="org-mark">PZ</div><strong>{selectedEvent.organizer}</strong><span>Informação declarada no evento</span><div className="divider"/><p>ⓘ Consulte a fonte responsável para confirmar eventuais atualizações.</p></div><div className="card share"><h3>Compartilhe informação</h3><p>Ajude outras pessoas a conhecerem este acontecimento.</p><button className="btn btn-secondary" onClick={() => navigator.clipboard?.writeText(window.location.href)}>↗ Copiar link</button></div></aside></div></div></main>}

    {page === 'news' && <><section className="page-banner"><div className="shell"><span className="eyebrow">INFORMAÇÃO E CIDADANIA</span><h1>Notícias políticas</h1><p>Acompanhe assuntos de interesse público e consulte as fontes originais das publicações.</p></div></section><main className="subpage"><div className="shell"><div className="news-toolbar"><div className="search-box">⌕<input placeholder="Buscar notícia..." value={query} onChange={e => setQuery(e.target.value)}/></div><div className="chip-row">{['Todas','Política','Sociedade','Transparência'].map(f => <button className={newsFilter===f?'active':''} key={f} onClick={() => setNewsFilter(f)}>{f}</button>)}</div></div><div className="news-grid full-news">{filteredNews.map(n => <NewsCard key={n.id} item={n} onClick={() => setModalNews(n.id)}/>)}</div></div></main><Footer go={go}/></>}

    {page === 'login' && <div className="auth-page"><section className="auth-side"><Logo onClick={() => go('home')}/><div><span className="eyebrow yellow">BEM-VINDO AO POLITIZA!</span><h1>Acompanhe. Informe-se. <span className="yellow">Participe.</span></h1><p>Entre na plataforma para acessar sua área e acompanhar suas atividades.</p><blockquote>“Informação pública fortalece a participação cidadã.”</blockquote></div></section><section className="auth-form-wrap"><div className="auth-card"><div className="auth-icon">♙</div><h2>Entrar na sua conta</h2><p>Acesse sua conta PolitiZA!</p><form onSubmit={login}><label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com" required/></label><label>Senha<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Digite sua senha" required/></label><div className="form-options"><label className="checkbox"><input type="checkbox"/> Manter conectado</label><button type="button" onClick={() => alert('Entre em contato com o suporte para recuperar o acesso.')}>Esqueceu a senha?</button></div><button className="btn btn-primary" type="submit">Entrar</button></form><div className="switch-auth">Ainda não tem conta? <button onClick={() => alert('O cadastro de usuários poderá ser conectado ao sistema posteriormente.')}>Criar conta</button></div><div className="leader-access"><span>♧</span><div><strong>É uma liderança política?</strong><p>Solicite a verificação do seu perfil após criar sua conta.</p></div></div></div></section></div>}

    {page === 'dashboard' && <div className="dashboard"><aside className="dash-side"><div className="profile-mini"><div>US</div><span><strong>Usuário PolitiZA!</strong><small>{email || 'Cidadão'}</small></span></div><nav><button className="active">▦ Visão geral</button><button onClick={() => go('publish')}>＋ Cadastrar ato</button><button onClick={() => go('map')}>⌖ Explorar mapa</button><button onClick={() => go('news')}>▤ Notícias</button><button onClick={() => {setLogged(false);go('home')}}>↪ Sair</button></nav><button className="admin-demo" onClick={() => go('admin')}>⚙ Visualizar demonstração administrativa</button></aside><main className="dash-content"><div className="dash-head"><div><h1>Olá, seja bem-vindo!</h1><p>Acompanhe sua área no PolitiZA!.</p></div><button className="btn btn-primary" onClick={() => go('publish')}>＋ Cadastrar ato</button></div><div className="verification-banner"><div className="verification-icon">✓</div><div><span>PERFIL DE USUÁRIO</span><h3>Você está navegando como cidadão</h3><p>Para publicar atos políticos, é necessário solicitar e obter a verificação de liderança.</p></div><button className="btn btn-yellow" onClick={() => alert('Formulário de verificação: informe seus dados institucionais e anexe documentos comprobatórios.')}>Solicitar verificação</button></div><div className="stat-cards"><div><span>⌖</span><p>Atos disponíveis<strong>04</strong></p></div><div><span>▤</span><p>Notícias publicadas<strong>06</strong></p></div><div><span>✓</span><p>Status da conta<strong>{requestStatus}</strong></p></div></div><div className="card dash-table"><h2>Atos em destaque</h2><div className="table-wrap"><table><thead><tr><th>Evento</th><th>Data</th><th>Local</th><th>Status</th></tr></thead><tbody>{events.slice(0,3).map(e=><tr key={e.id}><td><strong>{e.title}</strong><span>{e.category}</span></td><td>{e.date}</td><td>{e.place}</td><td><span className="status published">Publicado</span></td></tr>)}</tbody></table></div></div></main></div>}

    {page === 'publish' && <main className="subpage"><div className="shell"><button className="back-link" onClick={() => go('dashboard')}>← Voltar à área do usuário</button><div className="dash-head"><div><h1>Cadastrar ato político</h1><p>Preencha as informações para disponibilizar o evento na plataforma.</p></div></div>{published && <div className="success-message"><span>✓</span><div><strong>Cadastro demonstrativo concluído!</strong><p>O evento foi adicionado apenas à demonstração visual.</p></div><button onClick={() => setPublished(false)}>×</button></div>}<form className="event-form" onSubmit={e=>{e.preventDefault();setPublished(true)}}><div className="card form-section"><div className="form-section-title"><span>01</span><div><h2>Informações do evento</h2><p>Descreva o acontecimento político.</p></div></div><label>Título do evento<input required placeholder="Ex.: Audiência pública sobre..."/></label><label>Descrição<textarea required rows={4} placeholder="Explique o objetivo e os detalhes do evento."/></label><div className="two-fields"><label>Categoria<select required><option value="">Selecione</option><option>Manifestação</option><option>Audiência pública</option><option>Reunião política</option><option>Debate</option><option>Sessão ou comissão</option></select></label><label>Data<input required type="date"/></label></div><div className="two-fields"><label>Horário<input required type="time"/></label><label>Endereço<input required placeholder="Rua, número, bairro e cidade"/></label></div></div><div className="card form-section"><div className="form-section-title"><span>02</span><div><h2>Localização no mapa</h2><p>Indique onde o evento acontecerá.</p></div></div><div className="form-map"><MapVisual compact/><button type="button">⌖ Selecionar localização</button></div></div><div className="publish-row"><p>ⓘ A publicação depende da verificação do perfil de liderança.</p><button className="btn btn-primary" type="submit">Publicar ato →</button></div></form></div></main>}

    {page === 'admin' && <div className="admin-page"><aside className="admin-side"><Logo onClick={() => go('home')}/><nav><button className="active">▦ Visão geral</button><button>♙ Verificações <span>2</span></button><button>⌖ Atos políticos</button><button>⚙ Configurações</button></nav><button onClick={() => go('dashboard')}>← Voltar ao site</button></aside><main className="admin-content"><div className="admin-top"><h1>Painel administrativo</h1><div className="admin-profile"><span>Administrador PolitiZA!</span><b>AD</b></div></div><div className="admin-stats"><div><span>◷</span><p>Solicitações pendentes<strong>02</strong></p></div><div><span>✓</span><p>Perfis aprovados<strong>18</strong></p></div><div><span>⌖</span><p>Atos cadastrados<strong>34</strong></p></div><div><span>♙</span><p>Usuários<strong>126</strong></p></div></div><section className="card admin-requests"><h2>Solicitações de verificação</h2>{requestStatus === 'Pendente' ? ['Mariana Oliveira','Carlos Mendes'].map((name,i)=><div className="request-row" key={name}><div className="request-avatar">{name.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div className="request-person"><strong>{name}</strong><span>{i===0?'Representante de organização civil':'Liderança comunitária'}</span></div><small>Enviada em {i===0?'22/11/2026':'21/11/2026'}</small><button className="doc-button" onClick={() => alert('Documento demonstrativo para análise.')}>▤ Documentos</button><button className="reject" onClick={() => setRequestStatus('Rejeitada')}>Rejeitar</button><button className="approve" onClick={() => setRequestStatus('Aprovada')}>✓ Aprovar</button></div>) : <div className="empty-state"><strong>Solicitação {requestStatus.toLowerCase()}.</strong><p>O status foi atualizado nesta demonstração.</p><button className="text-link" onClick={() => setRequestStatus('Pendente')}>Restaurar demonstração</button></div>}</section><section className="card dash-table"><h2>Atos políticos cadastrados</h2><div className="table-wrap"><table><thead><tr><th>Evento</th><th>Categoria</th><th>Data</th><th>Local</th></tr></thead><tbody>{events.map(e=><tr key={e.id}><td><strong>{e.title}</strong></td><td>{e.category}</td><td>{e.date}</td><td>{e.place}</td></tr>)}</tbody></table></div></section></main></div>}

    {modalNews !== null && <NewsModal item={news.find(n=>n.id===modalNews)!} onClose={() => setModalNews(null)}/>}
  </div>
}

function EventCard({event,onClick}:{event:EventItem;onClick:()=>void}) {
  return <article className="event-card"><div className="date-tile"><strong>{event.day}</strong><span>{event.month}</span></div><div className="event-card-content"><span className="tag">{event.category}</span><h3>{event.title}</h3><p>◷ {event.time}<i/>⌖ {event.place}</p><button className="text-link" onClick={onClick}>Ver detalhes →</button></div></article>
}
function NewsCard({item,onClick}:{item:typeof news[number];onClick:()=>void}) {
  return <article className="news-card"><div className={`news-image ${item.style}`}><span/><div className="building"><i/><i/><i/><i/></div></div><div className="news-content"><span className="tag">{item.type}</span><h3>{item.title}</h3><p>{item.excerpt}</p><div className="news-meta"><span>{item.source}</span><i/>{item.date}</div><button className="text-link" onClick={onClick}>Ler resumo →</button></div></article>
}
function NewsModal({item,onClose}:{item:typeof news[number];onClose:()=>void}) {
  return <div className="modal-backdrop" onClick={onClose}><div className="news-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><div className={`news-image ${item.style}`}><span/><div className="building"><i/><i/><i/><i/></div></div><div className="modal-body"><span className="tag">{item.type}</span><h2>{item.title}</h2><div className="news-meta"><span>{item.source}</span><i/>{item.date}</div><p>{item.excerpt}</p><p>Este conteúdo é ilustrativo e representa a organização editorial do portal. Em uma versão conectada, as notícias e seus links deverão vir de uma fonte jornalística ou API identificada.</p><button className="btn btn-primary" onClick={onClose}>Fechar</button></div></div></div>
}
function Footer({go}:{go:(p:Page)=>void}) {
  return <footer><div className="shell"><div className="footer-grid"><div><Logo onClick={()=>go('home')}/><p>Uma plataforma para aproximar cidadãos dos acontecimentos políticos e ampliar o acesso à informação pública.</p><span className="neutral-seal">✓ Plataforma informativa e neutra</span></div><div><strong>Explorar</strong><button onClick={()=>go('map')}>Mapa de atos</button><button onClick={()=>go('news')}>Notícias</button></div><div><strong>PolitiZA!</strong><button onClick={()=>go('home')}>Sobre o projeto</button><button onClick={()=>go('login')}>Acessar conta</button></div><div><strong>Compromisso</strong><span>Transparência</span><span>Participação cidadã</span><span>Neutralidade política</span></div></div><div className="footer-bottom"><span>© 2026 PolitiZA! — Projeto acadêmico.</span><span>Informação para exercer a cidadania.</span></div></div></footer>
}
export default App
