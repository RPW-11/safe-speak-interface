import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ChevronDown, CircleUserRound } from "lucide-react"
import { adversaryModels } from "@/constant"


const AgentSelector = () => {

    return (
        <TooltipProvider>
        <Tooltip delayDuration={300}>
            <Popover>
            <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-lg flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <CircleUserRound />
                    Lucas
                    </div>
                    <ChevronDown className="text-muted-foreground" />
                </Button>
                </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent align="center">
                <p>Select the agent</p>
            </TooltipContent>
            <PopoverContent align="start">
                {adversaryModels.map(agent => (
                    <Button key={agent.id} variant="ghost" className={`w-full relative h-fit ${agent.id === "abc" && 'bg-violet-100'}`}>
                        <div className="w-full text-start">
                            <h4 className="scroll-m-20 font-semibold tracking-tight">
                                {agent.name}
                            </h4>
                            <p
                                className="text-sm text-muted-foreground whitespace-normal"
                                title={agent.description}
                            >
                                {agent.description}
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

export default AgentSelector