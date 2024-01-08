
export default function Layout({
        children, // will be a page or nested layout
      }: {
        children: React.ReactNode
      }) {
        return (
          <div className={"w-full h-full flex flex-col items-center"}>
            {children}
          </div>
        )
}