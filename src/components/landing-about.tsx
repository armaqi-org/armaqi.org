import { FCTL } from "@/tools/types";

export const LandingAbout: FCTL = ({ t }) => (
  <div id="about" className="w-100 py-16 bg-armaqi-pink flex flex-col items-center">
    <div className="max-w-screen-md text-white text-left leading-10 text-2xl font-light mx-8 md:mx-0">
      {t('about')}
    </div>
  </div>
);
