import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { Pen } from 'lucide-react';


const ModifyButton = () => {

    return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="hidden group-hover:flex" asChild>
              <Button
              variant={"ghost"} 
              size={"icon"} 
              className="w-fit h-fit p-1 text-muted-foreground">
                <Pen className='!size-[14px]'/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Modify</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    )
}

export default ModifyButton