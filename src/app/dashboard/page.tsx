"use client"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

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
    <div>DashboardPage
        <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default DashboardPage