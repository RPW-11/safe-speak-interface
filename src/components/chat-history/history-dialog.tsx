import { NotebookText, Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "../ui/dialog"
import ConversationButton from "./conversation-button"
import { useState } from "react"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { ScrollArea } from "../ui/scroll-area"

const HistoryDialog = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        } else if (e.metaKey && e.key === 'Enter') {
        setIsOpen(false)
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <NotebookText className='!size-5'/>
                </Button>
            </DialogTrigger>
            <DialogContent onKeyDown={handleKeyDown}>
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <div className="flex items-center justify-between gap-4">
                    <Input type="text" 
                    className="!text-base h-7 shadow-none focus-visible:ring-0 border-none p-0" 
                    placeholder="Search conversations..."/>
                    <Search/>
                </div>
                <Separator/>
                <ScrollArea className="flex flex-col max-h-80 overflow-auto">
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                    <ConversationButton/>
                </ScrollArea>
                <DialogFooter>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Badge variant={"outline"} className="text-muted-foreground">Esc</Badge>
                        Close
                    </div>
                    <Separator orientation="vertical"/>
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Badge variant={"outline"} className="text-muted-foreground">⌘ + Enter</Badge>
                        New chat
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default HistoryDialog