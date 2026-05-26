export default function SectionTitle({ title, subtitle, light = false, className = '' }) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-16 ${className}`}>
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-text-dark'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${light ? 'text-text-secondary' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
