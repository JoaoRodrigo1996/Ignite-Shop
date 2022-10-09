import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import Image from "next/future/image";
import { X } from "phosphor-react";
import { useContext, useState } from "react";

import camiseta1 from "../../assets/camisetas/1.png";
import { CartContext } from "../../contexts/CartContext";
import { CartButton } from "../CartButton";

import {
  CartCheckoutShop,
  CartClose,
  CartContent,
  CartProduct,
  CartProductDetails,
  CartProductImage,
  CheckoutDetails,
} from "./styles";

export function Cart() {
  const { cartItems, removeCartItem, cartTotal } = useContext(CartContext);
  const cartQuantity = cartItems.length;

  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar para o checkout");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Sacola de compras</h2>
          <section>
            {cartQuantity <= 0 && <p>Seu carrinho está fazio :( </p>}

            {cartItems.map((cartItem) => (
              <CartProduct key={cartItem.id}>
                <CartProductImage>
                  <Image
                    src={cartItem.imageUrl}
                    width={100}
                    height={96}
                    alt=""
                  />
                </CartProductImage>
                <CartProductDetails>
                  <p>{cartItem.name}</p>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => removeCartItem(cartItem.id)}>
                    Remover
                  </button>
                </CartProductDetails>
              </CartProduct>
            ))}
          </section>
          <CartCheckoutShop>
            <CheckoutDetails>
              <div>
                <span>Quantidade</span>
                <p>
                  {cartQuantity} {cartQuantity > 1 ? "itens" : "item"}
                </p>
              </div>
              <div>
                <span>Valor total</span>
                <p>{formattedCartTotal}</p>
              </div>
            </CheckoutDetails>
            <button
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
              onClick={handleCheckout}
            >
              Finalizar compra
            </button>
          </CartCheckoutShop>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
