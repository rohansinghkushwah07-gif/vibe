import "@/app/globals.css";
import "@/lib/setup-localstorage";
import { TRPCReactProvider } from "@/trpc/client";

export const metadata = {
  title: "Vibe",
  description: "A Vibe app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
