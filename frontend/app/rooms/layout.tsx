import { Providers } from "@/components/provider/provider";

export default function RoomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            {children}
        </Providers>
    );
}
