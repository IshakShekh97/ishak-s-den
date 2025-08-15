"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteProject } from "@/actions/project.action";
import { deleteProjectSchema } from "@/lib/zodSchemas";

interface DeleteProjectFormProps {
  projectId: string;
}

const DeleteProjectForm = ({ projectId }: DeleteProjectFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const validatedData = deleteProjectSchema.parse({ id: projectId });
      const result = await deleteProject(validatedData.id);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        router.push("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Delete project error:", error);
      toast.error("Failed to delete project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="w-full" size={"lg"}>
          <Trash className="size-4" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-xl">
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button
            variant={"destructive"}
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectForm;
