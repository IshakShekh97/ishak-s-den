"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageDropZone } from "@/components/ImageDropZone";
import { Plus, X, Github, ExternalLink, ImageIcon, Trash2 } from "lucide-react";
import { createProjectSchema } from "@/lib/zodSchemas";
import { createProject } from "@/actions/project.action";

type FormData = {
  title: string;
  role: string;
  client: string;
  year: number;
  techStack: string[];
  tags: string[];
  overview?: string;
  coverImage: File;
  features?: Array<{ title: string; description: string }>;
  isFeatures?: boolean;
  order?: number;
  githubLink?: string;
  liveLink?: string;
};

const CreateProjectForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techStackInput, setTechStackInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      role: "",
      client: "",
      overview: "",
      year: new Date().getFullYear(),
      techStack: [],
      features: [],
      tags: [],
      isFeatures: false,
      order: 0,
      githubLink: "",
      liveLink: "",
      coverImage: new File([], ""),
    },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const techStack = form.watch("techStack");
  const tags = form.watch("tags");

  const addTechStack = () => {
    if (techStackInput.trim() && !techStack.includes(techStackInput.trim())) {
      form.setValue("techStack", [...techStack, techStackInput.trim()]);
      setTechStackInput("");
    }
  };

  const removeTechStack = (index: number) => {
    form.setValue(
      "techStack",
      techStack.filter((_, i) => i !== index)
    );
  };

  const addTag = () => {
    if (tagsInput.trim() && !tags.includes(tagsInput.trim())) {
      form.setValue("tags", [...tags, tagsInput.trim()]);
      setTagsInput("");
    }
  };

  const removeTag = (index: number) => {
    form.setValue(
      "tags",
      tags.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Ensure isFeatures is always a boolean and order is auto-incremented if 0
      const fixedData = {
        ...data,
        isFeatures: data.isFeatures ?? false,
        order: data.order === 0 ? undefined : data.order, // Let server auto-increment if 0
      };
      const result = await createProject(fixedData);

      if (result.success) {
        toast.success(result.message);
        form.reset();
        setTechStackInput("");
        setTagsInput("");
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Create project error:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-h-[95vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(95vh-120px)] px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 pb-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter project title"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Role</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Full Stack Developer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="client"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter client name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="2024"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="overview"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Overview</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your project..."
                                className="min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Cover Image */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Cover Image *
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="coverImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <ImageDropZone
                                value={field.value}
                                onChange={field.onChange}
                                maxFiles={1}
                                accept="image/*"
                                placeholder="Drop your cover image here or click to browse (Required)"
                                enableCrop={true}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="githubLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Github className="h-4 w-4" />
                              GitHub Repository
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://github.com/username/repo"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="liveLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://your-project.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Tech Stack */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Technology Stack</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add technology (e.g., React, Node.js)"
                          value={techStackInput}
                          onChange={(e) => setTechStackInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTechStack();
                            }
                          }}
                        />
                        <Button type="button" onClick={addTechStack}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-secondary px-2 py-2 justify-center rounded-lg gap-3 "
                          >
                            {tech}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeTechStack(index)}
                            />
                          </div>
                        ))}
                      </div>
                      {form.formState.errors.techStack && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.techStack.message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add tag (e.g., Web App, Mobile)"
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag();
                            }
                          }}
                        />
                        <Button type="button" onClick={addTag}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-secondary px-2 py-2 justify-center rounded-lg gap-3 "
                          >
                            {tag}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => removeTag(index)}
                            />
                          </div>
                        ))}
                      </div>
                      {form.formState.errors.tags && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.tags.message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Project Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="isFeatures"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Featured Project
                              </FormLabel>
                              <FormDescription>
                                Mark this project as featured on your portfolio
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="order"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Order</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Lower numbers appear first
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Features Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Features</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendFeature({ title: "", description: "" })
                    }
                    className="w-fit"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featureFields.map((field, index) => (
                      <Card key={field.id} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Feature {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`features.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Feature Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter feature title"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`features.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Feature Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe this feature"
                                    className="min-h-20"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectForm;
