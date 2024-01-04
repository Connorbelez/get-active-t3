
export default function Layout({
        children, // will be a page or nested layout
      }: {
        children: React.ReactNode
      }) {
        return (
          <section className="EVENTLAYOUT sm:px-6 max-w-7xl">
            {children}
            <footer className="h-[100px]"></footer>
          </section>
        )
}