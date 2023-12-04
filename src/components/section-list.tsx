import classNames from "classnames";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const SectionList: FC<{
    t: FC<{ t: ReturnType<typeof useTranslations>}>;
    len: number;
    tPrefix?: string;
    space?: string;
}> = ({ len, space, t, tPrefix = 'item' }) => {
    return (
      <ul className="list-disc text-xl">
        {new Array(len).fill(0).map((_, indLow) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={indLow} className={classNames({ 'mt-8': indLow })}>
            <span className="font-semibold">{t(`${tPrefix}${indLow}:title` as any)}</span>
            <span className="font-light">{space ?? ''}{t(`${tPrefix}${indLow}:text` as any)}</span>
          </li>
        ))}
      </ul>
    );
};