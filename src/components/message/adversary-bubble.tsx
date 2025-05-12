import CopyButton from "./copy-button"
import MessageInfoDialog from "./message-info-dialog"
import ThreatIndicator from "./threat-indicator"
import MarkdownDisplayer from "./markdown-displayer"
import { ThreatInfo } from "@/types/message"
import Loading from "../loading"


interface AdversaryBubbleProps {
  message: string,
  enableAnimation?: boolean,
  threat?: ThreatInfo | null,
  isStreaming?: boolean
}

const AdversaryBubble = ({ message, enableAnimation, threat, isStreaming }: AdversaryBubbleProps) => {
  
  return (
    <div className={`group py-2 max-w-[80%] ${enableAnimation && 'animate-in fade-in duration-500'}`}>
      <div className="flex items-center gap-4">
        <div className='rounded-lg p-4 w-fit bg-secondary/10 overflow-hidden'>
          <MarkdownDisplayer markdownText={message} />
        </div>
        {isStreaming? <Loading dark={true}/> : threat && <ThreatIndicator threat={threat}/>}
      </div>
      <div className="flex h-8 items-center gap-2 py-2">
        <CopyButton textToCopy={ message }/>
        <MessageInfoDialog/>
      </div>
    </div>
  )
}

export default AdversaryBubble