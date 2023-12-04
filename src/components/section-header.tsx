import classNames from "classnames";
import { FC } from "react";

export const SectionHeader: FC<{ className?: string, children: string, key: string }> = ({ children, className }) => {
    return (
      <h2 className={classNames("text-3xl font-bold text-center", className)}>
        {children}
      </h2>
    );
};