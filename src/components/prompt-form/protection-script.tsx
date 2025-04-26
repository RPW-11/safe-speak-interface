import { Dialog, DialogTitle, DialogDescription, DialogTrigger, DialogContent, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { ScrollText } from "lucide-react"
import { useState } from "react"


const ProtectionScript = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant={"ghost"} className="w-full relative h-fit">
                <div className="w-full text-start flex items-center gap-3">
                    <div className="w-full">
                        <h4 className="scroll-m-20 font-semibold tracking-tight">
                            Protection script
                        </h4>
                        <p
                            className="text-sm text-muted-foreground whitespace-normal"
                        >
                            Write your protection command
                        </p>
                    </div>
                    <ScrollText className="!size-5"/>
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Edit your protection script</DialogTitle>
            <DialogDescription>Set it to empty to turn into default</DialogDescription>
            <Textarea />
            <DialogFooter>
                <Button>Save</Button>
                <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default ProtectionScript