/* =====================================================
    LAYOUT DE TARJETAS (Sin Metadata - Solo Estructura)
   ===================================================== */
export default function TarjetaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-[var(--bg-body)] relative w-full">
      {children}
    </section>
  )
}