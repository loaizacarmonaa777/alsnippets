/* =====================================================
   PinIcon
   - Solo SVG 
   - Sin estilos
   ===================================================== */

type IconProps = {
  className?: string;
};

export default function PinIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path id="pin_fill_sharp_circle-_635_" d="M19.3,13.4c0-1.82-1.48-3.3-3.3-3.3s-3.3,1.48-3.3,3.3,1.48,3.3,3.3,3.3,3.3-1.48,3.3-3.3M23.7,12.7c0,4.25-7.7,14.3-7.7,14.3,0,0-7.7-10.05-7.7-14.3s3.45-7.7,7.7-7.7,7.7,3.45,7.7,7.7M17.1,13.4c0,.61-.49,1.1-1.1,1.1s-1.1-.49-1.1-1.1.49-1.1,1.1-1.1,1.1.49,1.1,1.1" fill-rule="evenodd"/>
    </svg>
  );
}
