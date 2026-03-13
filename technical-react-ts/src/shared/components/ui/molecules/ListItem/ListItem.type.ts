import type { LiHTMLAttributes } from "react";

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  selected?: boolean;
  $disabled?: boolean;
};
