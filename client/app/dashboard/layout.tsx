import { Sidebar } from '@/components/dashboard/sidebar'
import { ProtectedRoute } from '@/components/dashboard/protected-route'
import { DataProvider } from '@/contexts/data-context'

export const metadata = {
  title: 'Dashboard - Birthmark',
  description: 'Manage your contacts and birthday wishes',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <DataProvider>
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </DataProvider>
    </ProtectedRoute>
  )
}
