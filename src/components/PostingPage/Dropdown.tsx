import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';

const DropdouwnMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-pink-600 hover:text-pink-300 transition-colors duration-200 text-xl border-none ">
        Categories
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-3">
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-yellow-400 font-bold">JavaScript</DropdownMenuItem>
        <DropdownMenuItem className="text-sky-600 font-bold">React.js</DropdownMenuItem>
        <DropdownMenuItem className="text-black font-bold">Next.js</DropdownMenuItem>
        <DropdownMenuItem className="text-green-600 font-bold">Node.js</DropdownMenuItem>
        <DropdownMenuItem className="text-blue-600 font-bold">TypeScript</DropdownMenuItem>
        <DropdownMenuItem className="text-sky-300 font-bold">Tailwind</DropdownMenuItem>
        <DropdownMenuItem className="text-[#402a23] font-bold">Zustand</DropdownMenuItem>
        <DropdownMenuItem className="text-blue-700 font-bold">CSS</DropdownMenuItem>
        <DropdownMenuItem className="text-red-700 font-bold">Recoil</DropdownMenuItem>
        <DropdownMenuItem className="text-gray-500 font-bold">Zotai</DropdownMenuItem>
        <DropdownMenuItem className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 font-bold">
          TanStack-Query
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdouwnMenu;
