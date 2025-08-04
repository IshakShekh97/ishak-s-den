"use client";
import { motion } from "framer-motion";

import { FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FlipLink } from "@/components/animated/TextFlip";
import { FaGithub } from "react-icons/fa";
import { TextRevealChars } from "../animated/text-reveal";
import { MdSocialDistance } from "react-icons/md";

export function SocialLinks() {
  return (
    <section id="social-links" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              className="flex items-center gap-2 mb-5 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <MdSocialDistance className="text-primary size-6" />
              <TextRevealChars
                text="SOCIAL LINKS"
                className="text-lg font-medium tracking-wider uppercase text-primary"
                delay={0.3}
                duration={0.4}
                staggerDelay={0.05}
              />
            </motion.div>
          </div>

          <section className="mx-auto my-12 w-full max-w-7xl">
            <div className="relative mx-auto  w-full">
              <section className="h-full">
                <section className="grid place-content-center gap-6 px-8 py-10 text-black">
                  <div className="group flex items-center justify-center gap-2">
                    <FaLinkedinIn className="group-hover:bg-primary transition-all duration-500 ease-in-out size-10 sm:size-16 md:size-20 rounded-lg p-2 bg-secondary text-foreground" />
                    <FlipLink href="https://www.linkedin.com/in/ishak-shekh/">
                      Linkedin
                    </FlipLink>
                  </div>
                  <div className="group flex items-center justify-center gap-2">
                    <FlipLink href="https://x.com/Ishak_Shekh_">
                      Twitter
                    </FlipLink>
                    <FaXTwitter className="group-hover:bg-primary transition-all duration-500 ease-in-out size-10 sm:size-16 md:size-20 rounded-lg p-2 bg-secondary text-foreground" />
                  </div>
                  <div className="group flex items-center justify-center gap-2">
                    <FaGithub className="group-hover:bg-primary transition-all duration-500 ease-in-out size-10 sm:size-16 md:size-20 rounded-lg p-2 bg-secondary text-foreground" />
                    <FlipLink href="https://github.com/IshakShekh97">
                      Github
                    </FlipLink>
                  </div>
                  <div className="group flex items-center justify-center gap-2 !tracking-widest">
                    <FlipLink href="https://www.instagram.com/ishak_shekh_">
                      Instagram
                    </FlipLink>
                    <FaInstagram className="group-hover:bg-primary transition-all duration-500 ease-in-out size-10 sm:size-16 md:size-20 rounded-lg p-2 bg-secondary text-foreground" />
                  </div>
                </section>
              </section>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
