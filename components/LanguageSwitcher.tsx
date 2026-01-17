"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = pathname.startsWith("/en") ? "en" : "es";

  const switchLanguage = (lang: "es" | "en") => {
    if (lang === currentLang) return;

    const newPath = pathname.replace(/^\/(es|en)/, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => switchLanguage("es")}
        className={`px-3 py-1 text-xs border rounded transition ${
          currentLang === "es"
            ? "bg-green-500 text-black border-green-500"
            : "border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
        }`}
      >
        ES
      </button>

      <button
        onClick={() => switchLanguage("en")}
        className={`px-3 py-1 text-xs border rounded transition ${
          currentLang === "en"
            ? "bg-green-500 text-black border-green-500"
            : "border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
        }`}
      >
        EN
      </button>
    </div>
  );
}