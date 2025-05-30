"use client"
import PromptForm from "@/components/prompt-form/prompt-form"
import UserBubble from "@/components/message/user-bubble"
import AdversaryBubble from "@/components/message/adversary-bubble"
import AdversaryLoading from "@/components/message/adversary-loading"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Message, MessageSend, ThreatInfo } from "@/types/message"
import { useState, useEffect, useRef } from "react"
import { useMessageStore } from "@/stores/useMessageStore"
import { useMessage } from "@/hooks/useMessage"
import { useParams, useRouter } from "next/navigation"
import { useConversation } from "@/hooks/useConversation"
import { formatMessage } from "@/utils"
import Loading from "@/components/loading"
import { useChatEnvStore } from "@/stores/useChatEnvStore"
import { useConversationStore } from "@/stores/useConversationStore"
import { Conversation } from "@/types/conversation"
import { useUserStore } from "@/stores/useUserStore"

const DashboardPage = () => {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  
  const [aiMessage, setAiMessage] = useState<Message|null>()
  const [aiResponse, setAiResponse] = useState<string>('')
  const [currentAiThreat, setCurrentAiThreat] = useState<ThreatInfo|null>(null)
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false)
  const [isStreaming, setIsStreaming] = useState<boolean>(false)
  const { user, loading: userInfoLoading } = useUserStore()

  const { adversaryAgent, protectionModel } = useChatEnvStore()

  const {
    messages,
    pendingMessage,
    isSendingMessage,
    setPendingMessage,
    setIsSendingMessage,
    addMessage,
    setMessages,
    clearMessages,
    updateMessage,
  } = useMessageStore()

  const {
    error: sendMessageError,
    sendMessageHandler 
  } = useMessage()

  const {
    error: loadMessageError,
    loadMessagesHandler 
  } = useMessage()

  const { createConversationHandler } = useConversation()
  const { updateConversations } = useConversationStore()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!id) {
      clearMessages()
      return
    } 

    if (id.length > 1) {
      router.push('/dashboard')
      return
    }

    if (id && pendingMessage) {
      submitMessage(pendingMessage as MessageSend)
      setPendingMessage(null)
      return
    }

    if (!isSendingMessage) {
      clearMessages()
      handleLoadMessages()
    }
    
  }, [id])

  useEffect(() => {
    scrollToBottom()
  }, [messages, aiResponse])

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const submitMessage = async (message: MessageSend) => {
    try {
      setIsStreaming(true)
      await sendMessageHandler(
        message, 
        (chunk) => {
          const parsedChunk = JSON.parse(chunk)
          if (parsedChunk.type === "ai-msg") setAiMessage(parsedChunk.data)
          else if (parsedChunk.type === "user-msg") updateMessage("", parsedChunk.data)
          else if (parsedChunk.type === "malicious-verdict") setCurrentAiThreat(parsedChunk.data as ThreatInfo)
          else if (parsedChunk.type === "new-conversation") updateConversations(parsedChunk.data as Conversation)
          else {      
            setIsSendingMessage(false)
            setAiResponse(prev => prev + parsedChunk.data)
          }
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsStreaming(false)
    }
  }

  const handleSubmitMessage = async (prompt: string) => {
    if (prompt === "") return

    if (aiMessage && aiResponse !== "") {
      addMessage({...aiMessage, content: aiResponse, threat_indicator: currentAiThreat})
      setAiMessage(null)
      setCurrentAiThreat(null)
      setAiResponse('')
    }

    let userMessage = id ? formatMessage("user", prompt, protectionModel.id, adversaryAgent.id, id[0]) : formatMessage("user", prompt, protectionModel.id, adversaryAgent.id)

    addMessage(userMessage)

    setIsSendingMessage(true)

    if (!id) {
      const conversation = await createConversationHandler()
      userMessage.conversation_id = conversation.id
      setPendingMessage(userMessage)
      localStorage.setItem(`conv-env-protectmodel-${conversation.id}`, JSON.stringify(protectionModel))
      localStorage.setItem(`conv-env-adversarymodel-${conversation.id}`, JSON.stringify(adversaryAgent))
      router.replace(`/dashboard/${conversation.id}`)
    } else {
      submitMessage(userMessage as MessageSend)
    }
  }

  const handleLoadMessages = async () => {
    setIsLoadingMessages(true)
    try {
      const messages = await loadMessagesHandler(id[0])
      setMessages(messages)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingMessages(false)
    }
  }

  
  return (
    <ScrollArea className="h-full overflow-auto" ref={scrollAreaRef}>
      <div className="px-6 flex flex-col w-full min-h-screen justify-between pt-20 items-center relative">
        { isLoadingMessages || userInfoLoading ? 
        <div className="w-full h-full max-w-6xl min-w-screen flex-1 flex justify-center items-center py-4">
          <Loading dark={true}/>
        </div> :
        messages.length > 0 ? 
        <div className="w-full h-full max-w-6xl min-w-screen flex-1 py-4">
          {messages.map((message, idx) => (
            message.role === "assistant" ? 
              <AdversaryBubble key={idx} message={message} streamMessage={message.content} threat={message.threat_indicator}/> :
              <UserBubble key={idx} message={message.content}/>
          ))}
          {isSendingMessage ? <AdversaryLoading /> :
          aiResponse !== "" && <AdversaryBubble message={aiMessage} streamMessage={aiResponse} enableAnimation={true} threat={currentAiThreat} isStreaming={isStreaming}/>}
          <div ref={messagesEndRef} />
        </div> :
        <div className="w-full max-w-6xl flex-1 flex flex-col items-center justify-center text-primary bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 text-transparent bg-clip-text">
          {user ? <h3 className="scroll-m-20 text-3xl font-bold tracking-tight">
            {`Welcome to SafeSpeak Demo, ${user.username}`}
          </h3> :
          <Loading dark/>
          }
        </div>
        }
        <div className="sticky bottom-0 w-full max-w-6xl !min-w-screen">
          <PromptForm disabled={isStreaming} onSubmit={handleSubmitMessage}/>
          <div className="w-full h-6 bg-white"></div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default DashboardPage