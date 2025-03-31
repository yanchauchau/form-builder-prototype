import { createSystem, defaultConfig } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";

export const ButtonCustom = chakra("button", {
  base: {
    padding: "8px 16px",
    borderRadius: "4px",
    display:"inline-flex",
    alignItems: "center",
    gap: "xxs",
    cursor:"pointer",
    fontWeight:"500",
    _hover: { bg: "blue.700" },
  },
  variants: {
    visual: {
      solid: { bg: "primary.main", rounded: "md", color: "white" },
      outline: {
        bg: "white",
        borderColor: "primary.main",
        rounded: "md",
        borderWidth: "1px",
        color: "primary.main",
        _hover: { bg: "primary.light", color: "primary.main" },
      },
    },
    size: {
      sm: { px: "xs", py: "xxs", fontSize: "12px" },
      md: { px: "s", py: "xxs", fontSize: "16px" },
      lg: { px: "l", py: "xs", fontSize: "16px" },
    },
  },
  defaultVariants: {
    visual: "solid",
    size: "lg",
  },
});

export const LabelCustom = chakra("label", {
  base: { fontSize: "sm", color: "gray.500" },
});

export const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      spacing: {
        xxs: { value: "4px" },
        xs: { value: "8px" },
        s: { value: "16px" },
        m: { value: "24px" },
        l: { value: "32px" },
        xl: { value: "40px" },
      },
      colors: {
        colorTest: { value: "#d6bd00" },
        primary: {
          main: { value: " #0064ce" },
          light: { value: "rgb(214, 231, 248)" },
        },
      },
      fonts: {
        heading: { value: "Inter, sans-serif" },
        body: { value: "Inter, sans-serif" },
      },
    },
  },
});
