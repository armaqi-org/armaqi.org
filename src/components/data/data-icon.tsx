import classNames from "classnames";
import { FC, ReactElement } from "react";

export const DataIcon: FC<{
    className?: string;
    icon: ReactElement<any>;
    data: string | number | null | undefined;
}> = ({ className, data, icon }) => {
    const isEmpty = !data && typeof data !== "number";
    return isEmpty ? null : (
      <div className={classNames(className, "flex flex-row items-center justify-start")}>
        {icon}<span className="ml-2">{data}</span>
      </div>
    );
};
