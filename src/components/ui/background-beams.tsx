import React, { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

type MixBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

interface BackgroundBeamsProps {
  children?: ReactNode;
  gradientBackgroundStart: string;
  gradientBackgroundEnd: string;
  firstColor: string;
  secondColor: string;
  thirdColor: string;
  fourthColor: string;
  fifthColor: string;
  pointerColor: string;
  size: string;
  blendingValue: MixBlendMode;
}

const BackgroundBeams: React.FC<BackgroundBeamsProps> = ({
  children,
  gradientBackgroundStart,
  gradientBackgroundEnd,
  firstColor,
  secondColor,
  thirdColor,
  fourthColor,
  fifthColor,
  pointerColor,
  size,
  blendingValue,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const beams = beamsRef.current;

    if (!container || !beams) return;

    const updateBeamsPosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      beams.style.setProperty("--x", `${x}px`);
      beams.style.setProperty("--y", `${y}px`);
    };

    container.addEventListener("mousemove", updateBeamsPosition);

    return () => {
      container.removeEventListener("mousemove", updateBeamsPosition);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="background-beams"
      style={{
        background: `linear-gradient(${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        width: size,
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          ref={beamsRef}
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            mixBlendMode: blendingValue,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient
              id="grad"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={pointerColor} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g fill="none" stroke="url(#grad)" strokeOpacity="0.3">
            <circle cx="var(--x)" cy="var(--y)" r="30" stroke={firstColor} />
            <circle cx="var(--x)" cy="var(--y)" r="60" stroke={secondColor} />
            <circle cx="var(--x)" cy="var(--y)" r="90" stroke={thirdColor} />
            <circle cx="var(--x)" cy="var(--y)" r="120" stroke={fourthColor} />
            <circle cx="var(--x)" cy="var(--y)" r="150" stroke={fifthColor} />
          </g>
        </svg>
      </motion.div>
      {children}
    </div>
  );
};

export default BackgroundBeams;
