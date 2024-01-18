import domtoimage from "dom-to-image-more";
import { useState } from "react";

export default function Asciify({ meta, prev, next }) {
  delete meta.valid_transfers;

  let charset = JSON.stringify(meta);
  const [dataUrl, setDataUrl] = useState("");
  const [custom, setCustom] = useState(0);

  while (charset.length < 18_000) {
    const curr = charset.length;
    charset += curr > 1000 ? charset.slice(0, 1000) : charset;
  }

  const handleOnClick = async (e) => {
    const uri = await domtoimage.toPng(e.target, {
      width: 800,
      height: 800,
      bgcolor: "#000",
      style: {
        padding: 0,
        margin: 0,
      },
    });

    setDataUrl(uri);
  };

  const handleGo = async (e) => {
    e.preventDefault();

    window.location.href = `/${custom}`;
  };

  const numberFormat = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const isNotImage =
    !meta.mimetype.startsWith("image/") || meta.mimetype === "image/svg+xml";

  return (
    <>
      <div className="my-5 flex w-full items-center justify-between">
        <a href={`/${prev}`} className="bg-gray-200 p-2">
          ← #{numberFormat(prev)}
        </a>
        <form method="GET" action={`/${custom}`}>
          <input
            autoFocus={true}
            type="text"
            id="customid"
            required
            min="0"
            placeholder="Ethscription ID"
            onInput={(e) => setCustom(e.target.value)}
            className="w-40 min-w-0 border bg-gray-900/70 px-2 py-1.5 text-gray-200 outline-none"
          />
          <button type="submit" className="border bg-gray-200 px-2 py-1.5">
            Go
          </button>
        </form>
        <a
          href={dataUrl}
          target="_blank"
          download={`astro-asciify-art-${meta.transaction_hash}.png`}
          className="bg-gray-200 p-2"
          onClick={handleOnClick}
        >
          Download
        </a>
        <a href={`/${next}`} className="bg-gray-200 p-2">
          #{numberFormat(next)} →
        </a>
      </div>
      <div className="m-0 mb-8 flex items-center justify-center overflow-hidden border border-gray-100 p-2">
        {isNotImage && (
          <div className="w-[800px] text-center text-gray-100">
            Not an image, try another
          </div>
        )}
        {!isNotImage && <div className="asciiart art">{charset}</div>}
      </div>
    </>
  );
}
