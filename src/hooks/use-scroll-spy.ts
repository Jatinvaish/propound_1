import { useState, useEffect } from "react";

export function useScrollSpy(
  sectionIds: string[],
  options: IntersectionObserverInit = { 
    rootMargin: "-100px 0px -80% 0px"
  }
) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeId;
}
