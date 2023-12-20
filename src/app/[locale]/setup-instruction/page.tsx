import { useTranslations } from "next-intl";
import { Background } from "@/components/bg";
import { Navigation } from "@/components/navigation";
import { useLocale } from "@/tools/locale";

export default function SetupInstructions() {
    const locale = useLocale();
    const t = useTranslations('Setup');

    const docs = {
        'am': '1A1RMsw4UdQsOVQSItaB908AHb5naNpaYeydx2dK6JaM',
        'en': '151QvOqCHNDS3GUpoInlhAsCqQdBBlqdwKfF2dGBVJok',
        'ru': '1A1RMsw4UdQsOVQSItaB908AHb5naNpaYeydx2dK6JaM',
    };

    const docHref = `https://docs.google.com/document/d/${docs[locale] ?? docs.ru}/view`;

    return (
      <>
        <Background />
        <Navigation locale={locale} links={[{ href: '/', title: t('nav-main') }]} />
        <div className="pt-[96px] min-h-screen container flex flex-col items-center px-4">
          <div className="h-[20%]" />
          <p className="w-full text-center text-semibold mb-4 text-xl">{t('text')}</p>
          <p className="w-full text-center mb-4"><a href={docHref} target="_blank">{t('instruction')}</a></p>

          <iframe className="w-full flex-1" src={`${docHref}?embedded=true`} />
        </div>
      </>
    );
};
