import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from '../ui/button';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { ThreatInfo } from '@/types/message';

interface ThreatIndicatorProps {
    threat: ThreatInfo 
}


const ThreatIndicator = ({ threat }: ThreatIndicatorProps) => {
    const [localIsThreat, setLocalIsThreat] = useState<boolean>(threat.is_threat)
    
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
                            {localIsThreat ? <ShieldAlert className='!size-5 text-red-700'/> : <ShieldCheck className='!size-5 text-primary'/>}
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        {localIsThreat ? <p>Malicious message detected!</p> : <p>Safe message</p>}
                    </TooltipContent>
                    <PopoverContent className='space-y-3'>
                        {localIsThreat ?
                        <div>
                            <h4 className="scroll-m-20 font-semibold tracking-tight">
                                Malicious Message Detected!
                            </h4>
                            <div className="overflow-auto max-h-64 ">
                                <p className="text-sm hyphens-auto">{ threat.description }</p>
                            </div>
                        </div>
                        :
                        <div>
                            <h4 className="scroll-m-20 font-semibold tracking-tight">
                                Safe Message
                            </h4>
                            <div className="overflow-auto max-h-64 ">
                                <p className="text-sm hyphens-auto">This is a safe message</p>
                            </div>
                        </div>
                        }
                        {!localIsThreat && threat.user_description && <p className='text-xs text-muted-foreground italic'>You marked this message as safe</p>}
                        <div className="mt-3">
                            {localIsThreat ? 
                            <Button size={"sm"} onClick={() => setLocalIsThreat(false)}>Mark as safe</Button> : 
                            <Button size={"sm"} onClick={() => setLocalIsThreat(true)} variant={"destructive"}>Mark as threat</Button>
                            }
                        </div>
                    </PopoverContent>
                </Popover>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ThreatIndicator