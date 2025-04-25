import Header from "@/components/header";


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-full">
        <Header/>
        { children }
      </div>
    );
  }