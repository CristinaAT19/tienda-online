import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex flex-col items-start gap-4 py-20">
      <title>Página no encontrada · Nido</title>
      <div className="eyebrow">Error 404</div>
      <h1 className="text-[clamp(30px,4vw,46px)] leading-[1.05] font-bold tracking-[-0.04em]">
        No encontramos esta página.
      </h1>
      <p className="text-muted">Puede que el producto ya no esté disponible o que el enlace esté mal escrito.</p>
      <Link to="/" className="btn-primary">
        Volver al catálogo
      </Link>
    </section>
  )
}
