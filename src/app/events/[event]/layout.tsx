
export default function Layout({
        children, // will be a page or nested layout
      }: {
        children: React.ReactNode
      }) {
        return (
          <section className="EVENTLAYOUT max-w-7xl w-full sm:px-6">
            {children}
            <footer className="h-[100px]"></footer>
          </section>
        )
}