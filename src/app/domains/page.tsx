import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const domains = [
  { name: 'Artificial Intelligence & Machine Learning', description: 'Exploring the frontiers of intelligent systems, from neural networks to natural language processing.', icon: '🧠' },
  { name: 'Internet of Things (IoT) & Embedded Systems', description: 'Building the future of connected devices and hardware solutions that interact with the physical world.', icon: '🤖' },
  { name: 'Web & Mobile Development', description: 'Crafting modern, responsive, and performant digital experiences for browsers and mobile devices.', icon: '💻' },
  { name: 'Competitive Programming', description: 'Sharpening algorithmic thinking and problem-solving skills through competitive coding challenges.', icon: '🏆' },
  { name: 'Cybersecurity', description: 'Protecting digital systems and networks by understanding and mitigating vulnerabilities.', icon: '🛡️' },
  { name: 'Cloud Computing', description: 'Leveraging scalable cloud infrastructure and services to build and deploy robust applications.', icon: '☁️' },
  { name: 'Blockchain Technology', description: 'Diving into decentralized systems, cryptocurrencies, and smart contracts.', icon: '⛓️' },
  { name: 'Game Development', description: 'Creating immersive and interactive worlds with game engines and graphics programming.', icon: '🎮' },
];

export default function DomainsPage() {
  return (
    <div className="container mx-auto py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold tracking-tight">Our Domains</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          G-ELECTRA is a multidisciplinary club with a passion for technology. We explore a wide array of domains, pushing the boundaries of what's possible.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {domains.map((domain) => (
          <Card key={domain.name} className="flex flex-col bg-card/50 border-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="text-5xl">{domain.icon}</span>
                <CardTitle className="font-headline text-2xl">{domain.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{domain.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
