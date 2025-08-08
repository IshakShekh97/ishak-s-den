"use client";

import * as React from "react";
import { useCallback, useState } from "react";
import Image from "next/image";
import { Upload, X, Crop, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cropper from "react-easy-crop";

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error: Event) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getRadianAngle = (degreeValue: number): number => {
  return (degreeValue * Math.PI) / 180;
};

const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("Could not get cropped canvas context");
  }

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "cropped-image.jpg", {
          type: "image/jpeg",
          lastModified: Date.now(),
        });
        resolve(file);
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, "image/jpeg");
  });
};

interface ImageDropZoneProps {
  value?: File | File[] | string | string[];
  onChange?: (files: File | File[] | null) => void;
  onBlur?: () => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  error?: boolean;
  name?: string;
  enableCrop?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const isValidFileType = (file: File, accept?: string): boolean => {
  if (!accept) return true;

  const acceptedTypes = accept.split(",").map((type) => type.trim());

  return acceptedTypes.some((type) => {
    if (type.startsWith(".")) {
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    }
    if (type.includes("*")) {
      const baseType = type.split("/")[0];
      return file.type.startsWith(baseType);
    }
    return file.type === type;
  });
};

const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

const cleanupPreview = (url: string): void => {
  try {
    URL.revokeObjectURL(url);
  } catch (error) {
    // Silently ignore errors when revoking URLs that may already be revoked
    console.warn("Failed to revoke object URL:", error);
  }
};

const ImageDropZone = React.forwardRef<HTMLDivElement, ImageDropZoneProps>(
  (
    {
      value,
      onChange,
      onBlur,
      multiple = false,
      maxFiles = multiple ? 5 : 1,
      maxSize = 5 * 1024 * 1024, // 5MB default
      accept = "image/*",
      disabled = false,
      className,
      placeholder,
      error = false,
      name,
      enableCrop = false,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [previews, setPreviews] = React.useState<
      { file: File; url: string }[]
    >([]);
    const [cropDialogOpen, setCropDialogOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<{
      url: string;
      index: number;
    } | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [cropSize, setCropSize] = useState({ width: 320, height: 180 });
    const [croppedAreaPixels, setCroppedAreaPixels] =
      useState<PixelCrop | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Convert value to files array for consistent handling
    const files = React.useMemo(() => {
      if (!value) return [];
      if (typeof value === "string") return [];
      if (Array.isArray(value)) {
        return value.filter((file): file is File => file instanceof File);
      }
      return value instanceof File ? [value] : [];
    }, [value]);

    // Update previews when files change
    React.useEffect(() => {
      // Create new previews
      const newPreviews = files.map((file) => ({
        file,
        url: getFilePreview(file),
      }));

      setPreviews((prevPreviews) => {
        // Cleanup old previews that are no longer needed
        prevPreviews.forEach((preview) => {
          if (
            !newPreviews.some((newPreview) => newPreview.file === preview.file)
          ) {
            try {
              cleanupPreview(preview.url);
            } catch (error) {
              console.warn("Error cleaning up preview URL:", error);
            }
          }
        });
        return newPreviews;
      });

      return () => {
        // Cleanup all previews on unmount
        newPreviews.forEach((preview) => {
          try {
            cleanupPreview(preview.url);
          } catch (error) {
            console.warn("Error cleaning up preview URL on unmount:", error);
          }
        });
      };
    }, [files]); // previews is managed by this effect, so it's safe to exclude

    const handleFiles = useCallback(
      (newFiles: FileList | File[]) => {
        const fileArray = Array.from(newFiles);
        const validFiles: File[] = [];

        for (const file of fileArray) {
          // Validate file type
          if (!isValidFileType(file, accept)) {
            console.warn(`File ${file.name} is not a valid type`);
            continue;
          }

          // Validate file size
          if (file.size > maxSize) {
            console.warn(
              `File ${file.name} is too large (${formatFileSize(file.size)})`
            );
            continue;
          }

          validFiles.push(file);
        }

        if (validFiles.length === 0) return;

        let finalFiles: File[];

        if (multiple) {
          const existingFiles = files;
          const combined = [...existingFiles, ...validFiles];
          finalFiles = combined.slice(0, maxFiles);
        } else {
          finalFiles = [validFiles[0]];
        }

        onChange?.(multiple ? finalFiles : finalFiles[0] || null);
      },
      [files, multiple, maxFiles, maxSize, accept, onChange]
    );

    const removeFile = useCallback(
      (index: number) => {
        // Cleanup the preview URL for the file being removed
        if (previews[index]) {
          cleanupPreview(previews[index].url);
        }

        const newFiles = files.filter((_, i) => i !== index);
        onChange?.(multiple ? newFiles : null);
      },
      [files, multiple, onChange, previews]
    );

    const handleCropImage = useCallback(
      (index: number) => {
        if (enableCrop && previews[index]) {
          setImageToCrop({
            url: previews[index].url,
            index,
          });
          setCrop({ x: 0, y: 0 });
          setZoom(1);
          setRotation(0);
          setCropSize({ width: 320, height: 180 });
          setCroppedAreaPixels(null);
          setCropDialogOpen(true);
        }
      },
      [enableCrop, previews]
    );

    const onCropCompleteHandler = useCallback(
      (croppedArea: Area, croppedAreaPixels: PixelCrop) => {
        setCroppedAreaPixels(croppedAreaPixels);
      },
      []
    );

    const showCroppedImage = useCallback(async () => {
      if (!croppedAreaPixels || !imageToCrop) return;

      setIsProcessing(true);
      try {
        const croppedImage = await getCroppedImg(
          imageToCrop.url,
          croppedAreaPixels,
          rotation
        );

        const newFiles = [...files];
        newFiles[imageToCrop.index] = croppedImage;
        onChange?.(multiple ? newFiles : newFiles[0] || null);

        setCropDialogOpen(false);
        setImageToCrop(null);
      } catch (e) {
        console.error(e);
      } finally {
        setIsProcessing(false);
      }
    }, [croppedAreaPixels, imageToCrop, rotation, files, multiple, onChange]);

    const resetCrop = useCallback(() => {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setCropSize({ width: 320, height: 180 });
    }, []);

    const handleZoomIn = useCallback(() => {
      setZoom((prev) => Math.min(prev + 0.1, 5));
    }, []);

    const handleZoomOut = useCallback(() => {
      setZoom((prev) => Math.max(prev - 0.1, 0.5));
    }, []);

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (disabled) return;

        const droppedFiles = e.dataTransfer.files;
        handleFiles(droppedFiles);
      },
      [disabled, handleFiles]
    );

    const handleFileInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
          handleFiles(selectedFiles);
        }
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      [handleFiles]
    );

    const openFileDialog = useCallback(() => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    }, [disabled]);

    const hasFiles = files.length > 0;
    const canAddMore = multiple && files.length < maxFiles;

    return (
      <div className={cn("w-full", className)} {...props} ref={ref}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          onBlur={onBlur}
          disabled={disabled}
          name={name}
          className="sr-only"
          aria-describedby={`${name}-description`}
        />

        {!hasFiles ? (
          <Card
            className={cn(
              "relative cursor-pointer border-2 border-dashed transition-colors",
              "hover:border-primary/50 hover:bg-muted/50",
              isDragOver && "border-primary bg-primary/5",
              error && "border-destructive",
              disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={openFileDialog}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center">
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-muted-foreground mb-3 sm:mb-4" />
              <div className="space-y-1 sm:space-y-2">
                <p className="text-base sm:text-lg font-medium">
                  {placeholder ||
                    (multiple
                      ? "Drop images here or click to upload"
                      : "Drop an image here or click to upload")}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground px-2">
                  {accept === "image/*" ? "Images only" : `Accepted: ${accept}`}
                  {maxSize && ` • Max siz   e: ${formatFileSize(maxSize)}`}
                  {multiple && ` • Max files: ${maxFiles}`}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {multiple ? (
              // Multiple images grid layout
              <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {previews.map((preview, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <div className="aspect-video relative">
                      <Image
                        src={preview.url}
                        alt={preview.file.name}
                        fill
                        className="object-cover"
                        unoptimized // blob URLs don't need optimization
                      />
                    </div>
                    <div className="p-2 sm:p-3">
                      <p className="text-xs sm:text-sm font-medium truncate mb-1">
                        {preview.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatFileSize(preview.file.size)}
                      </p>
                      <div className="flex gap-1 sm:gap-2">
                        {enableCrop && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleCropImage(index)}
                            disabled={disabled}
                            className="flex-1 h-7 sm:h-8 text-xs"
                          >
                            <Crop className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            Crop
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFile(index)}
                          disabled={disabled}
                          className="flex-1 h-7 sm:h-8 text-xs"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              // Single image layout
              previews.length > 0 && (
                <Card className="relative overflow-hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                  <div className="aspect-video relative">
                    <Image
                      src={previews[0].url}
                      alt={previews[0].file.name}
                      fill
                      className="object-cover"
                      unoptimized // blob URLs don't need optimization
                    />
                  </div>
                  <div className="p-2 sm:p-3">
                    <p className="text-xs sm:text-sm font-medium truncate mb-1">
                      {previews[0].file.name}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {formatFileSize(previews[0].file.size)}
                    </p>
                    <div className="flex gap-2">
                      {enableCrop && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleCropImage(0)}
                          disabled={disabled}
                          className="flex-1 h-8 sm:h-9"
                        >
                          <Crop className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          Crop Image
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile(0)}
                        disabled={disabled}
                        className="flex-1 h-8 sm:h-9"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            )}

            {canAddMore && (
              <Card
                className={cn(
                  "cursor-pointer border-2 border-dashed transition-colors",
                  "hover:border-primary/50 hover:bg-muted/50",
                  isDragOver && "border-primary bg-primary/5",
                  disabled && "cursor-not-allowed opacity-50"
                )}
                onClick={openFileDialog}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex items-center justify-center p-3 sm:p-4 md:p-6">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      Add more files ({files.length}/{maxFiles})
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        <div id={`${name}-description`} className="sr-only">
          {`File upload area. ${
            multiple ? `Maximum ${maxFiles} files` : "Single file"
          }. Maximum size ${formatFileSize(
            maxSize
          )}. Accepted types: ${accept}`}
        </div>

        {/* Image Crop Dialog */}
        {enableCrop && imageToCrop && (
          <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-[90vh] sm:h-[85vh] md:h-[80vh] p-3 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">
                  Crop Image (16:9)
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base">
                  Drag to reposition, use mouse wheel or controls to zoom, and
                  adjust rotation. The crop area maintains a 16:9 aspect ratio
                  and can be resized by zooming.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 flex-1">
                {/* Cropper Container */}
                <div className="relative flex-1 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] bg-black rounded-lg overflow-hidden">
                  <Cropper
                    image={imageToCrop.url}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={16 / 9} // 16:9 aspect ratio
                    cropShape="rect"
                    onCropChange={setCrop}
                    onCropComplete={onCropCompleteHandler}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    showGrid={true}
                    zoomWithScroll={true}
                    restrictPosition={false}
                    cropSize={cropSize} // Use dynamic crop size
                    minZoom={0.5}
                    maxZoom={5}
                    objectFit="contain"
                    style={{
                      containerStyle: {
                        backgroundColor: "#000",
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      },
                      mediaStyle: {
                        objectFit: "contain",
                      },
                      cropAreaStyle: {
                        border: "2px solid #fff",
                        borderRadius: "4px",
                        boxShadow: "0 0 0 9999em rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  />
                </div>

                {/* Controls */}
                <div className="space-y-2 sm:space-y-3 md:space-y-4 max-h-[40vh] sm:max-h-none overflow-y-auto">
                  {/* Crop Size Controls */}
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <label className="text-xs sm:text-sm font-medium">
                        Crop Size: {cropSize.width}×{cropSize.height}px (16:9)
                      </label>
                      <div className="flex gap-1 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCropSize({ width: 320, height: 180 })
                          }
                          className="text-xs px-1 sm:px-2 py-1 h-5 sm:h-6"
                        >
                          Small
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCropSize({ width: 480, height: 270 })
                          }
                          className="text-xs px-1 sm:px-2 py-1 h-5 sm:h-6"
                        >
                          Medium
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCropSize({ width: 640, height: 360 })
                          }
                          className="text-xs px-1 sm:px-2 py-1 h-5 sm:h-6"
                        >
                          Large
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={160}
                        max={640}
                        step={16}
                        value={cropSize.width}
                        onChange={(e) => {
                          const width = Number(e.target.value);
                          const height = Math.round(width / (16 / 9));
                          setCropSize({ width, height });
                        }}
                        className="w-full h-1 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4 sm:hidden">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomOut}
                        disabled={zoom <= 0.5}
                        className="h-6 w-6 p-0"
                      >
                        <ZoomOut className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleZoomIn}
                        disabled={zoom >= 5}
                        className="h-6 w-6 p-0"
                      >
                        <ZoomIn className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomOut}
                      disabled={zoom <= 0.5}
                      className="hidden sm:flex"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                      <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">
                        Zoom: {zoom.toFixed(1)}x
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min={0.5}
                          max={5}
                          step={0.1}
                          value={zoom}
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="w-full h-1 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleZoomIn}
                      disabled={zoom >= 5}
                      className="hidden sm:flex"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Rotation Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:hidden">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotation(0)}
                        disabled={rotation === 0}
                        className="h-6 w-6 p-0"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRotation(0)}
                      disabled={rotation === 0}
                      className="hidden sm:flex"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>

                    <div className="flex-1">
                      <label className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">
                        Rotation: {rotation}°
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min={-180}
                          max={180}
                          step={1}
                          value={rotation}
                          onChange={(e) => setRotation(Number(e.target.value))}
                          className="w-full h-1 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <div className="flex gap-2 sm:gap-0 sm:space-x-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={resetCrop}
                    className="flex-1 sm:flex-none text-sm"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => setCropDialogOpen(false)}
                    variant="outline"
                    className="flex-1 sm:flex-none text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={showCroppedImage}
                    disabled={!croppedAreaPixels || isProcessing}
                    className="flex-1 sm:flex-none text-sm"
                  >
                    {isProcessing ? "Processing..." : "Apply Crop"}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  }
);

ImageDropZone.displayName = "ImageDropZone";

export { ImageDropZone };
export type { ImageDropZoneProps };
