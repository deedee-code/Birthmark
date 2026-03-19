import { NavHeader } from '@/components/layout/nav-header'
import { Footer } from '@/components/landing/cta-footer'
import { Card } from '@/components/ui/card'

export const metadata = {
  title: 'Privacy Policy - Birthmark',
  description: 'Birthmark Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <main className="bg-background">
      <NavHeader />
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <Card className="p-8 prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold">Introduction</h2>
              <p className="text-muted-foreground">
                Birthmark ("we", "our", or "us") operates the Birthmark application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Information Collection</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly, such as when you create an account, including your name, email address, and contact information for the people in your birthday list.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Data Security</h2>
              <p className="text-muted-foreground">
                We take the security of your personal information seriously. Your data is stored securely and we use industry-standard encryption to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@birthmark.app
              </p>
            </section>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
