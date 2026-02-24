import { notFound } from 'next/navigation'

export default function CatchAllNotFound() {
  // Al ejecutar esta función, Next.js buscará automáticamente el archivo not-found.tsx que creamos arriba
  notFound()
}