/* eslint-disable react/no-danger */
/* eslint-disable @next/next/no-img-element */

const getScriptBody = (key: string) => `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${key}');
`;

export const GoogleTag = () => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_TAG;
    return key ? (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${key}`} />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: getScriptBody(key) }} />
      </>
    ) : null;
};