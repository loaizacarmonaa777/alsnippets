/* =====================================================
   SunIcon
   - Solo SVG 
   - Sin estilos
   ===================================================== */

type IconProps = {
  className?: string;
};

export default function SunIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M21.94,16.15c0,3.28-2.66,5.94-5.94,5.94s-5.94-2.66-5.94-5.94,2.66-5.94,5.94-5.94,5.94,2.66,5.94,5.94Z"/><rect x="15.36" y="5" width="1.28" height="3.63" rx=".55" ry=".55"/><rect x="15.36" y="23.37" width="1.28" height="3.63" rx=".55" ry=".55"/><rect x="21.85" y="7.69" width="1.28" height="3.63" rx=".55" ry=".55" transform="translate(13.31 -13.12) rotate(45)"/><rect x="8.86" y="20.68" width="1.28" height="3.63" rx=".55" ry=".55" transform="translate(18.69 -.13) rotate(45)"/><rect x="24.54" y="14.18" width="1.28" height="3.63" rx=".55" ry=".55" transform="translate(41.18 -9.18) rotate(90)"/><rect x="6.17" y="14.18" width="1.28" height="3.63" rx=".55" ry=".55" transform="translate(22.82 9.18) rotate(90)"/><rect x="21.85" y="20.68" width="1.28" height="3.63" rx=".55" ry=".55" transform="translate(54.31 22.49) rotate(135)"/><rect x="8.86" y="7.69" width="1.28" height="3.63" rx=".55" ry=".55" transform="translate(22.95 9.51) rotate(135)"/>
    </svg>
  );
}
