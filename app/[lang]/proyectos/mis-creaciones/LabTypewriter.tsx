'use client'
import { TypeAnimation } from 'react-type-animation'

export default function LabTypewriter({ sequence }: { sequence: string[] }) {
  const typewriterSequence = sequence.flatMap((text: string) => [text, 2000]);

  return (
    <TypeAnimation
      sequence={typewriterSequence}
      wrapper='span'
      cursor={true}
      repeat={Infinity}
      className='inline-block'
    />
  )
}