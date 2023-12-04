import classNames from "classnames";
import { FC, ReactNode } from "react";

export const SectionHeader: FC<{
    className?: string;
    children: string;
    key: string;
}> = ({ children, className }) => {
    return (
      <h2 className={classNames("text-3xl font-bold", className)}>
        {children}
      </h2>
    );
};

export const Section: FC<{
    className?: string;
    children: ReactNode;
    key: string;
    title: string;
    thin?: boolean;
}> = ({ children, className, key, thin, title }) => {
    return (
      <div className={classNames("container my-24 mx-auto md:px-6", thin ? 'max-w-screen-md' : 'max-w-screen-lg', className)}>
        <SectionHeader className="mb-16 text-center" key={key}>
          {title}
        </SectionHeader>

        {children}
      </div>
    );
};
