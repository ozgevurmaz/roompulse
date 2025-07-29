import { SocketProvider } from "@/components/provider/socketProvider";

export default function RoomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SocketProvider>
            <div className="w-full">
                {children}
            </div>
        </SocketProvider>
    );
}
