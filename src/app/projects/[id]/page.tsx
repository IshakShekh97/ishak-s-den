import prisma from "@/lib/prisma";

const getProject = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

const IndividualProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const project = await getProject((await params).id);
  console.log(project);
  return <div className=""></div>;
};

export default IndividualProjectPage;
