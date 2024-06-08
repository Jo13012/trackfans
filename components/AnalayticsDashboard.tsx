'use client'

import { BarChart, Card } from '@tremor/react'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'

interface AnalyticsDashboardProps {
  subscriptions: number
  tips: string
  referrals: number
  messages: number
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0
  const isNeutral = percentage === 0
  const isNegative = percentage < 0

  if (isNaN(percentage)) return null

  const positiveClassname = 'bg-green-900/25 text-green-400 ring-green-400/25'
  const neutralClassname = 'bg-zinc-900/25 text-zinc-400 ring-zinc-400/25'
  const negativeClassname = 'bg-red-900/25 text-red-400 ring-red-400/25'

  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        isPositive
          ? positiveClassname
          : isNeutral
          ? neutralClassname
          : negativeClassname
      }`}>
      {isPositive ? <ArrowUpRight className='h-3 w-3' /> : null}
      {isNeutral ? <ArrowRight className='h-3 w-3' /> : null}
      {isNegative ? <ArrowDownRight className='h-3 w-3' /> : null}
      {percentage.toFixed(0)}%
    </span>
  )
}

const chartdata = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
  {
    name: 'Ferns',
    'Number of threatened species': 281,
  },
  {
    name: 'Arachnids',
    'Number of threatened species': 251,
  },
  {
    name: 'Corals',
    'Number of threatened species': 232,
  },
  {
    name: 'Algae',
    'Number of threatened species': 98,
  },
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();


const AnalyticsDashboard = ({
  subscriptions,
  tips,
  referrals,
  messages,
}: AnalyticsDashboardProps) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6'>

        <Card className='w-full'>
          <p className='flex gap-2.5 items-center text-tremor-white text-white-tremor-content'>
            Subscriptions
            <Badge
              percentage={
                (240 / Number(220) - 1) * 100
              }
            />
          </p>
          <p className='text-3xl text-white-tremor-content-strong font-semibold'>
            {subscriptions}
          </p>
        </Card>

        <Card className='w-full'>
          <p className='flex gap-2.5 items-center text-tremor-white text-white-tremor-content'>
            Tips
            <Badge
              percentage={
                (318 / Number(284) - 1) * 100
              }
            />
          </p>
          <p className='text-3xl text-white-tremor-content-strong font-semibold'>
            {tips}
          </p>
        </Card>

        <Card className='w-full'>
          <p className='flex gap-2.5 items-center text-tremor-white text-white-tremor-content'>
            Messages
            <Badge
              percentage={
                (2150 / Number(2261) - 1) * 100
              }
            />
          </p>
          <p className='text-3xl text-white-tremor-content-strong font-semibold'>
            {messages}
          </p>
        </Card>

        <Card className='w-full'>
          <p className='flex gap-2.5 items-center text-tremor-white text-white-tremor-content'>
            Referrals
          </p>
          <p className='text-3xl text-white-tremor-content-strong font-semibold'>
            {referrals}
          </p>
        </Card>

      </div>

      <Card className="bg-red">
      <BarChart
        className="mt-6 bg-green"
        data={chartdata}
        index="name"
        categories={['Number of threatened species']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
        
      </Card>
    </div>
  )
}

export default AnalyticsDashboard