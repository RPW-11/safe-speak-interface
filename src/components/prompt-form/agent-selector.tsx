import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ChevronDown, CircleUserRound } from "lucide-react"
import { adversaryModels } from "@/constant"
import { useChatEnvStore } from "@/stores/useChatEnvStore"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Agent } from "@/types/model"


const AgentSelector = () => {
    const params = useParams()
    const { id } = params

    const { adversaryAgent, setAdversaryAgent, resetAdversaryAgent } = useChatEnvStore()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const handleSelectModel = (agent: Agent) => {
        if (id) localStorage.setItem(`conv-env-adversarymodel-${id[0]}`, JSON.stringify(agent))
        setIsOpen(false)
        setAdversaryAgent(agent)
    }

    useEffect(() => {
        resetAdversaryAgent()
        if (id) {
            const storedModel = localStorage.getItem(`conv-env-adversarymodel-${id[0]}`)
            if(storedModel) setAdversaryAgent(JSON.parse(storedModel) as Agent)
        }
    }, [id])

    return (
        <TooltipProvider>
        <Tooltip delayDuration={300} disableHoverableContent={isOpen}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
            <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                <Button variant="outline" className="rounded-lg flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <CircleUserRound />
                    { adversaryAgent.name }
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
                    <Button key={agent.id} 
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleSelectModel(agent)
                    }}
                    variant="ghost" 
                    className={`w-full relative h-fit ${agent.id === adversaryAgent.id && 'bg-violet-100'}`}>
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