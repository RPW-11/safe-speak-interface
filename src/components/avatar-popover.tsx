import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import UserSettings from "./user-settings"
import { User } from "@/types/auth"

interface AvatarPopoverProps {
  loading: boolean
  user: User | null
}

const AvatarPopover = ({ loading, user }: AvatarPopoverProps) => {
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
            { loading || !user ?
              <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse"></div>
              :
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.img_url} alt="avatar" />
                <AvatarFallback>{user.username.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
            }
            </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-40 h-fit p-1">
          <UserSettings user={user}/>
          <Button variant={"ghost"} className="text-rose-700 w-full justify-start" onClick={handleLogout}>
            <LogOut/> Logout
          </Button>
        </PopoverContent>
    </Popover>
  )
}

export default AvatarPopover