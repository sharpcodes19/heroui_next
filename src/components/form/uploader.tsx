"use client"

import convertSize from "convert-size"
import { BaseFormArrayControllerProps, FormArrayController } from "./controller"
import { ArrayPath, FieldValues } from "react-hook-form"
import { DropzoneOptions, FileError, useDropzone } from "react-dropzone"
import { cn, SlotsToClasses } from "@heroui/theme"
import { ThemedButton } from "./button"
import { CloudUploadIcon, FileIcon, ImageIcon, XIcon } from "lucide-react"
import { ScrollShadow } from "@heroui/scroll-shadow"
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox"
import { createElement } from "react"
import { toBase64Async } from "~/utils/image"
import { UploadItem } from "~/schemas/misc"

// prettier-ignore
export type ThemedUploadDropzoneProps = Pick<DropzoneOptions, "accept" | "maxSize" | "maxFiles" | "minSize" | "multiple" | "disabled"> & {
  classNames?: SlotsToClasses<"base" | "label">
  images: Array<UploadItem>
  onValueChange: (images: Array<UploadItem>) => void
  onRemoveItem?: (image: UploadItem) => void
  label?: String
}

export const ACCEPT_IMAGES = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
}

export const getIcon = (mime: string) => {
  if (mime?.startsWith("image")) return ImageIcon
  return FileIcon
}

// prettier-ignore
export type ThemedUploadDropzoneFormControllerProps<T extends FieldValues, K extends ArrayPath<T>> = BaseFormArrayControllerProps<Omit<ThemedUploadDropzoneProps, "images" | "onValueChange" | "onRemoveItem">, T, K>

// prettier-ignore
export const ThemedUploadDropzone = ({ classNames, accept, maxSize, images, onValueChange, onRemoveItem, label, ...props }: ThemedUploadDropzoneProps) => {
  const fileSize = maxSize || "5 MB"

  const { isDragActive, getInputProps, isDragReject, getRootProps, open } = useDropzone({
    noClick: true,
    maxSize: convertSize(fileSize, "B"),
    accept,
    validator: (file) => {
      const index = images.findIndex(({ name }) => name == file.name)
      if(index > -1)
        return {
          code: "duplicate",
          message: "This file is a already in the list.",
        } satisfies FileError

      return null
    },
    onDrop: async (acceptedFiles) => {
      const images: Array<UploadItem> = []
      for (const file of acceptedFiles) {
        const base64 = await toBase64Async(file)
        images.push({ base64, mime: file.type, name: file.name } satisfies UploadItem)
      }
      onValueChange(images)
    },
    ...props
  })

  return <div className={cn("flex flex-wrap gap-2", classNames?.base)}>
    <label className={cn("w-full px-2 text-xs text-default-500", label ? "" : "hidden", classNames?.label)}>{label}</label>
    <div className="space-y-2 flex-grow sm:flex-[0.75]">
      <div 
        {
          ...getRootProps({
            className: cn(
              "flex flex-col h-64 p-4 rounded-small border-dashed border-2 items-center justify-center transition-colors py-5 px-10",
              isDragActive ? "border-primary bg-primary-100" : "",
              isDragReject ? "bg-danger-50 border-danger" : ""
            )
          })
        }
      >
        <CloudUploadIcon className={cn("icon-lg", isDragReject ? "text-danger" : "text-primary")} />
        <div className="text-center space-y-2 py-3">
          <h4 className="text-xs space-x-2">Drag and drop file{props.multiple ? "s" : ""} here or</h4>
          <ThemedButton onPress={open} isDisabled={props.disabled}>Choose file{props.multiple ? "s" : ""}</ThemedButton>
        </div>
        <input {...getInputProps()} />
      </div>
      <div className="flex flex-wrap justify-between gap-x-4 px-2 items-center text-xs text-default-foreground/60">
        {
          !accept ? null :
          <p className="font-medium">
            <span>Supported formats:</span>
            <span className="uppercase">{Object.values(accept).join(", ").replaceAll(".", "").trim()}</span>
          </p>
        }
        <p className="font-medium">
          <span>Max Size:</span>
          <span className="uppercase">{convertSize(fileSize, "MB", { stringify: true })}</span>
        </p>
      </div>
    </div>
    <div className="flex-1 bg-foreground/5 rounded-small">
      <ScrollShadow className="h-full max-h-64">
        <Listbox aria-label="selected-files" variant="flat">
          <ListboxSection title="Accepted Files"
            classNames={{
              base: "px-3 py-2"
            }}
          >
            {
              images?.map((image, index) => {
                return <ListboxItem
                  key={[index, image.name].join("_")}
                  startContent={createElement(getIcon(image.mime), { className: "icon" })}
                  classNames={{ title: "text-sm", base: "mb-1 last:mb-0" }}
                  endContent={
                    <ThemedButton
                      isIconOnly
                      isDisabled={props.disabled}
                      onPress={() => 
                        onRemoveItem?.(image)
                      }
                      variant="light"
                    >
                      {createElement(XIcon, { className: "icon text-danger" })}
                    </ThemedButton>
                  }
                  // description={
                  //   <Progress size="sm" arial-label={[image.name, "upload progress"].join(" ")} />
                  // }
                  description={
                    <span>{image.mime}</span>
                  }
                >{image.name}</ListboxItem>
              })
            }
          </ListboxSection>
        </Listbox>
      </ScrollShadow>
    </div>
  </div>
}

// prettier-ignore
export const ThemedUploadDropzoneFormController = <T extends FieldValues, K extends ArrayPath<T>> ({ name, control, ...props }: ThemedUploadDropzoneFormControllerProps<T, K>) => {
  const isMultiple = props.multiple || ((props.maxFiles || 0) > 1)

  return <FormArrayController control={control} name={name}>
    {
      (fieldArray) => <ThemedUploadDropzone 
        multiple={isMultiple}
        {...props}
        onValueChange={
        // @ts-ignore
          (images) => fieldArray.append(images)
        }
        // @ts-ignore
        images={fieldArray.fields}
        onRemoveItem={
          (image) => {
            // @ts-ignore
            const index = fieldArray.fields.findIndex(({ name }) => image.name == name)
            fieldArray.remove(index)
          }
        }
      />
    }
  </FormArrayController>
}
