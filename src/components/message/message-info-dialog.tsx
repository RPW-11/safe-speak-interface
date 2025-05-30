import { Info } from "lucide-react"
import { Button } from "../ui/button"
import { Message } from "@/types/message"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "../ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Label } from "../ui/label"

const MessageInfoDialog = ({ message }: { message: Message }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <Dialog>
          <TooltipTrigger className="hidden group-hover:flex" asChild>
              <DialogTrigger asChild>
                <Button 
                variant={"ghost"} 
                size={"icon"} 
                className="w-fit h-fit p-1 text-muted-foreground">
                <Info className='!size-[14px]'/>
                </Button>
              </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Message info</p>
          </TooltipContent>
          <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
            <DialogHeader>
              <DialogTitle>Message Info</DialogTitle>
              <DialogDescription>
                Configurations used to generate this message
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Protection Model
                </Label>
                <div className="px-3 py-2 rounded-md col-span-3 text-sm font-semibold border border-black bg-gray-50 ">{ message.model.toUpperCase() }</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Adversary Model
                </Label>
                <div className="px-3 py-2 rounded-md col-span-3 text-sm font-semibold border border-black bg-gray-50">{ message.agent_model.toUpperCase() }</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Optimized with RAG
                </Label>
                <div className="px-3 py-2 rounded-md col-span-3 text-sm font-semibold border border-black bg-gray-50">{ message.rag_enabled ? "True" : "False" }</div>
              </div>
            </div>
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tooltip>
  </TooltipProvider>
  )
}

export default MessageInfoDialog