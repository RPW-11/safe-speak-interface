"use client"
import { useRef, useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
import AgentSelector from "./agent-selector";
import RagToggle from "./rag-toggle";
import ModelSelector from "./model-selector";


const PromptForm = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
  
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = `${newHeight}px`;
      }
    }, [inputValue]);
  
    const handleInputChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    };
  
    return (
      <div className="flex flex-col gap-2 w-full p-4 border rounded-lg">
        <Textarea
          ref={textareaRef}
          placeholder="Chat to the bad guys"
          className="!text-base border-none shadow-none focus-visible:ring-0 resize-none min-h-[40px]"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            overflowY: 'hidden',
          }}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AgentSelector />
            <RagToggle />
          </div>
          <div className="flex gap-2">
            <ModelSelector />
            <Button size="icon" className="rounded-lg">
              <SendHorizonal />
            </Button>
          </div>
        </div>
      </div>
    );
}

export default PromptForm