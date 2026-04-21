import { autoshedData } from '@/data/autoshed-data';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';

export default function AboutPage() {
  const { business, usps, qualityStandards, team } = autoshedData;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-dark-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">
            About Us
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            {business.tagline}
          </h1>
          <p className="text-lg text-silver max-w-2xl mx-auto">
            {business.description}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                title="Our Story"
                subtitle="Building trust through excellence since 2022"
              />
              <div className="space-y-4 text-meta-gray leading-relaxed">
                <p>
                  {business.longDescription}
                </p>
                <p>
                  Founded in {business.founded}, The Autoshed has quickly established itself as
                  a trusted name in the premium pre-owned vehicle market. Our success is built
                  on a simple principle: treat every customer the way we would want to be treated.
                </p>
                <p>
                  With over 28 years of combined motor industry experience, our team brings
                  unparalleled expertise to every transaction. We understand that purchasing a
                  premium vehicle is a significant decision, and we are committed to making
                  that process as seamless and transparent as possible.
                </p>
              </div>
            </div>
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80)',
              }}
            />
          </div>
        </div>
      </section>

      {/* USPs Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose The Autoshed"
            subtitle="What sets us apart from the competition"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, index) => (
              <div key={index} className="bg-white p-8 border-b-2 border-gold">
                <div className="w-16 h-16 bg-gold flex items-center justify-center mb-6">
                  <span className="text-white text-2xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-near-black mb-3">{usp.title}</h3>
                <p className="text-sm text-meta-gray leading-relaxed">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              className="aspect-[4/3] bg-cover bg-center order-2 lg:order-1"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80)',
              }}
            />
            <div className="order-1 lg:order-2">
              <SectionHeading
                title="Leadership"
                subtitle="Experienced professionals dedicated to your satisfaction"
              />
              <div className="space-y-6">
                <div className="border-l-2 border-gold pl-6">
                  <h3 className="text-xl font-bold text-near-black mb-2">{team.managingDirector}</h3>
                  <p className="text-sm text-gold font-bold uppercase tracking-wider mb-3">Managing Director</p>
                  <p className="text-meta-gray leading-relaxed">{team.description}</p>
                </div>
                <p className="text-meta-gray leading-relaxed">
                  Our team shares a passion for premium vehicles and a commitment to delivering
                  exceptional service. Every member of the Autoshed family understands that our
                  reputation is built one customer at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section id="quality" className="py-16 lg:py-24 bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Quality Standards"
            subtitle="Every vehicle must meet our rigorous inspection criteria before it earns the Autoshed Approved badge"
            centered
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <div key={index} className="flex items-start gap-4 p-4">
                <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-white text-sm leading-relaxed">{standard}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-dark-bg mx-auto flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-near-black mb-3">Integrity</h3>
              <p className="text-meta-gray leading-relaxed">
                We believe in complete transparency. What you see is what you get, with no hidden
                surprises or fine print.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-dark-bg mx-auto flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-near-black mb-3">Excellence</h3>
              <p className="text-meta-gray leading-relaxed">
                We settle for nothing less than the best. Every vehicle we sell meets our exacting
                standards for quality and condition.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-dark-bg mx-auto flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-near-black mb-3">Relationships</h3>
              <p className="text-meta-gray leading-relaxed">
                With 70% repeat business, we focus on building lasting relationships, not just
                making sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-meta-gray max-w-2xl mx-auto mb-10">
            Visit our showroom or browse our inventory online. Discover why over 70% of our
            customers come back or refer their friends and family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/vehicles" variant="primary" size="lg">
              Browse Inventory
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
