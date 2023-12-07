'use client';
import { FC, useEffect } from "react";

const scrollClass = 'menu-top';

export const NavigationScroll: FC = () => {
    useEffect(() => {
        const listener = () => {
            const showScrolled = window.scrollY > 10;
            const isScrolled = !document.body.classList.contains(scrollClass);

            if (showScrolled && !isScrolled) {
                document.body.classList.remove(scrollClass);
            } else if (!showScrolled && isScrolled) {
                document.body.classList.add(scrollClass);
            }
        };
        document.addEventListener("scroll", listener);
        listener();

        return () => {
            document.removeEventListener('scroll', listener);
        };
    }, []);

    return null;
};