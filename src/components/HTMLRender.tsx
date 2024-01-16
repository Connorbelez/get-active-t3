"use client"
export const runtime = 'node'
import parse from 'html-react-parser';

interface compProps {
    content: string,
}

export default async function Comp({
    content
}: compProps) {
    const parsedContent: JSX.Element | JSX.Element[] =  parse(content) as JSX.Element | JSX.Element[]
    
    return (
        <div className="w-full prose dark:prose-invert antialiased ">
        { parsedContent ?
            
            parsedContent
            : "Loading"
                
        }
    </div>
    )
}