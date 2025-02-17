import classNames from "classnames";
import { FC } from "react";
import { Link } from "@/components/link";
import { NavigationBurger } from "@/components/navigation-burger";
import { Locale } from "@/i18n-config";
import { CloudQualitySvg } from "@/images/cloud-quality";

export interface NavigationLink {
    href: string;
    title: string;
}

export const Navigation: FC<{ locale: Locale, links: NavigationLink[] }> = ({ links, locale }) => {
    return (
      <>
        <NavigationBurger />
        <nav
          className={classNames(
          // all
          'fixed md:sticky top-0 transition-colors z-nav',

          // mobile (<= md)
          'menu-burger:right-0 menu-burger:left-0 -left-full bottom-0 menu-burger:bg-transparent',

          // wide
          'md:block md:w-full md:border-b md:right-0 md:left-0 md:bottom-unset md:bg-white',
          )}
        >
          <div
            className={classNames(
                // all
                'flex flex-wrap',

                // mobile (<= md)
                'w-[75%] max-w-sm bg-white h-screen flex-col items-start pl-4',

                // wide
                'md:flex-row md:max-w-screen-xl md:w-full md:h-auto md:bg-transparent md:items-center md:justify-between md:mx-auto md:px-8',
            )}
          >
            <div className="flex flex-row justify-between w-full md:w-auto">
              <Link href="/" locale={locale} className="flex flex-row space-x-3 rtl:space-x-reverse items-center py-2">
                <CloudQualitySvg color="#77C2EB"  />
                <p className="text-xs text-armaqi-base font-semibold leading-4">Armenia Air<br />Quality Index</p>
              </Link>

              <div className="md:hidden mr-8 text-2xl text-gray-300 mt-4 cursor-pointer">x</div>
            </div>

            <div
              className="items-center justify-end w-full md:flex md:w-auto md:flex-1 mb-2 md:mb-0 pr-5"
            >
              <ul
                className={classNames(
                    "flex flex-col p-4 md:p-0 mt-4 font-normal lg md:flex-row md:items-center md:mt-0 md:border-0",
                    "md:space-x-8 rtl:space-x-reverse"
                )}
              >
                {links.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      locale="ru"
                      className="block uppercase py-2 md:px-3 text-md md:text-sm text-armaqi-base rounded font-semibold md:bg-transparent md:p-0 md:text-center"
                      aria-current="page"
                    >{item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-3 md:space-x-2 rtl:space-x-reverse py-8 md:p-0">
              {locale !== 'am' && (
                <Link href="/" locale="am" className="ml-2 font-medium text-armaqi-base">
                  Հայ
                </Link>
              )}
              {locale !== 'en' && (
                <Link href="/" locale="en" className="ml-2 font-medium text-armaqi-base">
                  ENG
                </Link>
              )}
              {locale !== 'ru' && (
                <Link href="/" locale="ru" className="ml-2 font-medium text-armaqi-base">
                  РУС
                </Link>
              )}
            </div>
          </div>
        </nav>
      </>
    );
};