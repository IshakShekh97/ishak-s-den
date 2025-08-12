import MagneticButton from "@/components/animated/magnetic-button";
import TextReveal, { TextRevealChars } from "@/components/animated/text-reveal";
import { ImageLoader } from "@/components/image-loader";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const fetchProject = async (id: string) => {
  try {
    const response = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (response) {
      return response;
    }
    return null;
  } catch {
    return null;
  }
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const project = await fetchProject((await params).id);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-5">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Project Not Found
          </h1>
          <p className="text-gray-600">
            The project {"you're"} looking for {"doesn't"} exist.
          </p>
          <Button asChild className="gap-3">
            <Link href={"/projects"}>
              <ArrowLeft className="size-5" />
              Go Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section id="projects" className="relative py-20 ">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link href={"/projects"}>
              <MagneticButton size={"lg"} variant={"outline"}>
                <ArrowLeft className="size-5" /> Back to Projects
              </MagneticButton>
            </Link>

            <MagneticButton size={"sm"} variant={"secondary"}>
              {project.year}
            </MagneticButton>
          </div>

          <div className="w-full p-2 bg-secondary rounded-3xl my-5 border border-primary/20">
            <ImageLoader
              alt={project.title}
              src={project.coverImage as string}
              className="!w-full aspect-video !h-full rounded-2xl "
            />
          </div>

          <div className="flex items-center flex-row gap-2 mb-5 justify-center md:justify-between flex-wrap my-5 mt-10">
            <TextRevealChars
              text={project.title}
              className="text-4xl sm:text-5xl xl:text-6xl font-black text-primary"
              delay={0.5}
              duration={0.4}
              staggerDelay={0.05}
            />
            <Link href={project.liveLink as string} target="_blank">
              <MagneticButton
                size={"icon"}
                className="md:hidden"
                variant={"secondary"}
              >
                <ArrowUpRight className="size-5" />
              </MagneticButton>
              <MagneticButton
                size={"lg"}
                variant={"secondary"}
                className="max-md:hidden"
              >
                Check It Out <ArrowUpRight className="size-5" />
              </MagneticButton>
            </Link>
          </div>

          <div>
            <TextReveal
              text={project.overview as string}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-full"
              delay={0.6}
              duration={0.8}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
