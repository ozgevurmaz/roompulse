import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatTypingUsers(users: string[]): string {
    if (users.length === 0) return ""
    if (users.length === 1) return `${users[0]} is typing...`
    if (users.length === 2) return `${users[0]} and ${users[1]} are typing...`

    const last = users.pop()
    return `${users.join(", ")}, and ${last} are typing...`
}

export const formatTime = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    })
}

export const formatSeconds = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};