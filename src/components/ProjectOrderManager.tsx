"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Star } from "lucide-react";
import { reorderProjects } from "@/actions/project.action";

interface Project {
  id: string;
  title: string;
  role: string;
  client: string;
  year: number;
  order: number;
  isFeatures: boolean;
  tags: string;
  techStack: string;
}

interface ProjectOrderManagerProps {
  projects: Project[];
  onOrderChange?: () => void;
}

const ProjectOrderManager = ({
  projects,
  onOrderChange,
}: ProjectOrderManagerProps) => {
  const [orderedProjects, setOrderedProjects] = useState(
    [...projects].sort((a, b) => a.order - b.order)
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(orderedProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setOrderedProjects(updatedItems);

    // Save the new order to the database
    setIsSaving(true);
    try {
      const orderUpdates = updatedItems.map((item, index) => ({
        id: item.id,
        order: index + 1,
      }));

      const result = await reorderProjects(orderUpdates);

      if (result.success) {
        toast.success("Project order updated successfully!");
        onOrderChange?.();
      } else {
        toast.error(result.message);
        // Revert the order if save failed
        setOrderedProjects([...projects].sort((a, b) => a.order - b.order));
      }
    } catch (error) {
      console.error("Error updating project order:", error);
      toast.error("Failed to update project order");
      // Revert the order if save failed
      setOrderedProjects([...projects].sort((a, b) => a.order - b.order));
    } finally {
      setIsSaving(false);
    }
  };

  const parseJsonArray = (jsonString: string): string[] => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project Order Management</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop to reorder projects
        </p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {orderedProjects.map((project, index) => (
                <Draggable
                  key={project.id}
                  draggableId={project.id}
                  index={index}
                  isDragDisabled={isSaving}
                >
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-all ${
                        snapshot.isDragging ? "shadow-lg scale-105" : ""
                      } ${isSaving ? "opacity-50" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            {...provided.dragHandleProps}
                            className="flex-shrink-0 cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>

                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold truncate">
                                {project.title}
                              </h4>
                              {project.isFeatures && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {project.role} for {project.client} •{" "}
                              {project.year}
                            </p>
                          </div>

                          <div className="flex-shrink-0 flex flex-col items-end gap-2">
                            <div className="flex flex-wrap gap-1 justify-end max-w-48">
                              {parseJsonArray(project.techStack)
                                .slice(0, 3)
                                .map((tech, techIndex) => (
                                  <Badge
                                    key={techIndex}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              {parseJsonArray(project.techStack).length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +
                                  {parseJsonArray(project.techStack).length - 3}
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 justify-end max-w-48">
                              {parseJsonArray(project.tags)
                                .slice(0, 2)
                                .map((tag, tagIndex) => (
                                  <Badge
                                    key={tagIndex}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              {parseJsonArray(project.tags).length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{parseJsonArray(project.tags).length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isSaving && (
        <div className="text-center text-sm text-muted-foreground">
          Saving project order...
        </div>
      )}
    </div>
  );
};

export default ProjectOrderManager;
