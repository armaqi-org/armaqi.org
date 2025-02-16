import classNames from "classnames";
import { FC } from "react";

export const SectionList: FC<{
    dictSection: Record<string, string>;
    len: number;
    tPrefix?: string;
    space?: string;
}> = ({ dictSection, len, space, tPrefix = 'item' }) => {
    return (
      <ul className="list-disc text-xl mx-3 md:mx-0">
        {new Array(len).fill(0).map((_, indLow) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={indLow} className={classNames({ 'mt-8': indLow })}>
            <span className="font-semibold">{dictSection[`${tPrefix}${indLow}:title`]}</span>
            <span className="font-light">{space ?? ''}{dictSection[`${tPrefix}${indLow}:text`]}</span>
          </li>
        ))}
      </ul>
    );
};