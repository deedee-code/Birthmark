import { Users, Mail, Bell, Settings, BarChart3, Lock } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Contact Management',
    description: 'Organize and manage unlimited contacts with birthdates and relationship information.',
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
    hoverBorder: 'hover:border-primary/30',
    hoverShadow: 'hover:shadow-primary/5',
  },
  {
    icon: Mail,
    title: 'Automated Messages',
    description: 'Send personalized birthday wishes via email automatically at the perfect time.',
    gradient: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
    hoverBorder: 'hover:border-accent/30',
    hoverShadow: 'hover:shadow-accent/5',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Get notified about upcoming birthdays so you can prepare thoughtful surprises.',
    gradient: 'from-sky-500/20 to-sky-500/5',
    iconColor: 'text-sky-500',
    hoverBorder: 'hover:border-sky-500/30',
    hoverShadow: 'hover:shadow-sky-500/5',
  },
  {
    icon: Settings,
    title: 'Custom Templates',
    description: 'Create and save message templates for different people and special occasions.',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    iconColor: 'text-indigo-500',
    hoverBorder: 'hover:border-indigo-500/30',
    hoverShadow: 'hover:shadow-indigo-500/5',
  },
  {
    icon: BarChart3,
    title: 'Message History',
    description: 'Track all sent messages and delivery confirmations in one clear dashboard.',
    gradient: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-500',
    hoverBorder: 'hover:border-blue-500/30',
    hoverShadow: 'hover:shadow-blue-500/5',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data is stored locally in your browser. We never share your contacts or messages.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-500',
    hoverBorder: 'hover:border-emerald-500/30',
    hoverShadow: 'hover:shadow-emerald-500/5',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to automate your birthday celebrations and never miss a moment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`group rounded-2xl border border-border bg-card p-7 ${feature.hoverBorder} hover:shadow-lg ${feature.hoverShadow} transition-all duration-300`}
              >
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5`}>
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
