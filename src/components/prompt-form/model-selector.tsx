import { Llm } from "@/types/model"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ChevronDown, ShieldEllipsis } from "lucide-react"


const ModelSelector = () => {
    const dummyData: Llm[] = [
        { id: "abc", name: "Gemini 2.5 Flash", description: "Fast performance model" },
        { id: "bcd", name: "Fine tuned model", description: "Fine tuned on some data" },
        { id: "trf", name: "DistilGPT", description: "Quick inference" }
    ]

    return (
        <TooltipProvider>
        <Tooltip delayDuration={300}>
            <Popover>
            <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                <Button variant="ghost" className="rounded-lg flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <ShieldEllipsis />
                    Gemini 2.5 Flash
                    </div>
                    <ChevronDown className="text-muted-foreground" />
                </Button>
                </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent align="center">
                <p>Select the model</p>
            </TooltipContent>
            <PopoverContent align="end">
                {dummyData.map(model => (
                    <Button key={model.id} variant="ghost" className="w-full relative h-fit">
                        <div className="w-full text-start">
                            <h4 className="scroll-m-20 font-semibold tracking-tight">
                                {model.name}
                            </h4>
                            <p
                                className="text-sm text-muted-foreground whitespace-normal"
                                title={model.description}
                            >
                                {model.description}
                            </p>
                        </div>
                  </Button>
                ))}
            </PopoverContent>
            </Popover>
        </Tooltip>
        </TooltipProvider>
    )
}

export default ModelSelector