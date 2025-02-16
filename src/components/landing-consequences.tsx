import Image from "next/image";
import { Section } from "@/components/section";
import { FCTL } from "@/tools/types";

const sections = [
    ['Heart'],
    ['Oncological'],
    ['Brain', 'https://www.pnas.org/doi/full/10.1073/pnas.1809474115'],
];

export const LandingConsequences: FCTL = ({ dict }) => {
  const d = dict.LandingConsequences;

  return (
    <Section
      className="mb-16"
      id="consequences"
      title={d.title}
    >
      <div className="w-100 flex flex-col items-center">
        <p className="max-w-screen-md text-xl font-light text-center">
          {d.description}
        </p>
      </div>

      <div className="mt-8">
        {sections.map(([key, source]) => (
          <div key={key} className="mx-auto my-10 flex max-w-md flex-col px-4 md:max-w-5xl md:flex-row md:items-center">
            <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
              <Image
                className="rounded-md"
                src={`/consequences/${key}.jpg`}
                alt={key}
                width={460}
                height={368}
              /> 
            </div>
            <div className="py-4 sm:py-8">
              <p className="mb-6 block text-2xl font-semibold">{(d as any)[`item${key}:title`]}</p>
              <p className="mb-6 font-light">
                {(d as any)[`item${key}:text`]}
                {!!source && (
                  <a
                    href={source}
                    target="_blank"
                    className="font-light ml-2"
                  >
                    [{d.source}]
                  </a>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
