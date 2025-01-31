import classNames from "classnames";
import { FC, ReactNode } from "react";

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
    primary?: boolean;
}> = ({ children, className, primary }) => {
    const HeaderComponent: FC<{ className: string; children: ReactNode }> = ({ children, className }) =>
        primary
            ? <h1 className={className}>{children}</h1>
            : <h2 className={className}>{children}</h2>;

    return (
      <HeaderComponent className={classNames("text-3xl md:text-4xl font-bold relative", className)}>
        {children}
      </HeaderComponent>
    );
};

export const Section: FC<{
    className?: string;
    contentClassName?: string;
    children: ReactNode;
    id: string;
    title: string;
    thin?: boolean;
    primary?: boolean;
    center?: boolean;
}> = ({ center, children, className, contentClassName, id, primary, thin, title }) => {
    return (
      <>
        <SectionAnchor id={id} />

        <div className={classNames("container my-12 md:my-24 mx-auto px-4 md:px-6", thin ? 'max-w-screen-md' : 'max-w-screen-xl', className)}>
          <SectionHeader className="mb-16 text-center" id={id} primary={primary}>
            {title}
          </SectionHeader>

          <div className={classNames('px-4', contentClassName, { 'flex flex-col items-center': center })}>
            {children}
          </div>
        </div>
      </>
    );
};
