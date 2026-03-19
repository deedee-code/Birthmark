import { NavHeader } from '@/components/layout/nav-header'
import { Footer } from '@/components/landing/cta-footer'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Terms of Service - Birthmark',
  description: 'Birthmark Terms of Service',
}

export default function TermsPage() {
  return (
    <main className="bg-background">
      <NavHeader />
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Birthmark, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily download one copy of the materials (information or software) on Birthmark for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-3 ml-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the site</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on Birthmark are provided on an 'as is' basis. Birthmark makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall Birthmark or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Birthmark.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Revisions and Errata</h2>
              <p className="text-muted-foreground">
                The materials appearing on Birthmark could include technical, typographical, or photographic errors. Birthmark does not warrant that any of the materials on the site are accurate, complete, or current.
              </p>
            </section>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
