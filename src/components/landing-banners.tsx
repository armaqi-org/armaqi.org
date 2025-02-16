import { FCTL } from "@/tools/types";

export const LandingYerevan: FCTL = ({ dict }) => (
  <div
    className="w-full h-screen flex items-center justify-center bg-cover"
    style={{ backgroundImage: "url('/yerevan.jpg')" }}
  >
    <div className="text-white font-semibold text-center px-6 text-3xl">{dict.Landing.ararat}</div>
  </div>
);

export const LandingDilijan: FCTL = ({ dict }) => (
  <div
    className="w-full h-screen flex flex-col items-center justify-end bg-cover"
    style={{ backgroundImage: "url('/mimino.jpg')" }}
  >
    <div className="text-white text-center text-xl max-w-screen-md mb-8">{dict.Landing.mimino0}</div>
    <div className="text-white text-center text-xl max-w-screen-md">{dict.Landing.mimino1}</div>
    <div className="h-[15%]" />
  </div>
);
