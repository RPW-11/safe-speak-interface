"use client"
import { Pen, Trash } from "lucide-react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import Link from "next/link"
import { Button } from "../ui/button"
import { useState } from "react"
import { Conversation } from "@/types/conversation"
import { useConversation } from "@/hooks/useConversation"
import { useConversationStore } from "@/stores/useConversationStore"
import Loading from "../loading"
import { useParams } from "next/navigation"

interface ConversationButtonProps {
    conversation: Conversation
}

const ConversationButton = ({ conversation }: ConversationButtonProps) => {
    const [isHover, setIsHover] = useState(false);
    const params = useParams()
    const { id } = params

    return (
        <Link 
            href={`/dashboard/${conversation.id}`} 
            className={`rounded-md px-4 py-1 min-h-[52px] flex items-center ${id && id[0] === conversation.id ? "bg-gray-100": "hover:bg-gray-100"}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="flex items-center w-full justify-between gap-2">
                <p>{ conversation.title || "Unknown"}</p>
                {isHover ? 
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <RenameButton/>
                    <DeleteButton conversationId={conversation.id}/>
                </div> : 
                <p className="text-muted-foreground text-sm">
                    {conversation.updated_at ? getRelativeTime(conversation.updated_at) : "Unknown"}
                </p>
                }
            </div>
        </Link>
    )
}

const DeleteButton = ({ conversationId }: { conversationId: string }) => {
    const { isLoading, error, deleteConversationHandler } = useConversation()
    const { removeConversations } = useConversationStore()

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await deleteConversationHandler(conversationId)
            removeConversations(conversationId)
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                    onClick={handleClick} 
                    onMouseDown={handleMouseDown}
                    size={"icon"} variant={"ghost"} 
                    className="hover:bg-gray-200">
                        {isLoading ? <Loading dark={true}/> : <Trash className="!size-3.5"/>}
                    </Button>
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

const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString.replace(' ', 'T') + 'Z');
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime())) / 1000;
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    if (seconds < 60) return "just now";
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }
    
    return "just now";
};

export default ConversationButton