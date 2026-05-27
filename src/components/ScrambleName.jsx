import { useState, useEffect } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function ScrambleName({ text }) {
  const [chars, setChars] = useState(() =>
    text
      .split("")
      .map((c) =>
        c === " "
          ? " "
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
      ),
  );
  useEffect(() => {
    const ts = [],
      ivs = [];
    text.split("").forEach((ch, i) => {
      if (ch === " ") return;
      // 400ms lets hero entrance animations settle; 55ms/char staggers the cascade across the name
      const t = setTimeout(
        () => {
          let n = 0;
          const iv = setInterval(() => {
            n++;
            if (n >= 10) {
              setChars((p) => {
                const a = [...p];
                a[i] = ch;
                return a;
              });
              clearInterval(iv);
            } else {
              setChars((p) => {
                const a = [...p];
                a[i] =
                  SCRAMBLE_CHARS[
                    Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                  ];
                return a;
              });
            }
          }, 45);
          ivs.push(iv);
        },
        400 + i * 55,
      );
      ts.push(t);
    });
    return () => {
      ts.forEach(clearTimeout);
      ivs.forEach(clearInterval);
    };
  }, [text]);
  return <span aria-label={text}>{chars.join("")}</span>;
}
