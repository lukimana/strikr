'use client'

import { ForwardedRef, forwardRef } from 'react'
import * as Select from '@radix-ui/react-select'
import { CaretDown, CheckCircle } from '@phosphor-icons/react';
import clsx from 'clsx';


const SelectInput = forwardRef(
  ({ name, placeholder, children, onChange, size, ...props }: { name: string, placeholder: string, children?: React.ReactNode[] | React.ReactNode, onChange: any, size: 'sm' | 'md' | 'lg' | 'xl'}, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    return (
      <Select.Root 
        {...props} 
        onValueChange={onChange}
        defaultValue='auto'
      >
        <Select.Trigger asChild>
          <button 
            className={clsx({
              'text-sm px-4 py-0.5': size === 'sm',
              'text-base px-3 py-1': size === 'md',
              'text-lg px-4 py-1.5': size === 'lg',
              'px-4 py-1.5 mim-w-[150px]': size === 'xl',
              'text-subtle bg-support border border-secondary-border rounded-md active:bg-accent hover:bg-accent duration-200 hover:text-secondary flex items-center gap-2 z-[0] ring-0 outline-none focus:ring-0 focus:outline-none': true
            })}
          >
            <Select.Value placeholder={placeholder} />
          </button>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            ref={forwardedRef}
            className='bg-secondary shadow-sm border border-secondary-border rounded w-full z-[99]'
            sideOffset={16}
          >
            <Select.Viewport className='select-none'>
              <Select.Group className='w-full flex flex-col gap-2 items-center'>{children}</Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
)

SelectInput.displayName = 'Select'


const SelectItem = forwardRef(({ children, value }: { children?: React.ReactNode[] | React.ReactNode, value: string }, forwardedRef: ForwardedRef<HTMLDivElement>) => {
  return (
    <Select.Item
      value={value}
      ref={forwardedRef}
      className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2 flex items-center gap-2 justify-between ring-0 outline-none focus:ring-0 focus:outline-none'
    >
      <Select.ItemText className=''>
        {children}
      </Select.ItemText>
      <Select.ItemIndicator className='flex flex-row gap-2 items-center text-win'>
        <CheckCircle />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectItem'

export { SelectInput, SelectItem }

// const select = forwardRef(
//   ({ name, placeholder, children, onChange, ...props }, forwardedRef) => {
//     return <Select.Root 
//             {...field}
//             defaultValue='auto'
//             onValueChange={field.onChange}
//           >
//             <Select.Trigger asChild>
//               <button className='text-subtle z-[2] px-4 py-1 right-6 bg-support border border-secondary-border rounded active:bg-accent hover:bg-accent duration-200 hover:text-secondary flex items-center gap-2 mim-w-[150px]'>
//                 <Select.Value asChild>
//                   <span>{field.value ?? 'Select something...'}</span>
//                 </Select.Value>
//                 <CaretDown />
//               </button>
//             </Select.Trigger>
//             <Select.Content 
//               className='bg-secondary shadow-sm border border-secondary-border rounded-sm w-full mt-2'
//               collisionPadding={8}
//               sideOffset={8}
//               alignOffset={8}
//             >
//               <Select.Group className='w-full flex flex-col gap-2 items-center'>
//                 <Select.Item defaultChecked className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2' value={'auto'}>Auto Detect Region</Select.Item>
//                 <Select.Separator className='w-[90%] h-0.5 bg-support' />
//                 <Select.Item className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2' value='NorthAmerica'>North America</Select.Item>
//                 <Select.Item className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2' value='SouthAmerica'>South America</Select.Item>
//                 <Select.Item className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2' value='Europe'>Europe</Select.Item>
//                 <Select.Item className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2' value='Asia'>Asia</Select.Item>
//                 <Select.Item className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2' value='Japan'>Japan</Select.Item>
//                 <Select.Item className='hover:text-secondary duration-200 cursor-pointer w-full hover:bg-accent rounded-md px-6 py-2' value='Oceania'>Oceania</Select.Item>
//               </Select.Group>
//             </Select.Content>
//           </Select.Root>     
//         }}
//       />