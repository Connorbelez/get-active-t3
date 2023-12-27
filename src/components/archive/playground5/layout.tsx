
export default function Layout({
        children, // will be a page or nested layout
      }: {
        children: React.ReactNode
      }) {
        return (
          <section>
            {children}
            <footer className="h-[100px]"></footer>
          </section>
        )
}