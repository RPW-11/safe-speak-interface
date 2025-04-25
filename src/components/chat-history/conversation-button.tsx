import { Pen, Trash } from "lucide-react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import Link from "next/link"
import { Button } from "../ui/button"
import { useState } from "react"

const ConversationButton = () => {
    const [isHover, setIsHover] = useState(false);

    return (
        <Link 
            href={"/"} 
            className="rounded-md px-4 py-1 min-h-[52px] flex items-center hover:bg-gray-100"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="flex items-center w-full justify-between gap-2">
                <p>This is the title of the convo</p>
                {isHover ? 
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <RenameButton/>
                    <DeleteButton/>
                </div> : 
                <p className="text-muted-foreground text-sm">3 days ago</p>
                }
            </div>
        </Link>
    )
}

const DeleteButton = () => {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Your delete logic here
    };
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                    onClick={handleClick} 
                    onMouseDown={handleMouseDown}
                    size={"icon"} variant={"ghost"} 
                    className="hover:bg-gray-200"><Trash className="!size-3.5"/></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const RenameButton = () => {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Your delete logic here
    };
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                    onClick={handleClick} 
                    onMouseDown={handleMouseDown}
                    size={"icon"} variant={"ghost"} 
                    className="hover:bg-gray-200"><Pen className="!size-3.5"/></Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Rename</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ConversationButton