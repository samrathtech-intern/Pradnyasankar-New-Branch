"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Reveal } from "@/components/Reveal";
import { ingredients } from "@/data";

const ARTICLES = [
  { slug: "understanding-ashwagandha", title: "Understanding Ashwagandha", category: "Ayurveda", readTime: "4 min", excerpt: "A look at Withania somnifera — its traditional use, composition and how it fits into modern wellness routines.", image: "/images/ashwagandha.webp", imgType: "lifestyle", imgPosition: "center 30%" },
  { slug: "ayurveda-vs-nutraceuticals", title: "Ayurveda vs Nutraceuticals — What's the difference?", category: "Education", readTime: "5 min", excerpt: "How Ayurvedic products and nutraceuticals differ in classification, regulation and intended use.", image: "/images/range-ayurveda.webp", imgType: "lifestyle", imgPosition: "center top" },
  { slug: "reading-a-supplement-label", title: "How to read a supplement label", category: "Nutraceuticals", readTime: "3 min", excerpt: "A practical guide to understanding composition, directions, warnings and declarations on product labels.", image: "/images/multivitamin.webp", imgType: "lifestyle", imgPosition: "center 35%" },
  { slug: "daily-wellness-routines", title: "Building a daily wellness routine", category: "Wellness", readTime: "5 min", excerpt: "Simple, practical approaches to incorporating Ayurvedic and nutraceutical formats into everyday life.", image: "/images/daily-wellness.webp", imgType: "lifestyle", imgPosition: "center 15%" },
  { slug: "turmeric-curcumin-guide", title: "Turmeric and curcumin — an ingredient guide", category: "Ayurveda", readTime: "4 min", excerpt: "What curcuminoids are, how turmeric is used in traditional and modern formats, and what to look for on a label.", image: "/images/turmeric.webp", imgType: "lifestyle", imgPosition: "center 40%" },
  { slug: "gut-health-basics", title: "Gut health basics", category: "Nutraceuticals", readTime: "4 min", excerpt: "An introduction to digestive wellness, probiotics and the role of nutrition in supporting gut health.", image: "/images/probiotic-gut-balance.webp", imgType: "lifestyle", imgPosition: "center 30%" },
];

const CATEGORIES = ["All", "Ayurveda", "Nutraceuticals", "Education", "Wellness"];

type Article = (typeof ARTICLES)[number];

function ArticleCard({ article }: { article: Article }) {
  const isProduct = article.imgType === "product";
  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#E9E3EE] bg-white transition duration-300 hover:-translate-y-1.5 hover:border-[#CDBAF1] hover:shadow-[0_20px_50px_rgba(46,5,105,.10)]"
    >
      {/* Image container — fixed height for card alignment */}
      <div className={`relative h-52 w-full overflow-hidden rounded-t-[28px] ${
        isProduct ? "bg-gradient-to-br from-[#F4EEFF] to-[#FAF6FF]" : ""
      }`}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={!isProduct ? { objectPosition: article.imgPosition ?? "center top" } : undefined}
          className={`transition duration-500 group-hover:scale-[1.04] ${
            isProduct ? "object-contain object-center p-5" : "object-cover"
          }`}
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#8C52FF] backdrop-blur-sm">
          {article.category}
        </span>
      </div>

      {/* Card body — flex column so CTA pins to bottom */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#8B8292]">
          {article.readTime} read
        </p>
        <h2 className="mt-2 text-[17px] font-extrabold leading-tight tracking-[-.03em] text-[#2E0569] transition group-hover:text-[#8C52FF]">
          {article.title}
        </h2>
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-[#716A78]">
          {article.excerpt}
        </p>
        {/* CTA always pinned to bottom */}
        <div className="mt-auto flex items-center gap-2 border-t border-[#F0EAF4] pt-4 text-[11px] font-extrabold uppercase tracking-[.1em] text-[#8C52FF]">
          Read article
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#FFFDF7]">
        {/* Hero */}
        <section className="border-b border-[#E9E3EE] bg-gradient-to-br from-[#F4EEFF] via-[#FFFDF7] to-[#FFF8EE] py-16 sm:py-20">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow"><BookOpen size={13} /> Knowledge hub</span>
              <h1 className="section-heading mt-5 max-w-3xl">Understand wellness before you choose.</h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.85] text-[#716A78]">
                Ingredient education, product guides and responsible wellness information — written with clarity and approved by Pradnyasanskar.
              </p>
              <p className="mt-3 text-[12px] leading-relaxed text-[#8B8292]">
                Content on this hub is for general education only and does not constitute medical advice, diagnosis or personalised treatment recommendations.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Articles */}
        <section className="container-page py-14">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 xl:-mx-24 xl:px-24">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 min-h-[38px] inline-flex items-center rounded-full px-5 text-[11px] font-extrabold uppercase tracking-[.1em] transition ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#2E0569] to-[#8C52FF] text-white shadow-[0_6px_20px_rgba(140,82,255,.28)]"
                    : "border border-[#E9E3EE] bg-white text-[#2E0569] hover:border-[#8C52FF] hover:text-[#8C52FF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article, i) => (
                <Reveal key={article.slug} delay={i * 0.05}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[28px] border border-dashed border-[#CDBAF1] bg-[#F2EBFF] px-8 py-14 text-center">
              <p className="text-[20px] font-extrabold text-[#2E0569]">No articles in this category yet.</p>
              <p className="mt-2 text-[13px] text-[#716A78]">Check back soon or explore all articles.</p>
              <button onClick={() => setActiveCategory("All")} className="btn-primary mt-5">View all articles</button>
            </div>
          )}
        </section>

        {/* Ingredients section */}
        <section className="bg-gradient-to-br from-[#F4EEFF] to-[#FFFDF7] py-16">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">Ingredient library</span>
              <h2 className="section-heading mt-5 max-w-2xl">Know what's in your products.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#716A78]">A visual guide to key botanicals and nutritional ingredients used across the Pradnyasanskar range.</p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ingredients.slice(0, 8).map((ing, i) => (
                <Reveal key={ing.name} delay={i * 0.04}>
                  <div className="rounded-[22px] border border-[#E9E3EE] bg-white p-5">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#F2EBFF]">
                      <Image src={ing.image} alt={ing.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <h3 className="mt-4 text-[15px] font-extrabold text-[#2E0569]">{ing.name}</h3>
                    <p className="mt-0.5 text-[11px] italic text-[#8B8292]">{ing.technical}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#716A78]">{ing.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
