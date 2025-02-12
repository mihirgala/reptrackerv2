import React from 'react'

interface ChatbotLayoutProps {
    children: React.ReactNode
}
const ChatbotLayout = ({ children }: ChatbotLayoutProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default ChatbotLayout