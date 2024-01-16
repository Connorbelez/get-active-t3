
interface compProps {
    heading: string,
    content: string,
    featured?: boolean,
}

export default function comp({heading,content,featured}: compProps) {

    return (
        <article className="Heading  prose text lg:prose-xl prose-zinc mb-8 tracking-tighter antialiased dark:prose-invert">
            {featured?
                <h1 className="lg:-mb-2 -mb-1 py-0 -mt-1 text-4xl">{"Featured Event: "}</h1>
                :null
            }
            <h1 className="lg:-mb-2 text-primary -mb-1 py-0 -mt-1">{heading}</h1>
            <p className="prose-sm font-bold tracking-normal ">
                {content}
            </p>
        </article>
    
    )
}