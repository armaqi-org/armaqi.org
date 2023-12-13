import classNames from "classnames";
import { FC, ReactNode } from "react";
import { CopyLink } from "@/components/copy-link";

export const SectionAnchor: FC<{
    id: string;
}> = ({ id }) => {
    return (
      <div className="relative">
        <div id={id} className="absolute top-0 md:-top-[95px]" />
      </div>
    );
};

export const SectionHeader: FC<{
    className?: string;
    children: string;
    id: string;
}> = ({ children, className, id }) => {
    return (
      <h2  className={classNames("text-3xl md:text-4xl font-bold relative", className)}>
        {children} <CopyLink id={id} />
        <div id={id} className="absolute top-0 md:top-[95px]" />
      </h2>
    );
};

export const Section: FC<{
    className?: string;
    contentClassName?: string;
    children: ReactNode;
    id: string;
    title: string;
    thin?: boolean;
    center?: boolean;
}> = ({ center, children, className, contentClassName, id, thin, title }) => {
    return (
      <>
        <SectionAnchor id={id} />

        <div className={classNames("container my-12 md:my-24 mx-auto px-4 md:px-6", thin ? 'max-w-screen-md' : 'max-w-screen-xl', className)}>
          <SectionHeader className="mb-16 text-center" id={id}>
            {title}
          </SectionHeader>

          <div className={classNames('px-4', contentClassName, { 'flex flex-col items-center': center })}>
            {children}
          </div>
        </div>
      </>
    );
};
