export default function Layout({
                                   children, // will be a page or nested layout
                               }: {
    children: React.ReactNode
}) {
    return (
        <section className={"flex w-full flex-grow justify-center max-w-6xl"}>
            {/* Include shared UI here e.g. a header or sidebar */}


            {children}
        </section>
    )
}