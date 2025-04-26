"use client"
import { ShieldCheck } from 'lucide-react';
import AvatarPopover from './avatar-popover';
import { NotebookText } from 'lucide-react';
import { PenLine } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import HistoryDialog from './chat-history/history-dialog';


const Header = () => {
  return (
    <header className="h-16 top-0 z-50 absolute w-full bg-white shadow-lg shadow-white">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <Link href="/" passHref className='flex gap-1 items-center'>
                <ShieldCheck className='text-violet-500'/>
                <h1 className="font-mono scroll-m-20 text-xl text-violet-500 font-extrabold tracking-tight">
                    SafeSpeak
                </h1>
            </Link>
        </div>
        <div className="flex items-center space-x-7">
          <div className="flex gap-3">
            <Button variant={"ghost"} size={"icon"}><PenLine className='!size-5'/></Button>
            <HistoryDialog/>
          </div>
          <AvatarPopover/>
        </div>
      </div>
    </header>
  );
};

export default Header;