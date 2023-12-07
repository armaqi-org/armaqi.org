import classNames from "classnames";
import { FC, ReactNode } from "react";
import { CopyLink } from "@/components/copy-link";

export const SectionHeader: FC<{
    className?: string;
    children: string;
    id: string;
}> = ({ children, className, id }) => {
    return (
      <h2 id={id} className={classNames("text-3xl font-bold px-4", className)}>
        {children} <CopyLink id={id} />
      </h2>
    );
};

export const Section: FC<{
    className?: string;
    children: ReactNode;
    id: string;
    title: string;
    thin?: boolean;
}> = ({ children, className, id, thin, title }) => {
    return (
      <div className={classNames("container my-24 mx-auto md:px-6", thin ? 'max-w-screen-md' : 'max-w-screen-lg', className)}>
        <SectionHeader className="mb-16 text-center" id={id}>
          {title}
        </SectionHeader>

        {children}
      </div>
    );
};
