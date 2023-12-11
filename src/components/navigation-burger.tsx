'use client';
import { FC, useEffect } from "react";

const burgerClass = 'menu-burger';

export const NavigationBurger: FC = () => {
    useEffect(() => {
        const listener = () => {
            if (document.body.classList.contains(burgerClass)) {
                document.body.classList.remove(burgerClass);
            }
        };
        document.body.addEventListener('click', listener);
        window.addEventListener('resize', listener);

        return () => {
            document.body.removeEventListener('click', listener);
            window.removeEventListener('resize', listener);
        };
    }, []);
    const burgerClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        document.body.classList.add('menu-burger');
    };
    
    return (
      <div className="md:hidden menu-burger:hidden border fixed top-4 left-4 z-top p-2 rounded bg-white cursor-pointer" onClick={burgerClick as any}>
        <svg
          height="32px"
          width="32px"
          viewBox="0 0 32 32"
        >
          <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
        </svg>
      </div>
    );
};