import CopyButton from "./copy-button"
import ModifyButton from "./modify-button"

interface UserBubbleProps {
  message: string
}

const UserBubble = ({ message }: UserBubbleProps) => {
  return (
    <div className='py-2 flex flex-col items-end '>
      <div className="group w-fit max-w-[80%]">
        <div className='rounded-lg p-4 bg-accent'>
          <p className="whitespace-pre-line leading-relaxed">{ message }</p>
        </div>
        <div className="flex h-8 items-center gap-2 py-2 justify-end">
          <ModifyButton/>
          <CopyButton textToCopy={message}/>
        </div>
      </div>
    </div>
  )
}

export default UserBubble