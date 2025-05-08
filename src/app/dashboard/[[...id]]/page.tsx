"use client"
import PromptForm from "@/components/prompt-form/prompt-form"
import UserBubble from "@/components/message/user-bubble"
import AdversaryBubble from "@/components/message/adversary-bubble"
import AdversaryLoading from "@/components/message/adversary-loading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Message, MessageSend } from "@/types/message"
import { useState, useEffect, useRef } from "react"
import { useMessageStore } from "@/stores/useMessageStore"
import { useMessage } from "@/hooks/useMessage"
import { useParams, useRouter } from "next/navigation"
import { useConversation } from "@/hooks/useConversation"

const DashboardPage = () => {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  
  const [userMessage, setUserMessage] = useState<string|null>()
  const { messages, currentMessage, setCurrentMessage, addMessage } = useMessageStore()
  const { isLoading, setIsLoading, error, sendMessageHandler } = useMessage()
  const { createConversationHandler } = useConversation()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    if (id && id.length > 1) {
      router.push('/dashboard')
      return
    }
    const storedUserMessage = localStorage.getItem("user-message_" + id)
    if (storedUserMessage) {
      const parsedMessage = JSON.parse(storedUserMessage) as Message
      localStorage.removeItem("user-message_" + id)
      submitMessage(parsedMessage)
    }
    
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, currentMessage])

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const submitMessage = async (message: MessageSend) => {
    try {
      await sendMessageHandler(
        message, 
        (chunk) => {
          useMessageStore.setState((state) => ({
            currentMessage: (state.currentMessage || '') + chunk,
          }));
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  const handleSubmitMessage = async () => {
    if (!userMessage) return
    let userMessageStored: Message
    let aiMessageStored: Message

    if (currentMessage) {
      aiMessageStored = {
        id: '',
        conversation_id: id ? id[0] : '',
        agent_id: 'gemini',
        model: 'gemini',
        type: 'text',
        content: currentMessage,
      }
      addMessage(aiMessageStored)
    }

    userMessageStored = {
      id: '',
      conversation_id: id ? id[0] : '',
      model: 'gemini',
      type: 'text',
      content: userMessage,
    }
    addMessage(userMessageStored)

    setUserMessage(null)
    setCurrentMessage('')
    setIsLoading(true)

    if (!id) {
      const conversation = await createConversationHandler()
      userMessageStored.conversation_id = conversation.id
      localStorage.setItem("user-message_" + conversation.id, JSON.stringify(userMessageStored))
      router.replace(`/dashboard/${conversation.id}`)
    } else {
      await submitMessage(userMessageStored as MessageSend)
    }
  }

  return (
    <ScrollArea className="h-full overflow-auto" ref={scrollAreaRef}>
      <div className="px-6 flex flex-col w-full min-h-screen justify-between pt-20 items-center relative">
        <div className="w-full h-full max-w-6xl min-w-screen flex-1 py-4">
          {messages.map((message, idx) => (
            message.agent_id ? 
              <AdversaryBubble key={idx} message={message.content} /> :
              <UserBubble key={idx} message={message.content}/>
          ))}
          {isLoading ? <AdversaryLoading /> : currentMessage && <AdversaryBubble message={currentMessage} enableAnimation={true}/>}
          <div ref={messagesEndRef} />
        </div>
        <div className="sticky bottom-0 w-full max-w-6xl !min-w-screen">
          <PromptForm onSubmit={handleSubmitMessage} setUserMessage={setUserMessage}/>
          <div className="w-full h-6 bg-white"></div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default DashboardPage