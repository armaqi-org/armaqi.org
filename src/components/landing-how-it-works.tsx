import Image from "next/image";
import { Fragment } from "react";
import { SectionAnchor, SectionHeader } from "@/components/section";
import { FCTL } from "@/tools/types";

export const LandingHowItWorks: FCTL = ({ t }) => (
  <>
    <SectionAnchor id="how" />
    <div className="container my-24 mx-auto px-6 flex flex-col items-center">
      <section className="max-w-screen-lg">
        <div className="flex flex-wrap">
          <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 lg:w-6/12 overflow-hidden">
            <Image src="/sensor-window.jpeg"
              className="mb-6 w-full shadow-lg"
              alt="sensor"
              width={747}
              height={747}
            />
          </div>

          <div className="w-full shrink-0 grow-0 basis-auto text-left md:w-6/12 md:pl-12 lg:w-6/12">
            <SectionHeader id="how" className="mb-6 px-0">{t('howTitle')}</SectionHeader>
            <p className="font-light">
              {t("howText").split('\n').map((item, key) => (
                  // eslint-disable-next-line react/no-array-index-key
                <Fragment key={key}>{item}<br /></Fragment>
              ))}
            </p>

            <div className="mt-12">
              <a className="bg-armaqi-base text-white font-semibold py-4 px-4 md:px-16" href="#sensor" >
                {t('howAction')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);
