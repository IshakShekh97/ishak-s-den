"use client";

import { createRef, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

interface ImageMouseTrailProps {
  items: string[];
  children?: ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
  disableOnContentHover?: boolean;
  contentSelector?: string;
}
export default function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false,
  disableOnContentHover = true,
  contentSelector = ".main-content, button, a, input, textarea, [role='button']",
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()));
  const currentZIndexRef = useRef(1);

  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  const isHoveringContent = (element: Element | null): boolean => {
    if (!element || !disableOnContentHover) return false;

    // Check if the element itself matches the selector
    if (element.matches(contentSelector)) return true;

    // Check if any parent element matches the selector
    let parent = element.parentElement;
    while (parent) {
      if (parent.matches(contentSelector)) return true;
      parent = parent.parentElement;
    }

    return false;
  };

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;
    console.log(refs.current[refs.current?.length - 1]);

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    image.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1500);
    }
    last = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - last.x, y - last.y);
  };
  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  type Point = { clientX: number; clientY: number };
  const handleOnMove = (e: Point, event: MouseEvent | TouchEvent) => {
    // Check if we're hovering over content that should disable the trail
    const target = event.target as Element;
    if (isHoveringContent(target)) {
      return; // Don't activate trail when hovering over content
    }

    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
      const lead = refs.current[globalIndex % refs.current.length].current;
      const tail =
        refs.current[(globalIndex - maxNumberOfImages) % refs.current.length]
          ?.current;
      if (lead) activate(lead, e.clientX, e.clientY);
      if (tail) deactivate(tail);
      globalIndex++;
    }
  };

  return (
    <section
      onMouseMove={(e) =>
        handleOnMove({ clientX: e.clientX, clientY: e.clientY }, e.nativeEvent)
      }
      onTouchMove={(e) => {
        if (e.touches && e.touches.length > 0) {
          const touch = e.touches[0];
          handleOnMove(
            { clientX: touch.clientX, clientY: touch.clientY },
            e.nativeEvent
          );
        }
      }}
      ref={containerRef}
      className={cn(
        "relative grid h-[600px] w-full place-content-center overflow-hidden rounded-lg ",
        className
      )}
    >
      {items.map((item, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          className={cn(
            "opacity:0 data-[status='active']:ease-out-expo absolute -translate-x-[50%] -translate-y-[50%]  scale-0 rounded-3xl object-cover transition-transform duration-300  data-[status='active']:scale-100   data-[status='active']:opacity-100 data-[status='active']:duration-500 ",
            imgClass
          )}
          data-index={index}
          data-status="inactive"
          src={item}
          alt={`image-${index}`}
          ref={refs.current[index]}
        />
      ))}
      {children}
    </section>
  );
}
