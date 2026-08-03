"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

import * as FAQApi from "@/lib/faqApi";
import { FAQ as FAQType } from "@/types/faq";
import { Reveal } from "./Reveal";

export function FAQ() {
  const [open, setOpen] = useState(-1);
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const data = await FAQApi.getActiveFAQs();
        console.log("FAQs:", data);
        setFaqs(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load FAQs.");
      } finally {
        setLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        Loading FAQs...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section id="faq" className="bg-[#FAF7FF] py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">

          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">
                Frequently asked questions
              </span>

              <h2 className="section-heading mt-5">
                Questions? Let’s make wellness clearer.
              </h2>

              <p className="mt-5 max-w-md text-[14px] leading-[1.8] text-[#716A78]">
                Find quick answers about product ranges,
                information, shopping and support.
              </p>

              <a href="#newsletter" className="btn-primary mt-7">
                Join the community
              </a>
            </div>
          </Reveal>

          <div className="space-y-3">

            {faqs.map((faq, index) => (

              <Reveal
                key={faq.faqId}
                delay={index * 0.04}
              >

                <article className="overflow-hidden rounded-[24px] border border-[#E9E3EE] bg-white">

                  <button
                    onClick={() =>
                      setOpen(open === index ? -1 : index)
                    }
                    className="flex min-h-20 w-full items-center justify-between gap-6 px-6 text-left"
                  >
                    <span className="text-[15px] font-extrabold text-[#2E0569]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`transition ${
                        open === index
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>

                    {open === index && (

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        className="overflow-hidden"
                      >

                        <p className="border-t border-[#F0EAF4] px-6 py-5 text-[13px] leading-[1.8] text-[#716A78]">
                          {faq.answer}
                        </p>

                      </motion.div>

                    )}

                  </AnimatePresence>

                </article>

              </Reveal>

            ))}

          </div>
        </div>
      </div>
    </section>
  );
}

const footerColumns = [
  {
    title: "Shop",
    links: [
      ["All products", "/shop"],
      ["Ayurveda", "/shop/ayurveda"],
      ["Nutraceuticals", "/shop/nutraceuticals"],
      ["External wellness", "/shop?range=External+Wellness"],
      ["Wellness sets", "/shop?range=Wellness+Sets"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Knowledge hub", "/knowledge"],
      ["Ingredient library", "/#ingredients"],
      ["Quality", "/quality"],
      ["Our story", "/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Business enquiry", "/b2b"],
      ["Shipping policy", "/policies/shipping"],
      ["Returns policy", "/policies/returns"],
      ["Privacy policy", "/policies/privacy"],
      ["Terms of use", "/policies/terms"],
    ],
  },
];

const footerSocials = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-[#210044] text-white">
      <div className="container-page pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand */}
          <div>
            <div className="relative h-12 w-52">
              {/* Logo on dark background: use a white version when available */}
              <span className="font-display text-[22px] font-extrabold tracking-[-.03em] text-white">
                Pradnyasanskar
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-[1.8] text-white/[.68]">
              Thoughtful Ayurvedic wisdom and nutraceutical clarity, brought together in one modern wellness experience.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {footerSocials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="footer-social">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-[#FFBB58]">{column.title}</p>
                <ul className="mt-5 space-y-3">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="text-[13px] font-semibold text-white/[.72] transition hover:text-white">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 grid gap-5 border-t border-white/[.12] pt-8 text-[12.5px] text-white/[.62] sm:grid-cols-3">
          <p className="flex items-start gap-2.5">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#FFBB58]" />
            Pradnyasanskar Enterprises Pvt. Ltd., India
          </p>
          <a href="mailto:care@pradnyasanskar.in" className="flex items-center gap-2.5 transition hover:text-white">
            <Mail size={16} className="shrink-0 text-[#FFBB58]" /> care@pradnyasanskar.in
          </a>
          <a href="tel:+910000000000" className="flex items-center gap-2.5 transition hover:text-white">
            <Phone size={16} className="shrink-0 text-[#FFBB58]" /> +91 00000 00000
          </a>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[.12] pt-6 text-[11px] leading-relaxed text-white/[.48] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Pradnyasanskar Enterprises Pvt. Ltd. All rights reserved.</p>
          <p className="max-w-md">
            Product information is for general education and does not constitute medical advice, diagnosis or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
