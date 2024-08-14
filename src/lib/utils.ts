import { fromUnixTime, isBefore } from 'date-fns';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const validateTokenTime = (exp: number) => {
    const expirationDate = fromUnixTime(exp);
    const now = new Date();

    return isBefore(now, expirationDate);
};