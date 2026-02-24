import Link from "next/link";
import { Terminal, Home, Zap, Briefcase } from 'lucide-react';

export default function NotFound() {
  return (
    // Contenedor principal que se adapta al espacio disponible entre tu header y footer
    <div className="w-full max-w-4xl mx-auto my-12 relative overflow-hidden rounded-3xl bg-[#050505] border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.1)] font-mono">
      
      {/* Fondo cuadriculado interno */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16653410_1px,transparent_1px),linear-gradient(to_bottom,#16653410_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      <main className="relative z-10 flex flex-col items-center text-center px-6 py-20 space-y-8">
        
        <div className="flex flex-col items-center space-y-4">
          <Terminal className="w-16 h-16 text-green-500 mb-2 opacity-80" />
          
          <p className="text-sm text-green-500/60">
            // Ruta no encontrada... |
          </p>

          {/* Título 404 con animación nativa (pulse) */}
          <h1 className="text-7xl md:text-9xl font-black text-green-500 tracking-tighter animate-pulse" style={{ textShadow: '0 0 20px rgba(34,197,94,0.5)' }}>
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-green-400">
            Algo aquí no está donde debería
          </h2>

          <p className="text-lg max-w-2xl mx-auto text-green-600/70">
            Puede que el enlace esté roto, que la página haya cambiado o que simplemente estés explorando más allá del mapa. No pasa nada, seguimos.
          </p>
        </div>

        <div className="space-y-6 pt-8 w-full">
          <p className="text-sm text-green-500/70">
            &gt; ¿Qué quieres hacer ahora?_
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-[#050505] border border-green-500/30 hover:border-green-500 text-green-500 hover:bg-green-500/10 rounded-lg transition-all">
              <Home className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>

            <Link href="/proyectos/suite-text" className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <Zap className="w-4 h-4" />
              <span>Ir a Suite Text</span>
            </Link>

            <Link href="/consultoria" className="flex items-center gap-2 px-6 py-3 bg-[#050505] border border-green-500/30 hover:border-green-500 text-green-500 hover:bg-green-500/10 rounded-lg transition-all">
              <Briefcase className="w-4 h-4" />
              <span>Consultoría / Auditoría</span>
            </Link>
          </div>
        </div>

        <p className="text-xs text-green-500/50 pt-8">
          En Alsnippets me dedico a detectar y corregir este tipo de problemas técnicos.
        </p>

      </main>
    </div>
  );
}