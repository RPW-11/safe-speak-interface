"use client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import PromptForm from "@/components/prompt-form/prompt-form"

const DashboardPage = () => {
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
    <div className="max-w-6xl m-auto p-4 flex flex-col h-full justify-between">
        DashboardPage
        <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
        <div className="float-0">
            <PromptForm/>
        </div>
    </div>
  )
}

export default DashboardPage