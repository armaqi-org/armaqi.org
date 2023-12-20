import { FC } from "react";

export const Background: FC = () => (
  <div className="fixed h-full w-full -z-10 bg-cover" style={{ backgroundImage: 'url(/bg.png)' }} />
);
