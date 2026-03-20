import { Users, Mail, Bell, Settings, BarChart3, Lock } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Contact Management',
      description: 'Organize and manage unlimited contacts with birthdates and relationship information.',
    },
    {
      icon: Mail,
      title: 'Automated Messages',
      description: 'Send personalized birthday wishes via email automatically at the perfect time.',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Get notified about upcoming birthdays so you can prepare in advance.',
    },
    {
      icon: Settings,
      title: 'Custom Templates',
      description: 'Create and save message templates for different people and occasions.',
    },
    {
      icon: BarChart3,
      title: 'Message History',
      description: 'Track all sent messages and delivery confirmations in one place.',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data is secure with us. We never share your contacts or messages.',
    },
  ]

  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to automate your birthday celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="rounded-lg border border-border bg-background p-6">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
