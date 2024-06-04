import { useTranslations } from "next-intl";
import { FC } from 'react';

const IconFacebook: FC<{ className?: string }> = ({ className }) => (
  <svg role="presentation"
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100c27.6142 0 50-22.3858 50-50S77.6142 0 50 0 0 22.3858 0 50s22.3858 50 50 50Zm3.431-73.9854c-2.5161.0701-5.171.6758-7.0464 2.4577-1.5488 1.4326-2.329 3.5177-2.5044 5.602-.0534 1.4908-.0458 2.9855-.0382 4.4796.0058 1.1205.0115 2.2407-.0085 3.3587-.6888.005-1.3797.0036-2.0709.0021-.9218-.0019-1.8441-.0038-2.7626.0096 0 .8921.0013 1.7855.0026 2.6797.0026 1.791.0052 3.5853-.0026 5.3799.9185.0134 1.8409.0115 2.7627.0096.6912-.0015 1.382-.0029 2.0708.0021.0155 3.5565.0127 7.1128.0098 10.669-.0036 4.4452-.0072 8.8903.0252 13.3354 1.8903-.0134 3.7765-.0115 5.6633-.0095 1.4152.0014 2.8306.0028 4.2484-.0022.0117-4.0009.0088-7.9986.0058-11.9963-.0029-3.9979-.0058-7.9957.0059-11.9964.9533-.005 1.9067-.0036 2.86-.0021 1.2713.0019 2.5425.0038 3.8137-.0096.396-2.679.7335-5.3814.9198-8.0947-1.2576-.0058-2.5155-.0058-3.7734-.0058-1.2578 0-2.5157 0-3.7734-.0059 0-.4689-.0007-.9378-.0014-1.4066-.0022-1.4063-.0044-2.8123.0131-4.2188.198-1.0834 1.3158-1.9104 2.3992-1.8403h5.1476c.0117-2.8069.0117-5.602 0-8.4089-.6636 0-1.3273-.0007-1.9911-.0014-1.9915-.0022-3.9832-.0044-5.975.0131Z"
      fill="#ffffff"
    />
  </svg>
);

const IconInstagram: FC<{ className?: string }> = ({ className }) => (
  <svg role="presentation"
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM25 39.3918C25 31.4558 31.4566 25 39.3918 25H60.6082C68.5442 25 75 31.4566 75 39.3918V60.8028C75 68.738 68.5442 75.1946 60.6082 75.1946H39.3918C31.4558 75.1946 25 68.738 25 60.8028V39.3918ZM36.9883 50.0054C36.9883 42.8847 42.8438 37.0922 50.0397 37.0922C57.2356 37.0922 63.0911 42.8847 63.0911 50.0054C63.0911 57.1252 57.2356 62.9177 50.0397 62.9177C42.843 62.9177 36.9883 57.1252 36.9883 50.0054ZM41.7422 50.0054C41.7422 54.5033 45.4641 58.1638 50.0397 58.1638C54.6153 58.1638 58.3372 54.5041 58.3372 50.0054C58.3372 45.5066 54.6145 41.8469 50.0397 41.8469C45.4641 41.8469 41.7422 45.5066 41.7422 50.0054ZM63.3248 39.6355C65.0208 39.6355 66.3956 38.2606 66.3956 36.5646C66.3956 34.8687 65.0208 33.4938 63.3248 33.4938C61.6288 33.4938 60.2539 34.8687 60.2539 36.5646C60.2539 38.2606 61.6288 39.6355 63.3248 39.6355Z"
      fill="#ffffff"
    />
  </svg>
);

const IconTelegram: FC<{ className?: string }> = ({ className }) => (
  <svg role="presentation"
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z"
      fill="#ffffff"
    />
  </svg>
);

const IconEmail: FC<{ className?: string }> = ({ className }) => (
  <svg role="presentation"
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM51.8276 49.2076L74.191 33.6901C73.4347 32.6649 72.2183 32 70.8466 32H29.1534C27.8336 32 26.6576 32.6156 25.8968 33.5752L47.5881 49.172C48.8512 50.0802 50.5494 50.0945 51.8276 49.2076ZM75 63.6709V37.6286L53.4668 52.57C51.1883 54.151 48.1611 54.1256 45.9095 52.5066L25 37.4719V63.6709C25 65.9648 26.8595 67.8243 29.1534 67.8243H70.8466C73.1405 67.8243 75 65.9648 75 63.6709Z"
      fill="#ffffff"
    />
  </svg>
);

const links: [string, string, FC<{ className?: string }>][] = [
    ['facebook', 'https://www.facebook.com/armaqiorg/', IconFacebook],
    ['instagram', 'https://instagram.com/arm.aqi', IconInstagram],
    ['telegram', 'https://t.me/armaqi', IconTelegram],
    ['E-mail', 'mailto:armaqi.org@gmail.com?subject=armaqi.org', IconEmail],
];

export const LandingFooter = () => {
  const t = useTranslations('LandingFooter');

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-24 px-4 md:py-40 relative bg-opacity-60 bg-black"
    >
      <div className="absolute -z-10 bg-cover inset-0" style={{ backgroundImage: "url('/mountains.jpg')" }} />
      <div className="text-white text-center font-semibold text-3xl max-w-md mb-12">{t('title')}</div>
      <div className="text-white text-sm max-w-md font-light text-center mb-12">{t('text')}</div>

      <div className="flex space-x-8 mb-12">
        {links.map(([key, href, Icon]) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="nofollow noopener"

            aria-label={key}
          >
            <Icon className="w-12 h-12 md:w-16 md:h-16" />
          </a>
        ))}
      </div>

      <p className="text-center md:text-left font-thin text-xs text-white">Armaqi.org is a part of <a href="https://sensor.community" target="_blank">Sensor.Community</a> - a contributor-driven global civic tech network</p>
      <p className="text-center md:text-left font-thin text-xs text-white">{t('source')} - <a href="https://www.euro.who.int/__data/assets/pdf_file/0004/274963/Residential-Heating-Wood-Coal-Health-Impacts-ru.pdf" target="_blank">Residential heating with wood and coal: health impacts and policy options</a></p>
      <p className="text-center md:text-left font-thin text-xs text-white"><a href="https://www.who.int/data/gho/data/themes/air-pollution" target="_blank">Air pollution data portal</a></p>
    </div>
  );
};
