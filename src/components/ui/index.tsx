import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as Dialog from '@radix-ui/react-dialog';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check, ChevronDown, X } from 'lucide-react';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
const variants = cva('button', { variants: { variant: { default: 'button-primary', outline: 'button-outline', ghost: 'button-ghost' } }, defaultVariants: { variant: 'default' } });
export function Button({ className, variant, asChild, ...props }: React.ComponentProps<'button'> & VariantProps<typeof variants> & {asChild?:boolean}) { const Comp = asChild ? Slot : 'button'; return <Comp className={cn(variants({variant}), className)} {...props}/>; }
export function Input(props: React.ComponentProps<'input'>) { return <input {...props} className={cn('field',props.className)}/>; }
export function Textarea(props: React.ComponentProps<'textarea'>) { return <textarea {...props} className={cn('field',props.className)}/>; }
export function Label(props: React.ComponentProps<typeof LabelPrimitive.Root>) { return <LabelPrimitive.Root {...props} className={cn('label',props.className)}/>; }
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;
export function SheetContent({children,...props}:React.ComponentProps<typeof Dialog.Content>) { return <Dialog.Portal><Dialog.Overlay className="sheet-overlay"/><Dialog.Content className="sheet-content" {...props}>{children}<Dialog.Close className="sheet-x" aria-label="Close menu"><X/></Dialog.Close></Dialog.Content></Dialog.Portal>; }
export function Select({value,onValueChange,children}:{value:string,onValueChange:(v:string)=>void,children:React.ReactNode}) { return <SelectPrimitive.Root value={value} onValueChange={onValueChange}><SelectPrimitive.Trigger className="field select-trigger" id="category"><SelectPrimitive.Value/><SelectPrimitive.Icon><ChevronDown size={16}/></SelectPrimitive.Icon></SelectPrimitive.Trigger><SelectPrimitive.Portal><SelectPrimitive.Content position="popper" sideOffset={5} className="select-content"><SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport></SelectPrimitive.Content></SelectPrimitive.Portal></SelectPrimitive.Root>; }
export function SelectItem({children,value}:{children:React.ReactNode,value:string}) { return <SelectPrimitive.Item className="select-item" value={value}><SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText><SelectPrimitive.ItemIndicator><Check size={15}/></SelectPrimitive.ItemIndicator></SelectPrimitive.Item>; }
