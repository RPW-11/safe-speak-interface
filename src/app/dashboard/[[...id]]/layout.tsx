import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex flex-col h-screen">
          <Header/>
          {children}
      </div>
    );
  }