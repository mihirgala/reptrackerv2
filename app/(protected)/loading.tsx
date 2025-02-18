'use client'

import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <div className="text-center">
            <h2 className="text-xl font-semibold tracking-tight">
              Loading
            </h2>
            <p className="text-muted-foreground">
              Please wait while we prepare everything for you
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}