import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number.';
    if (!formData.message.trim()) errs.message = 'Please enter your message.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error: any) {
      console.error('EmailJS Error status:', error?.status);
      setSubmitError(
        error?.text || 'Failed to send message. Please check your network connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-28 pb-20">
      {/* Hero */}
      <section className="bg-surface-container py-16 px-margin-mobile lg:px-margin-desktop mb-16 border-b border-outline-variant/30 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="font-body text-xs font-bold text-secondary uppercase tracking-[0.2em]">
            CONNECT WITH US
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
            {t.contactPage.heroTitle}
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant">
            {t.contactPage.heroSub}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Committee */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-md space-y-6">
            <h2 className="font-display font-bold text-2xl text-primary">
              {t.contactPage.locationTitle}
            </h2>

            <div className="space-y-6 font-body text-sm text-on-surface-variant">
              {/* Address */}
              <div className="flex gap-3.5 items-start">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div className="leading-relaxed">
                  <strong className="block text-on-surface font-semibold text-base mb-0.5">Sheetla Mata Mandir</strong>
                  Village Lagdevi<br />
                  Tehsil Bamson (Tauni Devi)<br />
                  District Hamirpur<br />
                  Himachal Pradesh – 177022<br />
                  India
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3.5 items-center pt-2 border-t border-outline-variant/20">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+916230624011"
                  className="text-on-surface font-semibold text-base hover:text-secondary transition-colors"
                >
                  +91 62306 24011
                </a>
              </div>

              {/* Email */}
              <div className="flex gap-3.5 items-center pt-2 border-t border-outline-variant/20">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:harshlagwal123@gmail.com"
                  className="text-on-surface font-semibold text-base hover:text-secondary transition-colors break-all"
                >
                  harshlagwal123@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-lg">
          <SectionHeading
            tag="GET IN TOUCH"
            title={t.contactPage.formTitle}
            subtitle="Send your devotional inquiries, puja requests, or feedback."
            centered={false}
          />

          {submitted ? (
            <div className="bg-surface-container-low border border-secondary/40 p-6 rounded-2xl flex items-start gap-4 text-primary animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-secondary shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-bold text-lg">Jai Mata Di 🙏 Your message has been sent successfully.</h4>
                <p className="font-body text-xs text-on-surface-variant mt-1">
                  Our mandir sevadars will review your message.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError(null);
                  }}
                  className="mt-4 text-xs font-bold text-secondary underline hover:text-primary"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 text-xs font-semibold">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div>
                <label className="block font-body text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                  {t.contactPage.nameLabel} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  disabled={isSubmitting}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/50 focus:border-primary focus:outline-none font-body text-sm transition-colors disabled:opacity-50"
                />
                {errors.name && (
                  <span className="flex items-center gap-1 text-xs text-red-600 mt-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    {t.contactPage.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    disabled={isSubmitting}
                    maxLength={20}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/50 focus:border-primary focus:outline-none font-body text-sm transition-colors disabled:opacity-50"
                  />
                  {errors.phone && (
                    <span className="flex items-center gap-1 text-xs text-red-600 mt-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-body text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    {t.contactPage.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    disabled={isSubmitting}
                    maxLength={254}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/50 focus:border-primary focus:outline-none font-body text-sm transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                  {t.contactPage.messageLabel} *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your query or message..."
                  disabled={isSubmitting}
                  maxLength={2000}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/50 focus:border-primary focus:outline-none font-body text-sm transition-colors disabled:opacity-50"
                />
                {errors.message && (
                  <span className="flex items-center gap-1 text-xs text-red-600 mt-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
                icon={<Send className="w-4 h-4" />}
              >
                {isSubmitting ? "Sending..." : t.common.sendMessage}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

