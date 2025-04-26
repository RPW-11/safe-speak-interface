import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from '../ui/button';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';


const ThreatIndicator = () => {
    const [isThreat, setIsThreat] = useState<boolean>(true)
    const desc = "Possible harmful message. The user is trying to fool you by asking this and that. You should not reply this message or blcok this contact immediately. You should never talk to this person again. Otherwise, it can get you killed. Be careful out there. You should never tell someone that you don't trust about your PII. Once again."
    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <Popover>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"ghost"} 
                            size={"icon"} 
                            className="w-fit h-fit p-1 text-muted-foreground">
                            {isThreat ? <ShieldAlert className='!size-5 text-red-700'/> : <ShieldCheck className='!size-5 text-primary'/>}
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Malicious message detected!</p>
                    </TooltipContent>
                    <PopoverContent className='space-y-3'>
                        <div>
                            <h4 className="scroll-m-20 font-semibold tracking-tight">
                                Malicious Message Detected!
                            </h4>
                            <div className="overflow-auto max-h-64 ">
                                <p className="text-sm hyphens-auto">{ desc }</p>
                            </div>
                        </div>
                        {!isThreat && <p className='text-xs text-muted-foreground italic'>You marked this message as safe</p>}
                        <div className="mt-3">
                            {isThreat ? 
                            <Button size={"sm"} onClick={() => setIsThreat(false)}>Mark as safe</Button> : 
                            <Button size={"sm"} onClick={() => setIsThreat(true)} variant={"destructive"}>Mark as threat</Button>
                            }
                        </div>
                    </PopoverContent>
                </Popover>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ThreatIndicator