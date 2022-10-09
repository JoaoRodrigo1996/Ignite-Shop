import { Handbag } from "phosphor-react";
import { useContext } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { ShopCardContext } from "../../contexts/ShopCardContext";

import {
  ShopCardContainer,
  Button,
  ShopCardQuantity,
  StitchesButtonProps,
} from "./styles";

type ShopCardProps = {
  color: "green" | "gray";
  size: "sm" | "md";
  iconSize: number;
  quantity?: number;
} & StitchesButtonProps;

export function ShopCard({
  iconSize,
  size,
  color,
  quantity,
  ...rest
}: ShopCardProps) {
  return (
    <ShopCardContainer>
      <Button color={color} size={size} {...rest}>
        <Handbag size={iconSize} weight="bold" />
        <ShopCardQuantity>
          <span>{quantity}</span>
        </ShopCardQuantity>
      </Button>
    </ShopCardContainer>
  );
}
