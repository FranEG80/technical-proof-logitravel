import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = 'primary' | 'outline';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: ButtonVariant;
  $iconOnly?: boolean;
};
