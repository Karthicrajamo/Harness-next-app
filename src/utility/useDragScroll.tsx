import { useRef, useEffect } from "react";

export default function useDragScroll() {
  const ref = useRef<HTMLDivElement | null>(null);

  // persistent values (do NOT reset on every render)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    const mouseDown = (e: MouseEvent) => {
      isDown.current = true;
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
      slider.classList.add("cursor-grabbing");
    };

    const mouseLeave = () => {
      isDown.current = false;
      slider.classList.remove("cursor-grabbing");
    };

    const mouseUp = () => {
      isDown.current = false;
      slider.classList.remove("cursor-grabbing");
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      slider.scrollLeft = scrollLeft.current - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    slider.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return ref;
}
