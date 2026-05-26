import { motion } from 'framer-motion';
import AnimatedButton from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center"
        >
          <div className="absolute inset-0 gradient-bg opacity-90" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Begin Your Transformation?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Schedule your complimentary consultation with our expert team and discover
              the Aether difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <AnimatedButton variant="light" size="lg" icon>
                  Book Your Consultation
                </AnimatedButton>
              </Link>
              <Link to="/contact">
                <AnimatedButton variant="secondary" size="lg">
                  Contact Us
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
