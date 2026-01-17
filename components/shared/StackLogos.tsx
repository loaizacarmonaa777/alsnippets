/* Stack tecnológico animado
   Logos en loop infinito
   Escala de grises por defecto y color al hover */

const logos = [
  "01-wordpress.svg",
  "02-woocommerce.svg",
  "03-shopofy.svg",
  "04-wix.svg",
  "05-squarespace.svg",
  "06-wpml.svg",
  "07-figma.svg",
  "08-photoshop.svg",
  "09-illustrator.svg",
  "10-cloudflare.svg",
  "11-yoast-seo.svg",
  "12-cpanel.svg",
  "13-plesk.svg",
  "14-divi.svg",
  "15-elementor.svg",
  "16-wordfence.svg",
  "17-i-themes-security.svg",
  "18-lite-speed.svg",
  "19-wp-rocket.svg",
  "20-paypal.svg",
  "21-payu.svg",
  "22-html.svg",
  "23-css.svg",
  "24-java-script.svg",
  "25-php.svg",
  "26-tailwind-css.svg",
  "27-next-js.svg",
  "28-vercel.svg",
];

export default function StackLogos() {
  return (
    /* Pista de animación */
    <div className="flex gap-12 animate-scroll hover:[animation-play-state:paused] w-max min-w-full items-center">
      
      {/* Duplicamos logos para loop infinito */}
      {[...logos, ...logos].map((logo, index) => (
        <div
          key={index}
          className="
            flex-shrink-0
            flex items-center justify-center
            grayscale opacity-70
            hover:grayscale-0 hover:opacity-100
            transition
          "
        >
          <img
            src={`/logos/stack/${logo}`}
            alt={logo.replace(".svg", "").replace(/[-_]/g, " ")}
            className="block h-14 w-auto object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
