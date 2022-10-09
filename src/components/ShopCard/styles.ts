import React from "react";

import { styled } from "../../styles";

export const ShopCardContainer = styled("div", {
  position: "relative",
});

export const Button = styled("button", {
  border: 0,
  borderRadius: 6,
  padding: "0.75rem",
  outline: "none",

  variants: {
    color: {
      green: {
        backgroundColor: "$green500",
        "&:hover": {
          backgroundColor: "$green300",
        },
      },
      gray: {
        backgroundColor: "$gray800",
      },
    },
    size: {
      sm: {
        width: "48px",
        height: "48px",
      },
      md: {
        width: "56px",
        height: "56px",
      },
    },
  },

  svg: {
    color: "$gray300",
  },
});

export const ShopCardQuantity = styled("div", {
  position: "absolute",
  right: "-7px",
  top: "-7px",
  width: "24px",
  height: "24px",
  backgroundColor: "$green500",
  borderRadius: "100%",
  border: "3px solid #121214",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  span: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    lineHeight: 1.6,
    color: "$white",
  },
});

export type StitchesButtonProps = React.ComponentProps<typeof Button>;
