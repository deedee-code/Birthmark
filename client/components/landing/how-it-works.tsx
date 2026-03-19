import { CheckCircle } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Sign Up & Add Contacts',
      description: 'Create your Birthmark account and add your loved ones with their birthdate and contact preferences.',
    },
    {
      number: '2',
      title: 'Customize Messages',
      description: 'Create personalized message templates for different relationships and occasions.',
    },
    {
      number: '3',
      title: 'Sit Back & Relax',
      description: 'Our background jobs monitor upcoming birthdays and send messages automatically on the day.',
    },
    {
      number: '4',
      title: 'Stay Connected',
      description: 'View history and confirmations of sent messages in your dashboard.',
    },
  ]

  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Birthmark Works</h2>
          <p className="text-lg text-muted-foreground">
            Get started in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold text-sm mb-4">
                  {step.number}
                </div>
                <div className="hidden md:block h-12 w-0.5 bg-border" />
              </div>
              <div className="pb-8">
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
