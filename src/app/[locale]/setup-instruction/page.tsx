import { useTranslations } from "next-intl";
import { Background } from "@/components/bg";
import { Navigation } from "@/components/navigation";
import { useLocale } from "@/tools/locale";

export default function SetupInstructions() {
    const locale = useLocale();
    const t = useTranslations('Setup');

    const docs = {
        'am': '2PACX-1vRN3hyamaQtoLk5ZyQzMnLNYNlC07VXOV0n9tW91NlCL2OVzzmzdwo-lnqP6YDKbZ7qLgrMynhLePeR',
        'en': '2PACX-1vS-LREGZ9Pm-0SrL7NPitMgg7ECZREDDi6gpQvTjuNLi77_P2S3qxkXag2ixjD8pJcMOQSRxwyyh-ym',
        'ru': '2PACX-1vRN3hyamaQtoLk5ZyQzMnLNYNlC07VXOV0n9tW91NlCL2OVzzmzdwo-lnqP6YDKbZ7qLgrMynhLePeR',
    };

    const docHref = `https://docs.google.com/document/d/e/${docs[locale] ?? docs.ru}/pub`;

    return (
      <>
        <Background />
        <Navigation locale={locale} links={[{ href: '/', title: t('nav-main') }]} />
        <div className="pt-[96px] min-h-screen container flex flex-col items-center px-4">
          <div className="h-[20%]" />
          <p className="w-full text-center text-semibold mb-4 text-xl">{t('text')}</p>
          <p className="w-full text-center mb-4 "><a className="underline" href={docHref} target="_blank">{t('instruction')}</a></p>

          <div className="w-full flex-1 flex flex-col">
            <iframe style={{ maxWidth: '580pt' }} className="flex-1 w-full mx-auto" src={`${docHref}?embedded=true`} />
          </div>

        </div>
      </>
    );
};
