"use client"

import React, { useEffect, useId, useState } from "react"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[]
  /** Time in milliseconds between word transitions */
  interval?: number
  /** Additional CSS classes to apply to the container */
  className?: string
  /** Additional CSS classes to apply to the text */
  textClassName?: string
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [width, setWidth] = useState(100)
  const textRef = React.useRef<HTMLDivElement | null>(null)
  const containerRef = React.useRef<HTMLSpanElement | null>(null)

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth
      let horizontalPadding = 40

      if (containerRef.current && typeof window !== "undefined") {
        const styles = window.getComputedStyle(containerRef.current)
        horizontalPadding =
          parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
      }

      setWidth(textWidth + horizontalPadding)
    }
  }

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord()
  }, [currentWordIndex])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval)

    return () => clearInterval(intervalId)
  }, [words, interval])

  return (
    <motion.span
      ref={containerRef}
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-flex items-center justify-center align-middle whitespace-nowrap rounded-full border border-muted-foreground/50 bg-card/70 px-[30px] py-2 text-inherit shadow-sm transition-colors",
        "dark:border-muted-foreground/60 dark:bg-card/30 dark:text-inherit",
        className
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block text-inherit", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.span>
  )
}
