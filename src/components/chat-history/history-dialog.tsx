import { NotebookText, Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "../ui/dialog"
import ConversationButton from "./conversation-button"
import { useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { ScrollArea } from "../ui/scroll-area"
import { Conversation } from "@/types/conversation"
import Loading from "../loading"
import { useRouter } from "next/navigation"

interface HistoryDialogProps {
    conversations: Conversation[]
    isLoading: boolean
}

const HistoryDialog = ({ conversations, isLoading }: HistoryDialogProps) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [localConversations, setLocalConversations] = useState<Conversation[]>([])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        } else if (e.metaKey && e.key === 'Enter') {
            setIsOpen(false)
            router.push("/dashboard")
        }
    };

    const handleSearchConversation = () => {
        if (searchTerm === '') {
            setLocalConversations(conversations)
            return
        }
        setLocalConversations(conversations.filter(cnv => 
            cnv.title.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    }

    useEffect(() => {
        handleSearchConversation()
    }, [searchTerm])

    useEffect(() => {
        setLocalConversations(conversations)
    }, [conversations])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <NotebookText className='!size-5'/>
                </Button>
            </DialogTrigger>
            {isLoading ? 
            <DialogContent onKeyDown={handleKeyDown} className="[&>button]:hidden">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <div className="flex flex-col items-center justify-center h-24">
                    <Loading dark={true}/>
                </div>
            </DialogContent> :
            <DialogContent onKeyDown={handleKeyDown} className="[&>button]:hidden">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <div className="flex items-center justify-between gap-4">
                    <Input type="text" 
                    className="!text-base h-7 shadow-none focus-visible:ring-0 border-none p-0" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search conversations..."/>
                    <Search/>
                </div>
                <Separator/>
                <ScrollArea className="flex flex-col max-h-80 overflow-auto">
                    { localConversations.length > 0 ? localConversations.map((cnv) => (
                        <ConversationButton key={cnv.id} conversation={cnv}/>
                    )) : 
                    <h4 className="scroll-m-20 text-muted-foreground text-center py-7 font-semibold tracking-tight">
                        You have no conversations, start a new one.
                    </h4>
                    }
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
            </DialogContent>}
        </Dialog>
    )
}

export default HistoryDialog