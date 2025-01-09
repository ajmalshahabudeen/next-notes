"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "motion/react"


export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
   <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      rotate: theme === "dark" ? 180 : 0,
    }}
   >
    {
      theme === "dark" ? (
        <Sun
          size={24}
          onClick={() => setTheme("light")}
        />
      ) : (
        <Moon
          size={24}
          onClick={() => setTheme("dark")}
        />
      )
    }
   </motion.div>
  )
}
