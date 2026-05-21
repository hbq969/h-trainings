import { loadFont } from "@remotion/google-fonts/Syne";
import { loadFont as loadSpaceMono } from "@remotion/google-fonts/SpaceMono";

export const fontDisplay = loadFont("normal", { weights: ["600", "700", "800"] })
  .fontFamily;
export const fontMono = loadSpaceMono("normal", { weights: ["400", "700"] })
  .fontFamily;

export const colors = {
  bg: "#1a1a2e",
  blue: "#0066ff",
  dark: "#12121f",
  neon: "#d4ff00",
  cyan: "#00ffcc",
  magenta: "#ff00aa",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.65)",
  cardBg: "rgba(255,255,255,0.03)",
  cardBorder: "rgba(255,255,255,0.06)",
  blueBg: "rgba(0,102,255,0.15)",
  blueBorder: "rgba(0,102,255,0.3)",
  cyanBg: "rgba(0,255,204,0.08)",
  cyanBorder: "rgba(0,255,204,0.25)",
  neonBg: "rgba(212,255,0,0.08)",
  neonBorder: "rgba(212,255,0,0.25)",
};

export const FPS = 30;
export const SLIDE_DURATION = 150; // 5 seconds per slide
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const halftoneStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity: 0.04,
  backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
  backgroundSize: "8px 8px",
};
