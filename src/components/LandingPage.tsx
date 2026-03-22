import { motion } from "framer-motion";
import { ArrowRight, Shield, MessageCircle, CheckCircle } from "lucide-react";

interface LandingPageProps {
  onStartChat: () => void;
}

const features = [
  {
    icon: MessageCircle,
    title: "Just talk naturally",
    description: "Tell us about yourself in your own words. No confusing forms to fill.",
  },
  {
    icon: Shield,
    title: "400+ schemes covered",
    description: "Central and state schemes across education, health, agriculture, and more.",
  },
  {
    icon: CheckCircle,
    title: "Step-by-step guidance",
    description: "Clear instructions on how to apply, what documents you need, and where to go.",
  },
];

const LandingPage = ({ onStartChat }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-display text-xl font-semibold text-foreground">
            Scheme<span className="text-primary">Aware</span>
          </span>
          <span className="text-sm text-muted-foreground font-body">
            Your rights, simplified
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pb-24 pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-6 inline-block rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              Trusted by citizens across India
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your rightful benefits,{" "}
            <span className="text-primary">simplified</span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Tell us a little about yourself, and we'll find the government schemes
            you're eligible for — with clear steps to apply.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            <button
              onClick={onStartChat}
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-card transition-all duration-150 hover:shadow-card-hover hover:scale-[1.02] active:scale-[0.98]"
            >
              Find Schemes For Me
              <ArrowRight className="h-5 w-5 transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto max-w-5xl text-center text-sm text-muted-foreground">
          SchemeAware is not affiliated with any government body. We help you discover schemes — applications happen on official portals.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
