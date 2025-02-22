import Image from "next/image";
import { Section } from "@/components/section";
import { FCTL } from "@/tools/types";

const sections = [
    'Cars',
    'Heating',
    'Burning',
    'Geographic',
    'Wildfires',
    'Mining',
    'Construction',
    'Industry',
];

export const LandingWhyHappening: FCTL = ({ dict }) => {
  return (
    <Section className="mb-16" id="why" title={dict.LandingWhyHappening.title}>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-16">
        {sections.map(item => (
          <div key={item} className="flex flex-col items-center">
            <Image src={`/why/${item}.svg`}
              alt={item}
              width={80}
              height={80}
            />
            <h4 className="mx-4 mt-4 mb-4 md:min-h-[3em] text-xl text-center font-semibold">
              {(dict.LandingWhyHappening as any)[`item${item}:title`]}
            </h4>
            {/* eslint-disable-next-line react/no-danger */}
            <p className="ml-4 md:w-56 font-light text-center" dangerouslySetInnerHTML={{ __html: (dict.LandingWhyHappening as any)[`item${item}:text`] }} />
          </div>
          ))}
      </div>
    </Section>
  );
};
