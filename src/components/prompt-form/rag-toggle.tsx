"use client"
import { Toggle } from "../ui/toggle"
import { BookText } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useState } from "react";

const RagToggle = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div>
            <Toggle aria-label="Toggle rag">
              <BookText />
              Optimize
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Optimize with RAG</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default RagToggle