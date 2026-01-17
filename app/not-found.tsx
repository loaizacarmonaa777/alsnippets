import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-20 text-center space-y-8">
      
      <div className="space-y-4">
        <p className="text-sm opacity-60">
          // Ruta no encontrada... |
        </p>

        <h1 className="text-3xl font-bold">
          Algo aquí no está donde debería
        </h1>

        <p className="text-lg max-w-2xl mx-auto">
          Puede que el enlace esté roto, que la página haya cambiado
          o que simplemente estés explorando más allá del mapa.
          No pasa nada, seguimos.
        </p>
      </div>

      <div className="space-y-6">
        <p className="text-sm opacity-70">
          ¿Qué quieres hacer ahora?
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            className="underline"
          >
            Volver al inicio
          </Link>

          <Link
            href="/auditoria"
            className="underline"
          >
            Solicitar una auditoría WordPress
          </Link>

          <Link
            href="/contacto"
            className="underline"
          >
            Ir a la página de contacto
          </Link>
        </div>
      </div>

      <p className="text-xs opacity-50">
        En Alsnippets me dedico a detectar y corregir este tipo de problemas técnicos.
      </p>

    </main>
  );
}
