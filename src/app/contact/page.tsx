'use client';

import { useForm, ValidationError } from '@formspree/react';
import { autoshedData } from '@/data/autoshed-data';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';

export default function ContactPage() {
  const { business, contact, social } = autoshedData;

  const [state, handleSubmit] = useForm('contact');

  const inputClasses =
    'w-full px-4 py-3 border border-gray-200 text-sm focus:border-gold focus:ring-0 focus:outline-none bg-white';
  const labelClasses = 'block text-sm font-medium text-near-black mb-2';

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-dark-bg">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-silver max-w-2xl mx-auto">
            We are here to help with any questions about our vehicles or services
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div>
              <SectionHeading
                title="Get in Touch"
                subtitle="We would love to hear from you. Contact us using any of the methods below."
              />

              {/* Contact Details */}
              <div className="space-y-8 mb-10">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-dark-bg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-near-black mb-2">Phone</h3>
                    <div className="space-y-1">
                      {contact.phones.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="block text-meta-gray hover:text-gold transition-colors"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-dark-bg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-near-black mb-2">Email</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-meta-gray hover:text-gold transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-dark-bg flex-shrink-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-near-black mb-2">Address</h3>
                    <p className="text-meta-gray leading-relaxed">
                      {contact.address.street}<br />
                      {contact.address.suburb}<br />
                      {contact.address.city}, {contact.address.postalCode}<br />
                      {contact.address.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 p-6 mb-10">
                <h3 className="text-lg font-bold text-near-black mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-meta-gray">Monday - Friday</span>
                    <span className="font-bold text-near-black">{contact.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-meta-gray">Saturday</span>
                    <span className="font-bold text-near-black">{contact.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-meta-gray">Sunday</span>
                    <span className="font-bold text-near-black">{contact.hours.sunday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-meta-gray">Public Holidays</span>
                    <span className="font-bold text-near-black">{contact.hours.publicHolidays}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold text-near-black mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8">
                <h2 className="text-2xl font-bold text-near-black mb-2">Send Us a Message</h2>
                <p className="text-meta-gray mb-8">
                  Fill out the form below and we will get back to you as soon as possible.
                </p>

                {state.succeeded ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gold mx-auto flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-near-black mb-2">Message Sent</h3>
                    <p className="text-meta-gray mb-6">
                      Thank you for contacting us. We will get back to you shortly.
                    </p>
                    <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClasses}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className={inputClasses}
                          placeholder="John Doe"
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClasses}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          className={inputClasses}
                          placeholder="012 345 6789"
                        />
                        <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={inputClasses}
                        placeholder="john@example.com"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="subject" className={labelClasses}>
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className={inputClasses}
                      >
                        <option value="">Select a subject</option>
                        <option value="vehicle-enquiry">Vehicle Enquiry</option>
                        <option value="finance">Finance Enquiry</option>
                        <option value="trade-in">Trade-In Enquiry</option>
                        <option value="sell-my-car">Sell My Car</option>
                        <option value="service">Service & Warranty</option>
                        <option value="general">General Enquiry</option>
                      </select>
                      <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClasses}>
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className={inputClasses}
                        placeholder="How can we help you?"
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={state.submitting}
                    >
                      {state.submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-4">
              Visit Our Showroom
            </p>
            <h2 className="heading-display text-3xl sm:text-4xl text-near-black mb-4">
              Find Us
            </h2>
            <p className="text-meta-gray max-w-2xl mx-auto">
              {contact.address.street}, {contact.address.suburb}, {contact.address.city}, {contact.address.postalCode}
            </p>
          </div>
          <div className="aspect-[16/9] lg:aspect-[21/9] w-full shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448.0!2d28.1920191!3d-25.865026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16825fc1c96b637%3A0xf0df7fae6a9ee154!2sThe%20Auto%20Shed!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${business.name} Location`}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-dark-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl text-white mb-6">
            Ready to Find Your Dream Vehicle?
          </h2>
          <p className="text-lg text-silver max-w-2xl mx-auto mb-10">
            Browse our extensive inventory of premium vehicles or visit our showroom to experience
            the {business.name} difference.
          </p>
          <Button href="/vehicles" variant="primary" size="lg">
            View Inventory
          </Button>
        </div>
      </section>
    </>
  );
}
