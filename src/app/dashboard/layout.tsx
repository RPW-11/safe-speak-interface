import Header from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ScrollArea className="h-full overflow-auto">
        <Header/>
        { children }
      </ScrollArea>
    );
  }