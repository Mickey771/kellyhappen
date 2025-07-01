import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind classes conditionally and safely
 * - Uses `clsx` for conditional logic
 * - Uses `tailwind-merge` to handle class conflicts (e.g. `px-2` vs `px-4`)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
