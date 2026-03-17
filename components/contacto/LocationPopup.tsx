'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'

export default function LocationPopup ({
  label,
  viewText,
  locationValue,
  mapButtonText
}: {
  label: string
  viewText: string
  locationValue: string
  mapButtonText: string
}) {
  const [showLocation, setShowLocation] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowLocation(true)}
        className='group flex items-center gap-3 px-5 py-3 rounded-full border border-[var(--border-brand)] bg-[var(--bg-2)] hover:bg-white/10 dark:hover:bg-white/10 hover:border-[var(--text-brand)] transition-all duration-300 hover:scale-105 text-[var(--text-1)] dark:text-[var(--text-1)]'
      >
        <div className='p-2 rounded-full bg-[var(--bg-brand)]/10 group-hover:bg-[var(--bg-brand)]/20 transition-colors'>
          <MapPin className='w-4 h-4 text-[var(--text-brand)]' />
        </div>
        <div className='flex flex-col items-start'>
          <span className='text-xs opacity-70'>{label}</span>
          <span className='text-sm font-semibold'>{viewText}</span>
        </div>
      </button>

      {showLocation && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
          onClick={() => setShowLocation(false)}
        >
          <div
            className='relative w-full max-w-3xl bg-[var(--bg-1)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-brand)]'
            onClick={e => e.stopPropagation()}
          >
            <div className='p-8 text-center space-y-6'>
              <MapPin className='w-16 h-16 mx-auto text-[var(--text-brand)]' />

              <div>
                <p className='text-sm opacity-70 mb-1'>{label}</p>
                <p className='text-lg font-semibold text-[var(--text-1)]'>
                  {locationValue}
                </p>
              </div>

              <a
                href='https://maps.app.goo.gl/77mA2wwW4QpcCUkT9'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-brand)] text-[var(--text-inverse)] hover:bg-[var(--bg-brand)]/80 transition-colors'
                onClick={e => e.stopPropagation()}
              >
                <MapPin className='w-4 h-4' />
                <span>{mapButtonText}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
