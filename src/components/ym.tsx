/* eslint-disable react/no-danger */

const getScriptBody = (key: string) => `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(${key}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
`;

export const YandexMetrika = () => {
    const key = process.env.NEXT_PUBLIC_YANDEX_METRICA;
    return key ? (
      <>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: getScriptBody(key) }} />
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${key}`} style={{ position: 'absolute', left: '-9999px;' }} alt="" />
          </div>
        </noscript>
      </>
    ) : null;
};