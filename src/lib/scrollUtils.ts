/**
 * Smoothly scrolls to an element with the given ID
 */
export function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) return;
  
    // Calculate position accounting for header height
    const headerHeight = document.querySelector("header")?.offsetHeight || 0;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;
  
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
  
  /**
   * Sets up smooth scrolling for all anchor links that point to IDs
   */
  export function setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href === "#") return;
  
        e.preventDefault();
        const targetId = href?.substring(1);
        if (targetId) scrollToElement(targetId);
      });
    });
  }
  
  /**
   * Sets up an Intersection Observer to add animations to elements when they enter viewport
   */
  export function setupScrollAnimations(): void {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    document.querySelectorAll(".animate-on-scroll").forEach((elem) => {
      observer.observe(elem);
    });
  }
  
  /**
   * Determines if an element is in the viewport
   */
  export function isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  /**
   * Determines how much of an element is visible in the viewport (0 to 1)
   */
  export function getVisibilityPercentage(element: HTMLElement): number {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // If the element is not visible at all
    if (rect.bottom < 0 || rect.top > windowHeight) {
      return 0;
    }
    
    // If the element is fully visible
    if (rect.top >= 0 && rect.bottom <= windowHeight) {
      return 1;
    }
    
    // Element is partially visible
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    return visibleHeight / rect.height;
  }