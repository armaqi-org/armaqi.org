import { Background } from "@/components/bg";
import { Link } from "@/components/link";
import { Navigation } from "@/components/navigation";
import { getDictionary } from "@/dictionaries";

export default async function NotFound() {
    const lang = 'am';
    const dict = (await getDictionary(lang)).NotFound;

    return (
      <div>
        <Background />
        <Navigation
          locale={lang}
          links={[]}
          currentPath="/"
        />

        <div className="w-full pt-[30vh] flex flex-col items-center">
          <h1 className="text-black text-4xl font-bold">404</h1>
          <h2 className="text-black text-2xl font-semibold">{dict.text}</h2>
          <div className="mt-3">
            <Link locale={lang} href="/">armaqi.org</Link>
          </div>
        </div>

      </div>
    );
}