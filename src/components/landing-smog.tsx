import classNames from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { SectionList } from "@/components/section-list";

const sections: [string, number][] = [
    ['smog', 5],
    ['fog_vs_smog', 4],
];

export const LandingSmog = () => {
  const t = useTranslations('LandingSmog');

  return (
    <>
      {sections.map(([key, len], indHigh) => (
        <Section
          className={classNames('mt-8', { 'mt-16': indHigh })}
          key={key}
          id={key}
          title={t(`title${indHigh}`)}
          thin
        >
          <SectionList
            t={t}
            tPrefix={`item${indHigh}`}
            len={len}
          />
        </Section>
      ))}

      <div
        className="mx-auto -mt-16 grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10"
      >
        {['/landing-smog1.jpg', '/landing-smog2.jpg', '/landing-smog3.jpg'].map((src, index) => (
          <div
            key={src}
            className="group h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg"
          >
            <Image
              className={classNames(
                  "w-full transform object-cover object-center md:h-48 lg:h-56",
                  "transition duration-500 ease-in-out group-hover:scale-105"
              )}
              src={src}
              alt={`smog${index}`}
              width={300}
              height={225}
            />
          </div>
        ))}
      </div>
    </>
  );
};
