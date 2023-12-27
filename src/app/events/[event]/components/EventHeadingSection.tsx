
interface compProps {
    heading: string,
    content: string,
}

export default function comp({heading,content}: compProps) {

    return (
        <article className="Heading prose lg:prose-xl prose-zinc mb-8 tracking-tighter antialiased dark:prose-invert">
            <h1 className="lg:-mb-2 -mb-1 py-0 -mt-1">{heading}</h1>
            <p className="prose-sm font-bold tracking-normal ">
                {content}
            </p>
        </article>
    
    )
}