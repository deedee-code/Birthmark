export function HowItWorks() {
  const steps = [
    {
      number: '1',
      emoji: '✍️',
      title: 'Sign Up & Add Contacts',
      description: 'Create your Birthmark account and add your loved ones with their birthdate and contact preferences.',
    },
    {
      number: '2',
      emoji: '✨',
      title: 'Customize Messages',
      description: 'Create personalized message templates for different relationships and occasions.',
    },
    {
      number: '3',
      emoji: '🤖',
      title: 'Sit Back & Relax',
      description: 'Our background jobs monitor upcoming birthdays and send messages automatically on the day.',
    },
    {
      number: '4',
      emoji: '🎉',
      title: 'Stay Connected',
      description: 'View history and confirmations of sent messages in your dashboard.',
    },
  ]

  return (
    <section id="how-it-works" className="px-4 py-24 sm:px-6 lg:px-8 bg-muted/40">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Simple process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How Birthmark Works</h2>
          <p className="text-lg text-muted-foreground">
            Get started in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative flex gap-5 rounded-2xl border border-border bg-card p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Step number + emoji */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white font-bold text-sm shadow-md shadow-primary/25">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block w-0.5 flex-1 bg-gradient-to-b from-border to-transparent min-h-4" />
                )}
              </div>
              <div className="pt-1 pb-2">
                <div className="text-2xl mb-2">{step.emoji}</div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
