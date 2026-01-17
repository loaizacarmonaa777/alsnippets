"use client";

/* =====================================================
   MenuOverlay
   - Fondo oscuro + desenfoque
   - Captura click para cerrar menú
   ===================================================== */

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({
  isOpen,
  onClose,
}: MenuOverlayProps) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-40
        bg-black/40 backdrop-blur-sm
        transition-opacity duration-200 ease-out motion-reduce:transition-none
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    />
  );
}
