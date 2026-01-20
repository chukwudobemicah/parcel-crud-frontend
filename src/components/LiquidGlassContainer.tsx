import React, { forwardRef } from "react";
import { LiquidGlass } from "@liquidglass/react";
import { cn } from "../utils/functions";

/**
 * Reusable LiquidGlassContainer
 * - Built with TypeScript
 * - Thin wrapper around @liquidglass/react with friendly defaults
 * - Accepts all standard div props (className, style, id, etc.)
 */

export interface LiquidGlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Liquid glass visual props (all optional) */
  borderRadius?: number;
  blur?: number;
  contrast?: number;
  brightness?: number;
  saturation?: number;
  shadowIntensity?: number;
  displacementScale?: number;
  elasticity?: number;
  zIndex?: number;
  /** Optional container width/height can be provided via style or these props */
  width?: string | number;
  height?: string | number;
}

const DEFAULTS = {
  borderRadius: 16,
  blur: 0.35,
  contrast: 2,
  brightness: 1.05,
  saturation: 1.1,
  shadowIntensity: 0.24,
  displacementScale: 1,
  elasticity: 0.8,
  zIndex: 9999,
};

export const LiquidGlassContainer = forwardRef<
  HTMLDivElement,
  LiquidGlassContainerProps
>(
  (
    {
      children,
      className = "",
      style,
      borderRadius = DEFAULTS.borderRadius,
      blur = DEFAULTS.blur,
      contrast = DEFAULTS.contrast,
      brightness = DEFAULTS.brightness,
      saturation = DEFAULTS.saturation,
      shadowIntensity = DEFAULTS.shadowIntensity,
      displacementScale = DEFAULTS.displacementScale,
      elasticity = DEFAULTS.elasticity,
      zIndex = DEFAULTS.zIndex,
      width,
      height,
      ...rest
    },
    ref,
  ) => {
    // Build container inline styles — allow user-supplied style to override
    const containerStyle: React.CSSProperties = {
      width: width ?? style?.width ?? "",
      height: height ?? style?.height ?? "",
      position: "relative",
      overflow: "hidden",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(`liquid-glass-wrapper w-fit overflow-hidden`, className)}
        style={containerStyle}
        {...rest}
      >
        <LiquidGlass
          borderRadius={borderRadius}
          blur={blur}
          contrast={contrast}
          brightness={brightness}
          saturation={saturation}
          shadowIntensity={shadowIntensity}
          displacementScale={displacementScale}
          elasticity={elasticity}
          zIndex={zIndex}
          // className can be used to style the internal glass canvas if needed
          className="liquid-glass-inner"
        >
          {/* Ensure children are wrapped so layout is predictable */}
          <div
            className="liquid-glass-content"
            style={{ width: "100%", height: "100%" }}
          >
            {children}
          </div>
        </LiquidGlass>
      </div>
    );
  },
);

LiquidGlassContainer.displayName = "LiquidGlassContainer";

export default LiquidGlassContainer;
