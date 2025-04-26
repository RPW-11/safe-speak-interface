import CopyButton from "./copy-button"
import MessageInfoDialog from "./message-info-dialog"
import ThreatIndicator from "./threat-indicator"


const AdversaryBubble = () => {
  return (
    <div className='group py-2 max-w-[80%]'>
      <div className="flex items-center gap-4">
        <div className='rounded-lg p-4 w-fit bg-secondary/10'>
          <p>This is the response from the large language models skirtt askdjnakd kasjdnasjkdn askjdnasjkd kasjndasjknd </p>
        </div>
        <ThreatIndicator/>
      </div>
      <div className="flex h-8 items-center gap-2 py-2">
        <CopyButton textToCopy="Random"/>
        <MessageInfoDialog/>
      </div>
    </div>
  )
}

export default AdversaryBubble