"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setIsActive(true);
    const onUp = () => setIsActive(false);
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return setIsHover(false);
      setIsHover(Boolean(t.closest && t.closest("a,button,input,textarea,select,[role=\"button\"],.cursor-enlarge")));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        className={"cursor-dot " + (isActive ? "cursor-active " : "") + (isHover ? "cursor-hover" : "")}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={"cursor-ring " + (isActive ? "cursor-active " : "") + (isHover ? "cursor-hover" : "")}
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  );
}
