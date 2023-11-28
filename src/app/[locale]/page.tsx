import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Locale } from "@/const";
import { MapModule } from "@/modules/map";

export default function HomePage() {
    const locale = useLocale();
    const tn = useTranslations('Navigation');

    return (
      <>
        <nav className="fixed w-full top-0 start-0" style={{ zIndex: 500 }}>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-8 pb-4">
            <a href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image src="/logo-black.svg"
                alt="armaqi"
                className="dark:invert"
                width={85}
                height={84}
                priority
              />
            </a>

            <div
              className="items-center justify-end hidden w-full md:flex md:w-auto flex-1 pr-5"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-normal lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                {['map', 'about', 'smog', 'add_sensor'].map(item => (
                  <li key={item}>
                    <a href="#"
                      className="block uppercase py-2 px-3 text-white rounded md:bg-transparent md:text-black md:p-0"
                      aria-current="page"
                    >{tn(item)}
                    </a>
                  </li>
                        ))}

              </ul>
            </div>

            <div className="flex space-x-3 md:space-x-2 rtl:space-x-reverse">
              {locale !== Locale.AM && (
                <Link href="/" className="ml-2 font-medium font-bold">
                  Հայ
                </Link>
              )}
              {locale !== Locale.EN && (
                <Link href={`/${Locale.EN}`} className="ml-2 font-medium font-bold">
                  ENG
                </Link>
              )}
              {locale !== Locale.RU && (
                <Link href={`/${Locale.RU}`} className="ml-2 font-medium font-bold">
                  РУС
                </Link>
              )}
            </div>
          </div>
        </nav>
        <MapModule />
      </>
    );
}
