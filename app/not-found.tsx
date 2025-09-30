'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-5'>
      <h1 className='text-4xl font-bold'>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button variant="link" asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage