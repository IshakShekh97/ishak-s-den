"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface CreateProjectData {
  title: string;
  role: string;
  client: string;
  overview?: string;
  year: number;
  coverImage: string; // Pinata gateway URL
  techStack: string[];
  features?: { title: string; description: string }[];
  tags: string[];
  isFeatures: boolean;
  order?: number;
  githubLink?: string;
  liveLink?: string;
}

interface UpdateProjectData {
  id: string;
  title: string;
  role: string;
  client: string;
  overview?: string;
  year: number;
  coverImage: string; // Pinata gateway URL
  techStack: string[];
  features?: { title: string; description: string }[];
  tags: string[];
  isFeatures: boolean;
  githubLink?: string;
  liveLink?: string;
}

export async function createProject(data: CreateProjectData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to create a project.",
      };
    }

    let projectOrder = data.order;
    if (projectOrder === undefined || projectOrder === 0) {
      const lastProject = await prisma.project.findFirst({
        where: { userId: session.user.id },
        orderBy: { order: "desc" },
        select: { order: true },
      });
      projectOrder = (lastProject?.order || 0) + 1;
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        role: data.role,
        client: data.client,
        overview: data.overview || null,
        year: data.year,
        coverImage: data.coverImage,
        techStack: JSON.stringify(data.techStack),
        features: data.features ? JSON.stringify(data.features) : null,
        tags: JSON.stringify(data.tags),
        isFeatures: data.isFeatures,
        order: projectOrder,
        githubLink: data.githubLink || null,
        liveLink: data.liveLink || null,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return {
      success: true,
      message: "Project created successfully!",
      projectId: project.id,
    };
  } catch (error) {
    console.error("Create project error:", error);
    return {
      success: false,
      message: "Failed to create project. Please try again.",
    };
  }
}

export async function updateProject(data: UpdateProjectData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to update a project.",
      };
    }

    // Verify the project belongs to the user
    const existingProject = await prisma.project.findFirst({
      where: {
        id: data.id,
        userId: session.user.id,
      },
    });

    if (!existingProject) {
      return {
        success: false,
        message: "Project not found or you don't have permission to update it.",
      };
    }

    const project = await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        role: data.role,
        client: data.client,
        overview: data.overview || null,
        year: data.year,
        coverImage: data.coverImage,
        techStack: JSON.stringify(data.techStack),
        features: data.features ? JSON.stringify(data.features) : null,
        tags: JSON.stringify(data.tags),
        isFeatures: data.isFeatures,
        githubLink: data.githubLink || null,
        liveLink: data.liveLink || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return {
      success: true,
      message: "Project updated successfully!",
      projectId: project.id,
      previousCoverImage: existingProject.coverImage,
    };
  } catch (error) {
    console.error("Update project error:", error);
    return {
      success: false,
      message: "Failed to update project. Please try again.",
    };
  }
}

export async function getProjects() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to view projects.",
        projects: [],
      };
    }

    const projects = await prisma.project.findMany({
      where: { userId: session.user.id },
      orderBy: { order: "asc" },
    });

    return {
      success: true,
      projects,
    };
  } catch (error) {
    console.error("Get projects error:", error);
    return {
      success: false,
      message: "Failed to fetch projects.",
      projects: [],
    };
  }
}

export async function getProjectById(projectId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to view projects.",
        project: null,
      };
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return {
        success: false,
        message: "Project not found or you don't have permission to view it.",
        project: null,
      };
    }

    return {
      success: true,
      project,
    };
  } catch (error) {
    console.error("Get project by ID error:", error);
    return {
      success: false,
      message: "Failed to fetch project.",
      project: null,
    };
  }
}

export async function updateProjectOrder(projectId: string, newOrder: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to update project order.",
      };
    }

    // Verify the project belongs to the user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return {
        success: false,
        message: "Project not found or you don't have permission to update it.",
      };
    }

    // Update the project order
    await prisma.project.update({
      where: { id: projectId },
      data: { order: newOrder },
    });

    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return {
      success: true,
      message: "Project order updated successfully!",
    };
  } catch (error) {
    console.error("Update project order error:", error);
    return {
      success: false,
      message: "Failed to update project order. Please try again.",
    };
  }
}

export async function reorderProjects(
  projectOrders: { id: string; order: number }[]
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to reorder projects.",
      };
    }

    // Use a transaction to update all project orders
    await prisma.$transaction(
      projectOrders.map((item) =>
        prisma.project.updateMany({
          where: {
            id: item.id,
            userId: session.user.id, // Ensure user owns the project
          },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/dashboard");
    revalidatePath("/projects");

    return {
      success: true,
      message: "Projects reordered successfully!",
    };
  } catch (error) {
    console.error("Reorder projects error:", error);
    return {
      success: false,
      message: "Failed to reorder projects. Please try again.",
    };
  }
}

export async function deleteProject(projectId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to Delete a project.",
      };
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/projects");
    return {
      success: true,
      message: "Project deleted successfully.",
    };
  } catch (error) {
    console.error("Delete project error:", error);
    return {
      success: false,
      message: "Failed to delete project.",
    };
  }
}
