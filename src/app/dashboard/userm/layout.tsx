
export default function Layout({
        children, // will be a page or nested layout
      }: {
        children: React.ReactNode
      }) {
        return (
          <section className="w-full">
            {children}
          </section>
        )
}