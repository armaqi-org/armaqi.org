'use client';
import { FC } from "react";

export const CopyLink: FC<{ id: string }> = ({ id }) => {
    const onClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            let href = location.href.split('#')[0] + '#' + id;
            navigator.clipboard.writeText(href).catch(() => {});
        } catch {}
    };
    
    return (
      <span title="copy link" className="hidden opacity-5 hover:opacity-20 text-black cursor-pointer" onClick={onClick as any}>#</span>
    );
};