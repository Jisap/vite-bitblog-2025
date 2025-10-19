

import { cn } from '@/lib/utils'
import { useCurrentEditor } from '@tiptap/react'
import { useCallback } from 'react'
import { Separator } from './ui/separator'
import { Toggle } from './ui/toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from './ui/button'
import { 
  BoldIcon, 
  CodeIcon, 
  Heading1Icon, 
  Heading2Icon, 
  Heading3Icon, 
  HeadingIcon, 
  ItalicIcon, 
  StrikethroughIcon, 
  Undo2Icon, 
  Redo2Icon,
  TextQuoteIcon,
  CodeSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ListIcon,
  ListOrderedIcon 
} from 'lucide-react';

import type { LucideProps } from 'lucide-react';

type Level = 1 | 2 | 3;

interface HeadingType {
  label: string;
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  level: Level;
}

const HEADINGS: HeadingType[] = [
  {
    label: "Heading 1",
    Icon: Heading1Icon,
    level: 1,
  },
  {
    label: "Heading 2",
    Icon: Heading2Icon,
    level: 2,
  },
  {
    label: "Heading 3",
    Icon: Heading3Icon,
    level: 3,
  },
];



export const Toolbar = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  
  const { editor } = useCurrentEditor();
  
  // Muestra el icono de encabezado correcto (H1, H2, H3) en la barra de herramientas, 
  // dependiendo de dónde esté el cursor del usuario en el editor de texto.
  const getActiveIcon = useCallback(() => {
    if(!editor) return <HeadingIcon />

    // Encontramos el nivel de encabezado activo. 
    // editor.isActive(...) es una función de Tiptap que devuelve true si el cursor del usuario está 
    // actualmente dentro de un nodo de tipo "heading" con el level especificado.
    // .find() se detiene y devuelve el primer objeto del array HEADINGS que cumpla la condición. 
    const activeHeading = HEADINGS.find(({ level }) => editor.isActive("heading", { level })); 
    if(!activeHeading?.level) return <HeadingIcon />
    
    return <activeHeading.Icon />
  },[editor]);

  if(!editor) return null;

  const isAnyHeadingActive = editor.isActive("heading"); // Comprueba si el cursor del usuario está dentro de un nodo de tipo "heading".

  return (
    <div
      className={cn(
        "flex items-center gap-1 p-2",
        className
      )}
      {...props}
    >
      {/* Undo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.undo()}
            disabled={!editor.can().undo()}
          >
            <Undo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          Undo
          <div className='text-black/60'>
            CTRL+Z
          </div>
        </TooltipContent>
      </Tooltip>

      {/* Redo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.commands.redo()}
            disabled={!editor.can().redo()}
          >
            <Redo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          Redo
          <div className='text-black/60'>
            CTRL+Shift
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

