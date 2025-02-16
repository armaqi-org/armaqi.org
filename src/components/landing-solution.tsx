import Image from "next/image";
import { Section } from "@/components/section";
import { SectionList } from "@/components/section-list";
import { FCTL } from "@/tools/types";

const sections = [
    ['Trash', 'Trash.svg'],
    ['Fuel', 'Fuel.svg'],
    ['Stoves', 'Stoves.svg'],
    ['Wood', 'Wood.png'],
];

export const LandingSolution: FCTL = ({ dict }) => {
  return (
    <>
      <Section className="mb-8" id="solution" title={dict.LandingSolution.title} thin>
        <SectionList
          dictSection={dict.LandingSolution}
          len={7}
          tPrefix="item0"
          space=" "
        />
      </Section>

      <Section className="mb-32 mt-32" id="solution-everyone" title={(dict.LandingSolution as any)[`titleEveryone`]}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:mt-8">
          {sections.map(([key, src]) => (
            <div key={key} className=" flex flex-col items-center">
              <Image
                src={`/solution/${src}`}
                alt={key}
                width={80}
                height={80}
              />
              <h3 className="mt-4 text-2xl text-center font-bold leading-none">{(dict.LandingSolution as any)[`item${key}:title`]}</h3>
              <p className="mt-6 text-center md:max-w-xs">{(dict.LandingSolution as any)[`item${key}:text`]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="mt-16 mb-8" id="solution-protect" title={dict.LandingSolution.titleProtect} thin>
        <SectionList
          dictSection={dict.LandingSolution}
          len={7}
          tPrefix="item2"
          space=" "
        />
      </Section>
    </>
  );
};
