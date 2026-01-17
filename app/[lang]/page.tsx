import { messages } from "@/i18n/messages";
import Typewriter from "@/components/Typewriter";
import BugCounter from "@/components/BugCounter";
import ProgressBar from "@/components/ProgressBar";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

type Props = {
  params: {
    lang: "es" | "en";
  };
};

export default function Home({ params }: Props) {
  const { lang } = params;
  const content = messages[lang];

  if (!content) {
    return null;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono px-6">
      <div className="max-w-xl text-center space-y-6">
        {content.codeComment && (
          <p className="text-sm opacity-70">
            <Typewriter text={content.codeComment} />
          </p>
        )}

        <h1 className="text-2xl md:text-3xl font-bold">
          {content.title}
        </h1>

        <p className="text-base md:text-lg opacity-80">
          {content.subtitle}
        </p>

        <BugCounter to={982} />
        <ProgressBar max={75} />
        <LanguageSwitcher />
      </div>
    </main>
  );
}
