import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { Copy } from 'lucide-react';


interface CopyButtonProps {
    textToCopy: string;
}

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
    
    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(textToCopy);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };

    return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="hidden group-hover:flex" asChild>
              <Button 
              onClick={handleCopy}
              variant={"ghost"} 
              size={"icon"} 
              className="w-fit h-fit p-1 text-muted-foreground">
                <Copy className='!size-[14px]'/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    )
}

export default CopyButton