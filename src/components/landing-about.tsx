import { SectionAnchor } from "@/components/section";
import { FCTL } from "@/tools/types";

export const LandingAbout: FCTL = ({ t }) => (
  <>
    <SectionAnchor id="about" />
    <div className="w-100 py-16 bg-armaqi-pink flex flex-col items-center">
      <div className="max-w-screen-md text-white text-left text-2xl font-light mx-8 md:mx-0">
        {t('about')}
      </div>
    </div>
  </>
);
