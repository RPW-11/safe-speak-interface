import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

const AvatarPopover = () => {
  const { logoutUser } = useAuth()
  const router = useRouter()
  const handleLogout = async () => {
      try {
          await logoutUser()
          router.push("/login")
      } catch (error) {
          console.log(error);
      }
  }

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
        <PopoverContent align="end" className="w-40 h-fit p-1">
          <Button variant={"ghost"} className="w-full justify-start">
            <Settings/> Settings
          </Button>
          <Button variant={"ghost"} className="text-rose-700 w-full justify-start" onClick={handleLogout}>
            <LogOut/> Logout
          </Button>
        </PopoverContent>
    </Popover>
  )
}

export default AvatarPopover