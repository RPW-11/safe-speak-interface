import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const AvatarPopover = () => {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant={"ghost"} className="w-fit h-fit p-1 rounded-full group">
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pinimg.com/736x/d0/7b/b1/d07bb1d4e5fedae0246a3061a2a911b7.jpg" alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
            Hello
        </PopoverContent>
    </Popover>
  )
}

export default AvatarPopover