"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const galleryFileNames = [
  "0I6A5573.jpg",
  "02.jpg",
  "B48A5887.jpg",
  "BDX01850.jpg",
  "BSD_2806.jpg",
  "BSD_3066.jpg",
  "BSD_3564.jpg",
  "DSC_4442.jpg",
  "DSC00296.jpg",
  "DSC01913.jpg",
  "DSC01981.jpg",
  "DSC02033.jpg",
  "DTP07847.jpg",
  "DTP08169.jpg",
  "DYN05572.jpg",
  "DYN07025.JPG",
  "HF_02001.jpg",
  "HF_02062.jpg",
  "HF_02086.jpg",
  "HF_02105.jpg",
  "HF_02137.jpg",
  "IMG_3188.jpg",

  "Jothy & Sajees wedding ceremony in Hill Country.I first met this couple for a pre-wedding phot.heic (11).jpg",
  "Jothy & Sajees wedding ceremony in Hill Country.I first met this couple for a pre-wedding phot.heic (12).jpg",
  "Jothy & Sajees wedding ceremony in Hill Country.I first met this couple for a pre-wedding phot.heic (13).jpg",
  "Jothy & Sajees wedding ceremony in Hill Country.I first met this couple for a pre-wedding phot.heic (15).jpg",
  "Jothy & Sajees wedding ceremony in Hill Country.I first met this couple for a pre-wedding phot.heic (17).jpg",

  "PRU08506.jpg",
  "PRU08653.jpg",
  "PRU09138.jpg",
  "PRU09223.jpg",
  "PRU09232.jpg",
  "PRU09419.jpg",
  "SEN_1390.jpg",
  "SK2_7288.jpg",
  "SK2_7298.jpg",
  "SK2_8253.jpg",
  "SK2_8588.jpg",
  "SM_00276.JPG",
  "SM_00295.JPG",
  "SM_00968.JPG",
  "SM_00991.JPG",
  "SM_00993.JPG",
  "SM_01005.JPG",
  "SM_01048.JPG",
  "SMP07343.JPG",
  "SMP07761.JPG",
  "THU02563.jpg",
  "THU02639.JPG",
  "THU03296.JPG",
  "THU03524.JPG",
] as const;

const galleryImages = galleryFileNames.map((fileName, index) => ({
  src: encodeURI(`/${fileName}`),
  alt: `MilanoFloral wedding and event photograph ${index + 1}`,
}));

export default function PortfolioPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? galleryImages.length - 1
        : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === galleryImages.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  });

  useEffect(() => {
    document.body.style.overflow =
      selectedIndex !== null ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      <main>
        {/* Portfolio heading */}
        <section className="px-6 pb-14 pt-36 text-center sm:px-10 sm:pb-20 sm:pt-44">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            Our portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display mx-auto mt-6 max-w-4xl text-balance text-5xl leading-[1] sm:text-6xl lg:text-7xl"
          >
            Beautiful celebrations,
            <em className="block text-[var(--brand)]">
              thoughtfully created.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-7 max-w-2xl leading-8 text-[var(--muted-foreground)]"
          >
            Explore a selection of weddings, floral installations and
            unforgettable celebrations designed by MilanoFloral.
          </motion.p>
        </section>

        {/* Gallery */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px] columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryImages.map((image, index) => (
              <motion.button
                key={`${image.src}-${index}`}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: (index % 4) * 0.07,
                }}
                onClick={() => setSelectedIndex(index)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] bg-[#eee6e1] text-left"
                aria-label={`Open ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1000}
                  height={1300}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-auto w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 pb-6 pt-20 transition duration-500 group-hover:translate-y-0">
                  <p className="text-sm font-medium text-white">
                    View photograph
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </main>

      {/* Full-screen image lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio image viewer"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-5 top-5 z-20 grid size-11 place-items-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-white hover:text-black"
              aria-label="Close image"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-white hover:text-black sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            <motion.div
              key={galleryImages[selectedIndex].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[85vh] w-full max-w-6xl"
            >
              <Image
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 text-white transition hover:bg-white hover:text-black sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.18em] text-white/60">
              {selectedIndex + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}