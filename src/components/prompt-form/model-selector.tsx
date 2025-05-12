"use client"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ChevronDown, ShieldEllipsis } from "lucide-react"
import ProtectionScript from "./protection-script"
import { protectionModels } from "@/constant"
import { useChatEnvStore } from "@/stores/useChatEnvStore"
import { Agent } from "@/types/model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


const ModelSelector = () => {
    const params = useParams()
    const { id } = params
    
    const { protectionModel, setProtectionAgent, resetProtectionAgent } = useChatEnvStore()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleSelectModel = (agent: Agent) => {
        if (id) localStorage.setItem(`conv-env-protectmodel-${id[0]}`, JSON.stringify(agent))
        setIsOpen(false)
        setProtectionAgent(agent)
    }

    useEffect(() => {
        resetProtectionAgent()
        if (id) {
            const storedModel = localStorage.getItem(`conv-env-protectmodel-${id[0]}`)
            if(storedModel) setProtectionAgent(JSON.parse(storedModel) as Agent)
        }
    }, [id])

    return (
        <TooltipProvider>
        <Tooltip delayDuration={300}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
            <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                <Button variant="ghost" className="rounded-lg flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <ShieldEllipsis />
                    { protectionModel.name }
                    </div>
                    <ChevronDown className="text-muted-foreground" />
                </Button>
                </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent align="center">
                <p>Select the model</p>
            </TooltipContent>
            <PopoverContent align="end">
                {protectionModels.map(model => (
                    <Button key={model.id}
                    onClick={() => handleSelectModel(model)} 
                    variant="ghost" 
                    className={`w-full relative h-fit ${model.id === protectionModel.id && 'bg-violet-100'}`}>
                        <div className="w-full text-start">
                            <h4 className="scroll-m-20 font-semibold tracking-tight">
                                { model.name }
                            </h4>
                            <p
                                className="text-sm text-muted-foreground whitespace-normal"
                                title={model.description}
                            >
                                { model.description }
                            </p>
                        </div>
                  </Button>
                ))}
                <Separator className="my-2"/>
                <ProtectionScript/>
            </PopoverContent>
            </Popover>
        </Tooltip>
        </TooltipProvider>
    )
}

export default ModelSelector