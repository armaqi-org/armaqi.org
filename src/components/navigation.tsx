import classNames from "classnames";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { NavigationBurger } from "@/components/navigation-burger";
import { NavigationScroll } from "@/components/navigation-scroll";
import { Locale } from "@/const";
import { CloudQualitySvg } from "@/images/cloud-quality";

export const Navigation: FC<{ locale: Locale }> = ({ locale }) => {
    const tn = useTranslations('Navigation');

    return (
      <>
        <NavigationBurger />
        <NavigationScroll />
        <nav
          className={classNames(
          // all
          'fixed top-0 transition-colors z-top',

          // mobile (<= md)
          'menu-burger:right-0 menu-burger:left-0 -left-full bottom-0 menu-burger:bg-transparent',

          // wide
          'md:block md:w-full md:border-b md:right-0 md:left-0 md:bottom-unset md:bg-white md:menu-top:bg-transparent md:menu-top:border-0',
          )}
        >

          <div
            className={classNames(
                // all
                'flex flex-wrap',

                // mobile (<= md)
                'max-w-sm bg-white h-screen flex-col items-start pl-4',

                // wide
                'md:flex-row md:max-w-screen-xl md:h-auto md:bg-transparent md:items-center md:justify-between md:mx-auto md:px-8',
            )}
          >
            <a href="/"
              className="flex flex-col items-center space-x-3 rtl:space-x-reverse py-2"
            >
              <CloudQualitySvg color="#77C2EB"  />
              <p className="text-xs text-black font-semibold">Armenia Air<br />Quality Index</p>
            </a>

            <div
              className="items-center justify-end w-full md:flex md:w-auto flex-1 pr-5"
              id="navbar-sticky"
            >
              <ul
                className={classNames(
                    "flex flex-col p-4 md:p-0 mt-4 font-normal lg   md:flex-row md:mt-0 md:border-0",
                "md:space-x-8 rtl:space-x-reverse"
                )}
              >
                {['map', 'about', 'smog', 'add_sensor'].map(item => (
                  <li key={item}>
                    <a href="#"
                      className="block uppercase py-2 md:px-3 text-sm text-black rounded font-semibold md:bg-transparent md:p-0"
                      aria-current="page"
                    >{tn(item)}
                    </a>
                  </li>
              ))}

              </ul>
            </div>

            <div className="flex space-x-3 md:space-x-2 rtl:space-x-reverse py-8 md:p-0">
              {locale !== Locale.AM && (
                <Link href="/" className="ml-2 font-medium text-black">
                  Հայ
                </Link>
            )}
              {locale !== Locale.EN && (
                <Link href={`/${Locale.EN}`} className="ml-2 font-medium text-black">
                  ENG
                </Link>
            )}
              {locale !== Locale.RU && (
                <Link href={`/${Locale.RU}`} className="ml-2 font-medium text-black">
                  РУС
                </Link>
            )}
            </div>
          </div>
        </nav>
      </>

    );
};