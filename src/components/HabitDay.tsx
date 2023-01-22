import * as Popover from "@radix-ui/react-popover"
import { ProgressBar } from "./ProgressBar"

import clsx from "clsx"
import dayjs from "dayjs"
import { HabitsList } from "./HabitsList"
import { useState } from "react"

interface HabitDayProps {
  date: Date
  defaultCompleted?: number
  amount?: number
}

export default function HabitDay({
  defaultCompleted = 0,
  amount = 0,
  date,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedpercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const dayAndMonth = dayjs(date).format("DD/MM")
  const dayOfWeek = dayjs(date).format("dddd")

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        //clsx aplicar regras mais complexas para uma classe de css
        // da um estilo para cada tipo cor nos habitos
        className={clsx(
          "w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-900 border-zinc-800": completedpercentage === 0,

            "bg-violet-900 border-violet-700":
              completedpercentage > 0 && completedpercentage < 20,

            "bg-violet-800 border-violet-600":
              completedpercentage >= 20 && completedpercentage < 40,

            "bg-violet-700 border-violet-500":
              completedpercentage >= 40 && completedpercentage < 60,

            "bg-violet-600 border-violet-500":
              completedpercentage >= 60 && completedpercentage < 80,

            "bg-violet-500 border-violet-400": completedpercentage >= 80,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>
            {dayAndMonth}
          </span>
          <ProgressBar progress={completedpercentage} />
          <HabitsList date={date} onCompletedChanged={handleCompletedChanged} />
          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
