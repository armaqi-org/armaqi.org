import classNames from "classnames";
import { useTranslations } from "next-intl";

const sections = [5, 4];

export const LandingSmog = () => {
  const t = useTranslations('LandingSmog');

  return (
    <>
      <div className="container my-16 mx-auto md:px-6 max-w-screen-md">
        {sections.map((len, indHigh) => (
        // eslint-disable-next-line react/no-array-index-key
          <div key={indHigh} className={classNames({ 'mt-16': indHigh })}>
            <h2 className="mb-8 text-3xl font-bold text-center">
              {t(`title${indHigh}`)}
            </h2>

            <ul className="list-disc text-xl">
              {new Array(len).fill(0).map((_, indLow) => (
              // eslint-disable-next-line react/no-array-index-key
                <li key={indLow} className={classNames({ 'mt-8': indLow })}>
                  <span className="font-semibold">{t(`item${indHigh}${indLow}title`)}</span>
                  <span className="font-thin">{t(`item${indHigh}${indLow}text`)}</span>
                </li>
            ))}
            </ul>

          </div>
      ))}
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
        {['/landing-smog1.jpg', '/landing-smog2.jpg', '/landing-smog3.jpg'].map((src, index) => (
          <div key={src} className="group h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg">
            <img
              className="w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 md:h-48 lg:h-56"
              src={src}
              alt={`smog${index}`}
            />
          </div>
          ))}

      </div>
    </>
  );
};
