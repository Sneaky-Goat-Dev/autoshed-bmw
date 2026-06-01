import { autoshedData } from '@/data/autoshed-data';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';

const AUTOBID_URL = 'https://www.autobid.co.za/guesstimate/step1customerhca.php?nc=2375189604&dID=1976&userid=101232';

export default function SellYourCarPage() {
  const { sellCarRequirements } = autoshedData;

  const processSteps = [
    {
      number: '01',
      title: 'Get a Valuation',
      description: 'Use our online valuation tool to submit your vehicle details in minutes.',
    },
    {
      number: '02',
      title: 'Vehicle Assessment',
      description: 'Our team will review your submission and arrange an inspection if required.',
    },
    {
      number: '03',
      title: 'Receive Offer',
      description: 'We provide a fair market valuation based on condition and current market trends.',
    },
    {
      number: '04',
      title: 'Complete Sale',
      description: 'Accept our offer and receive payment quickly with minimal paperwork.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-dark-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">
            Sell Your Vehicle
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Get a Fair Price for Your Car
          </h1>
          <p className="text-lg text-silver max-w-2xl mx-auto">
            Quick, hassle-free process with competitive market valuations
          </p>
        </div>
      </section>

      {/* Valuation CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 p-10 lg:p-14 text-center">
              <div className="w-16 h-16 bg-gold mx-auto flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-4">
                Get Your Instant Valuation
              </h2>
              <p className="text-meta-gray max-w-lg mx-auto mb-8 leading-relaxed">
                Use our online valuation tool to get a competitive estimate for your vehicle in minutes.
                No obligations — just an honest market price.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button
                  href={AUTOBID_URL}
                  external
                  variant="primary"
                  size="lg"
                >
                  Start My Valuation
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Speak to Us First
                </Button>
              </div>
              <p className="text-xs text-meta-gray">
                You will be taken to our secure valuation partner. Your information is handled in
                accordance with POPIA regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Selling your vehicle has never been easier"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200" />
                )}
                <div className="relative text-center">
                  <div className="w-16 h-16 bg-gold mx-auto flex items-center justify-center mb-6 relative z-10">
                    <span className="text-white text-xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-near-black mb-2">{step.title}</h3>
                  <p className="text-sm text-meta-gray leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sell To Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                title="Why Sell to The Autoshed?"
                subtitle="We make selling your vehicle simple and rewarding"
              />
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">Fair Market Valuations</h4>
                    <p className="text-sm text-meta-gray">
                      We use current market data to ensure you receive a competitive offer for your vehicle.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">Quick Payment</h4>
                    <p className="text-sm text-meta-gray">
                      Once the sale is agreed, we process payment promptly with no delays.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">No Hassle</h4>
                    <p className="text-sm text-meta-gray">
                      Avoid the stress of private sales, endless inquiries, and time-wasters.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold flex-shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-near-black mb-1">Trade-In Option</h4>
                    <p className="text-sm text-meta-gray">
                      Use your vehicle as a trade-in towards your next premium purchase.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 lg:py-24 bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What You Will Need"
            subtitle="Have these documents ready to speed up the process"
            centered
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {sellCarRequirements.map((requirement, index) => (
              <div key={index} className="flex items-center gap-3 bg-dark-surface p-4">
                <div className="w-8 h-8 bg-gold flex-shrink-0 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white text-sm">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-6">
            Looking to Upgrade?
          </h2>
          <p className="text-lg text-meta-gray max-w-2xl mx-auto mb-10">
            Trade in your current vehicle and drive away in something new. Browse our premium
            inventory to find your next dream car.
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
