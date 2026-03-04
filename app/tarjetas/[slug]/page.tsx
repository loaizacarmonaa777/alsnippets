'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Download, 
  Share2, 
  QrCode, 
  X, 
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
  Github
} from 'lucide-react';

/* =====================================================
   BASE DE DATOS SIMULADA (Mock DB)
   En el futuro, esto será un fetch a tu base de datos (PostgreSQL, Firebase, etc.)
   ===================================================== */
const mockDatabase: Record<string, any> = {
  'adrianLoaiza': {
    name: "Adrián Loaiza",
    title: "Consultor & Desarrollador WordPress",
    company: "Alsnippets",
    phone: "+573246454061",
    email: "contact@alsnippets.com",
    website: "https://alsnippets.com",
    location: "Antioquia, Colombia",
    bio: "Especialista en optimización de rendimiento (WPO), seguridad y desarrollo a medida para proyectos web escalables.",
    social: {
      instagram: "https://www.instagram.com/alsnippets/",
      linkedin: "https://www.linkedin.com/in/adrian-loaiza-carmona-alc/",
      github: "https://github.com/loaizacarmonaa777"
    },
    profileImage: "/images/tu-foto.webp", // Cambia esto luego
    coverColor: "from-[var(--brand-primary)] to-[var(--text-yellow1)]"
  },
  'yeseniaSanmartin': {
    name: "Yesenia Sanmartín Sánchez",
    title: "Diseñadora Gráfica",
    company: "ALC Diseño",
    phone: "+573246454062",
    email: "yesenniasan2@hotmail.com",
    website: "",
    location: "Colombia",
    bio: "Diseñadora gráfica especializada en crear identidades visuales que conectan y transmiten la esencia de cada marca.",
    social: {
      facebook: "https://www.facebook.com/yesenia.sanmartinsanchez",
      instagram: "https://www.instagram.com/alc.diseno/"
    },
    profileImage: "/images/qr-placeholder.webp", // Pon foto real
    coverColor: "from-pink-500 to-rose-400"
  },
  'danielaFranco': {
    name: "Daniela Franco Sanmartín",
    title: "Creadora de contenido digital",
    company: "Independiente",
    phone: "+12035845697",
    email: "francosanmartind@gmail.com",
    website: "",
    location: "USA",
    bio: "Especialista en creación de contenido digital de alto impacto para redes sociales, conectando marcas con su audiencia.",
    social: {
      instagram: "https://www.instagram.com/danix.priv__/"
    },
    profileImage: "/images/qr-placeholder.webp", // Pon foto real
    coverColor: "from-purple-500 to-indigo-400"
  },
  'karenFranco': {
    name: "Karen Franco Sanmartin",
    title: "Artista digital",
    company: "Cynfas",
    phone: "+12035846715",
    email: "karenfranco478@gmail.com",
    website: "",
    location: "USA",
    bio: "Artista digital enfocada en ilustración, diseño de personajes, escenarios y arte conceptual vanguardista.",
    social: {
      instagram: "https://www.instagram.com/cynfas/"
    },
    profileImage: "/images/qr-placeholder.webp", // Pon foto real
    coverColor: "from-cyan-500 to-blue-500"
  }
};

/* =====================================================
   COMPONENTE PRINCIPAL DE LA TARJETA
   ===================================================== */
export default function DigitalBusinessCard({ params }: { params: { slug: string } }) {
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Obtener la URL actual para el QR dinámico (se ejecuta al montar el cliente)
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Buscar usuario en la base de datos simulada usando el slug de la URL
  const userSlug = params.slug;
  const contactInfo = mockDatabase[userSlug];

  // Si no existe el usuario (slug incorrecto), mostrar página de error estilizada
  if (!contactInfo) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-5 text-center" style={{ background: 'var(--bg-hero-gradient)' }}>
        <h1 className="text-4xl font-bold mb-4">Tarjeta no encontrada</h1>
        <p className="opacity-80">El perfil digital que buscas no existe o ha sido desactivado.</p>
      </div>
    );
  }

  // Generador dinámico de vCard (.vcf) basado en los datos de la DB
  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:${contactInfo.company}
TITLE:${contactInfo.title}
TEL;TYPE=WORK,VOICE:${contactInfo.phone}
EMAIL;TYPE=WORK,INTERNET:${contactInfo.email}
${contactInfo.website ? `URL:${contactInfo.website}` : ''}
NOTE:${contactInfo.bio}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${contactInfo.name.replace(/\s+/g, "_")}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compartir nativo en móviles
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tarjeta Digital de ${contactInfo.name}`,
          text: `Guarda el contacto de ${contactInfo.name} - ${contactInfo.title}`,
          url: currentUrl,
        });
      } catch (error) {
        console.log("Error compartiendo:", error);
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert("Enlace copiado al portapapeles. ¡Listo para enviar!");
    }
  };

  // Función auxiliar para renderizar el icono de red social correcto
  const renderSocialIcon = (network: string, url: string) => {
    const iconClass = "w-5 h-5";
    let Icon = Globe; // Default fallback

    if (network === 'instagram') Icon = Instagram;
    if (network === 'facebook') Icon = Facebook;
    if (network === 'linkedin') Icon = Linkedin;
    if (network === 'github') Icon = Github;

    return (
      <a key={network} href={url} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:shadow-md transition-all">
        <Icon className={iconClass} />
      </a>
    );
  };

  return (
    <main 
      className="min-h-screen w-full flex items-center justify-center py-12 px-4 relative overflow-hidden"
      style={{ background: 'var(--bg-hero-gradient)' }}
    >
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--brand-primary)]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <section className="w-full max-w-md bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative z-10">
        
        {/* Cover con color dinámico de la base de datos */}
        <div className={`h-32 w-full bg-gradient-to-r ${contactInfo.coverColor} relative`}>
          <button 
            onClick={handleShare}
            className="absolute top-6 right-6 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pb-8 pt-0 relative flex flex-col items-center text-center mt-[-3rem]">
          
          <div className="relative w-28 h-28 rounded-full border-4 border-[var(--bg-body)] overflow-hidden shadow-lg bg-[var(--bg-tertiary)] mb-4">
            <Image src={contactInfo.profileImage} alt={contactInfo.name} fill className="object-cover" />
          </div>

          <h1 className="text-2xl font-black text-[var(--text-primary)] !my-0">{contactInfo.name}</h1>
          <p className="text-[var(--brand-primary)] font-semibold text-sm uppercase tracking-wider mt-1 mb-2">
            {contactInfo.title}
          </p>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            {contactInfo.bio}
          </p>

          {/* Botones de Acción (Llamar, Correo, QR) */}
          <div className="flex justify-center gap-6 w-full my-8">
            <a href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)]">WhatsApp</span>
            </a>
            
            <a href={`mailto:${contactInfo.email}`} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-all shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)]">Email</span>
            </a>

            <button onClick={() => setShowQR(true)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-[var(--text-primary)]/5 text-[var(--text-primary)] flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-body)] transition-all shadow-sm border border-[var(--border-subtle)]">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-[var(--text-secondary)]">El QR</span>
            </button>
          </div>

          <button onClick={downloadVCard} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--text-primary)] text-[var(--bg-body)] font-bold text-lg hover:opacity-90 transition-opacity shadow-xl">
            <Download className="w-5 h-5" /> Guardar Contacto
          </button>

          {/* Redes Sociales Dinámicas */}
          {contactInfo.social && Object.keys(contactInfo.social).length > 0 && (
            <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-[var(--border-subtle)] w-full">
              {Object.entries(contactInfo.social).map(([network, url]) => 
                renderSocialIcon(network, url as string)
              )}
            </div>
          )}

          {/* Detalles Adicionales */}
          <div className="w-full mt-6 space-y-4 text-left">
            {contactInfo.website && (
              <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group bg-[var(--bg-body)] p-4 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/50 transition-colors">
                <Globe className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--brand-primary)]" />
                <div>
                  <p className="text-xs text-[var(--text-muted)] font-medium">Sitio Web</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{contactInfo.website.replace('https://', '')}</p>
                </div>
              </a>
            )}
            
            <div className="flex items-center gap-4 bg-[var(--bg-body)] p-4 rounded-2xl border border-[var(--border-subtle)]">
              <MapPin className="w-5 h-5 text-[var(--text-muted)]" />
              <div>
                <p className="text-xs text-[var(--text-muted)] font-medium">Ubicación</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{contactInfo.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Branding de tu SaaS */}
        <div className="bg-[var(--bg-tertiary)] py-4 text-center border-t border-[var(--border-subtle)]">
          <a href="https://alsnippets.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors">
            Crear mi Tarjeta Digital con Alsnippets ⚡
          </a>
        </div>
      </section>

      {/* MODAL QR DINÁMICO */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--bg-body)] p-8 rounded-[2rem] shadow-2xl max-w-sm w-full relative flex flex-col items-center text-center">
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 p-2 bg-[var(--bg-tertiary)] hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Escanéame</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">Apunta con la cámara de tu celular para guardar los datos de {contactInfo.name.split(' ')[0]}.</p>
            
            {/* QR GENERADO AUTOMÁTICAMENTE USANDO API PÚBLICA */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              {currentUrl && (
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`} 
                  alt={`Código QR de ${contactInfo.name}`}
                  className="w-48 h-48 rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}