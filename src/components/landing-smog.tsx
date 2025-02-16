import classNames from "classnames";
import Image from "next/image";
import { Section } from "@/components/section";
import { SectionList } from "@/components/section-list";
import { FCTL } from "@/tools/types";

const sections: [string, number][] = [
    ['smog', 5],
    ['fog_vs_smog', 4],
];

export const LandingSmog: FCTL = ({ dict }) => {
  return (
    <>
      {sections.map(([key, len], indHigh) => (
        <Section
          key={key}
          id={key}
          title={(dict.LandingSmog as any)[`title${indHigh}`]}
          thin
        >
          <SectionList
            dictSection={dict.LandingSmog}
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
