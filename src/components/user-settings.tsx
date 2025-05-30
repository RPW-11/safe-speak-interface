import { Settings } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogFooter, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from "./ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { User } from "@/types/auth"
import { useUserStore } from "@/stores/useUserStore"
import { useState } from "react"

const UserSettings = ({ user }: { user: User | null }) => {
    const { updateProfile, loading } = useUserStore()
    const [currImgUrl, setCurrImgUrl] = useState<string>(user?.img_url || '')
    const handleChangeProfile = async () => {
        await updateProfile(currImgUrl)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className="w-full justify-start">
                    <Settings/> Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>User Settings</DialogTitle>
                    <DialogDescription>Change your profile picture</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center p-4 gap-7">
                    {user && <Avatar className="h-32 w-32">
                        <AvatarImage src={user.img_url} alt="avatar" />
                        <AvatarFallback className="text-4xl">{user.username.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>}
                    <Input 
                    id="image-url" 
                    placeholder="Your image url" 
                    value={currImgUrl} 
                    onChange={(e) => setCurrImgUrl(e.target.value)}
                    className="col-span-3" />
                </div>
                <DialogFooter>
                    <Button disabled={loading} onClick={handleChangeProfile}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserSettings