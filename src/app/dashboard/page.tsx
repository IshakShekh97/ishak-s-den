import CreateProjectForm from "@/components/form/CreateProjectForm";
import EditProjectForm from "@/components/form/EditProjectForm";
import ProjectOrderManager from "@/components/ProjectOrderManager";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Edit } from "lucide-react";
import DeleteProjectForm from "@/components/form/DeleteProjectForm";
import { ImageLoader } from "@/components/image-loader";
import Link from "next/link";
import MagneticButton from "@/components/animated/magnetic-button";

type Project = {
  id: string;
  title: string;
  role: string;
  client: string;
  overview: string | null;
  year: number;
  coverImage: string;
  techStack: string;
  features: string | null;
  tags: string;
  isFeatures: boolean;
  order: number;
  githubLink: string | null;
  liveLink: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

async function getProjects(userId: string) {
  try {
    const response = await prisma.project.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        order: "asc",
      },
    });

    if (response) {
      return {
        success: true,
        data: response,
        message: "Projects fetched successfully",
      };
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch projects",
    };
  }
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group cursor-pointer">
      <div className="block pb-5 group">
        <div className="rounded-2xl overflow-hidden relative aspect-video transition-all duration-500 group-hover:scale-[1.02]">
          <ImageLoader
            src={project.coverImage ? project.coverImage : "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full rounded-2xl group-hover:blur-sm transition-all duration-500 ease-in-out"
            objectFit="cover"
            width="100%"
            height="100%"
          />
          <Link
            href={`/projects/${project.id}`}
            className="hidden absolute inset-0 bg-black/30 group-hover:flex transition-all duration-500 ease-in-out items-center justify-center"
          >
            <MagneticButton className="group-hover:scale-105 transition-transform duration-500 ease-in-out">
              View Project
            </MagneticButton>
          </Link>
        </div>
      </div>

      <div className="px-2">
        <div className="block">
          <div className="flex items-end justify-between mb-1">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {project.client}
              </p>
            </div>
            <span className="text-muted-foreground text-xs font-medium">
              {project.year}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div>
          {project.isFeatures && (
            <Badge
              variant="outline"
              className="bg-muted text-muted-foreground text-xs font-medium py-1 px-2 rounded-md"
            >
              Featured
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <MagneticButton size="icon" variant={"secondary"}>
            # {project.order}
          </MagneticButton>
        </div>
      </div>

      {/* Admin controls */}
      <div className="flex items-center justify-center flex-col gap-2 w-full mt-4 pt-4 border-t">
        <EditProjectForm
          projectId={project.id}
          trigger={
            <Button variant="secondary" size="lg" className="w-full">
              <Edit className="h-4 w-4" /> Edit
            </Button>
          }
        />
        <DeleteProjectForm projectId={project.id} />
      </div>
    </div>
  );
};

const DashboardPage = async () => {
  const session = await getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const projects = await getProjects(session.user.id);
  if (!projects || !projects.success || !projects.data) {
    console.error(projects?.message);
    return (
      <div className="container mx-auto my-40 flex items-center justify-center bg-secondary min-h-52 rounded-lg">
        Error loading projects
      </div>
    );
  }

  if (projects.data.length === 0) {
    return (
      <Suspense
        fallback={
          <div className="container mx-auto my-40 flex flex-col gap-5 items-center justify-center min-h-52 rounded-lg">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-10 w-1/3" />
          </div>
        }
      >
        <div className="container mx-auto my-40 flex flex-col gap-5 items-center justify-center bg-secondary min-h-52 rounded-lg text-center px-2">
          No projects found. Start by creating a new project.
          <CreateProjectForm />
        </div>
      </Suspense>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your projects and portfolio
          </p>
        </div>
        <CreateProjectForm />
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects">All Projects</TabsTrigger>
          <TabsTrigger value="order">Manage Order</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{projects.data.length}</div>
                <p className="text-sm text-muted-foreground">
                  Projects in your portfolio
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {projects.data.filter((p: Project) => p.isFeatures).length}
                </div>
                <p className="text-sm text-muted-foreground">
                  Projects marked as featured
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">All Projects</h2>
            <Suspense fallback={<ProjectCardSkeleton />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.data.map((project: Project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="order" className="space-y-6">
          <Suspense fallback={<ProjectOrderManagerSkeleton />}>
            <ProjectOrderManager projects={projects.data} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

function ProjectCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="h-full">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProjectOrderManagerSkeleton() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Manage Project Order</h2>
      <p className="text-muted-foreground mb-4">
        Drag and drop to reorder your projects. Changes will be saved
        automatically.
      </p>
      <Skeleton className="h-6 w-1/2 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full mb-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
