interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  const alignment = centered ? 'text-center' : 'text-left';
  const titleColor = light ? 'text-white' : 'text-near-black';
  const subtitleColor = light ? 'text-silver' : 'text-meta-gray';

  return (
    <div className={`mb-10 lg:mb-12 ${alignment}`}>
      <h2
        className={`heading-display text-3xl sm:text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg max-w-2xl ${subtitleColor} ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
