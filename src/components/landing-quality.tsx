import { Carousel } from "@/components/carousel";
import { Section } from "@/components/section";
import { CloudQualitySvg } from "@/images/cloud-quality";
import { qualityScales } from "@/tools/quality-scale";
import { FCTL } from "@/tools/types";

export const LandingQuality: FCTL = ({ dict }) => {
  return (
    <>
      <Section
        id="quality"
        className="mb-16"
        title={dict.LandingQuality.title}
        center
        primary
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 max-w-screen-md px-4 md:px-8">
          {qualityScales.map(([from, to, color], index) => (
            <div key={color} className="mb-12 lg:mb-0 mx-4 ">
              <CloudQualitySvg color={color} />
              <div className="text-sm text-black">{from}{to ? `-${to}` : '+'}</div>
              {((dict.LandingQuality as any)[`scale${index}`] as string)?.split(':').map((tt, index) =>
                  !index ? (
                    <div className="font-bold text-sm text-black" key={tt}>{tt}</div>
                  ) : tt ? (
                    <div className="text-xs text-black" key={tt}>{tt}</div>
                  ) : null
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-center max-w-screen-md font-light mt-8 px-4">
          {dict.LandingQuality.hint}
        </p>
      </Section>
 
      <Section id="quality-chart"
        className="mb-16"
        title={dict.LandingQuality.chartTitle}
        center
      >
        <Carousel slides={[
            { src: './landing-chart-yerevan.svg', text: dict.LandingQuality.chartTitleYerevan },
            { src: './landing-chart-tbilisi.svg', text: dict.LandingQuality.chartTitleTbilisi },
        ]}
        />
      </Section>
    </>
    );
};
