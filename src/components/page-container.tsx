export const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            {children}
        </main>
    )
}