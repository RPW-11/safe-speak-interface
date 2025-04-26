"use client"
import PromptForm from "@/components/prompt-form/prompt-form"
import UserBubble from "@/components/message/user-bubble"
import AdversaryBubble from "@/components/message/adversary-bubble"

const DashboardPage = () => {
  return (
    <div className="px-6 flex flex-col w-full h-full pt-20 justify-between items-center relative">
        <div className="w-full max-w-6xl h-full py-4">
          <AdversaryBubble/>
          <UserBubble/>
          <AdversaryBubble/>
          <UserBubble/>
          <AdversaryBubble/>
          <UserBubble/>
          <AdversaryBubble/>
          <UserBubble/>
        </div>
        <div className="sticky bottom-0 pb-6 w-full max-w-6xl bg-white">
            <PromptForm/>
        </div>
    </div>
  )
}

export default DashboardPage