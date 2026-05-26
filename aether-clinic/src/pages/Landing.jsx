import { motion } from 'framer-motion';
import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import TreatmentsSection from '../components/landing/TreatmentsSection';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import DoctorsSection from '../components/landing/DoctorsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';

export default function Landing() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HeroSection />
      <StatsSection />
      <TreatmentsSection />
      <WhyChooseUs />
      <DoctorsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </motion.div>
  );
}
