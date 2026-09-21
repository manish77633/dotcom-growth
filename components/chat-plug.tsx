'use client'

import { useEffect } from 'react'

interface ChatPlugProps {
  id?: string
}

export function ChatPlug({ id = '57c70efe-0848-4948-ae57-68e41641e6cb' }: ChatPlugProps) {
  useEffect(() => {
    const scriptSrc = `https://chatplug-v1.onrender.com/embed/${id}/widget.js`
    
    // Check if widget elements or script already exist to prevent duplicates
    if (document.getElementById('eiq-btn') || document.querySelector(`script[src="${scriptSrc}"]`)) {
      return
    }

    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    document.body.appendChild(script)
  }, [id])

  return null
}

export default ChatPlug
