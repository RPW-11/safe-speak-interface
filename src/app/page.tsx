import { Button } from "@/components/ui/button";
import PromptForm from "@/components/prompt-form/prompt-form";
import RagToggle from "@/components/prompt-form/rag-toggle";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <PromptForm/>
        <Button>Primary</Button>
        <Button variant={"secondary"}>Secondary</Button>
        <Button variant={"outline"}>Outline</Button>
        <Button variant={"link"}>Link</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"destructive"}>Destructive</Button>
        <RagToggle/>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Taxing Laughter: The Joke Tax Chronicles
        </h1>
      </main>
    </div>
  );
}
