import { Info } from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const MessageInfoDialog = () => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={300}>
        <TooltipTrigger className="hidden group-hover:flex" asChild>
            <Button 
            variant={"ghost"} 
            size={"icon"} 
            className="w-fit h-fit p-1 text-muted-foreground">
            <Info className='!size-[14px]'/>
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Message info</p>
        </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default MessageInfoDialog