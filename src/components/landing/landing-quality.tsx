import { Section } from "@/components/section";
import { CloudQualitySvg } from "@/images/cloud-quality";
import { ChartPlaceYear } from "@/modules/chart-place-year";
import { aqiScalesData } from "@/tools/aqi-scale";
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
          {aqiScalesData.map(({ bgColor, from, key, to }) => {
                  const { subtitle, title } = dict.Scale[key] as any;
                  return (
                    <div key={bgColor} className="mb-12 lg:mb-0 mx-4 ">
                      <CloudQualitySvg color={bgColor} />
                      <div className="text-sm text-black">{from}{to ? `-${to}` : '+'}</div>
                      <div className="font-bold text-sm text-black">{title}</div>
                      {!!subtitle && <div className="text-xs text-black">{subtitle}</div>}
                    </div>
                  );
              }
              )}
        </div>

        <p className="text-xs text-center max-w-screen-md font-light mt-8 px-4">
          {dict.LandingQuality.hint}
        </p>
      </Section>
 
      <Section id="quality-chart"
        className="mb-16 hidden"
        title={dict.LandingQuality.chartTitleYerevan}
        center
      >
        <ChartPlaceYear />
      </Section>
    </>
    );
};
