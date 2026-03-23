'use client'

import { authClient } from "@/lib/auth/client"

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ 
        provider: "google",
        callbackURL: "/dashboard" 
    })
  }

  return (
    <button 
        onClick={handleGoogleLogin}
        type="button"
        className="flex items-center justify-center gap-2 bg-transparent border border-input text-foreground rounded-lg p-2 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer w-full"
    >
      Google
    </button>
  )
}