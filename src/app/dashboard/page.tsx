import CreateProjectForm from "@/components/form/CreateProjectForm";
import ProjectOrderManager from "@/components/ProjectOrderManager";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Star,
  ExternalLink,
  Github,
  Calendar,
  User,
  Building,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  role: string;
  client: string;
  overview: string | null;
  year: number;
  coverImage: Uint8Array | null;
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
  const techStack = JSON.parse(project.techStack || "[]");
  const tags = JSON.parse(project.tags || "[]");

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              {project.isFeatures && (
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {project.role}
              </div>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {project.client}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.year}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="ml-2">
            #{project.order}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {project.overview && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {project.overview}
          </p>
        )}

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {techStack.map((tech: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Live Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
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
    <div className="container mx-auto p-6 space-y-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">
                  Total design screenshots
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.data.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="order" className="space-y-6">
          <ProjectOrderManager projects={projects.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
