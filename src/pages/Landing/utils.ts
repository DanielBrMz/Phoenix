import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Si `ClassValue` no es un tipo válido en `clsx`, define uno similar:
type ClassValue = string | number | boolean | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
