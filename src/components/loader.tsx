import { Spinner, SpinnerProps } from "@heroui/spinner"
import { cn, SlotsToClasses } from "@heroui/theme"

type SectionLoaderProps = {
  title?: string
  caption?: string
  spinnerProps?: SpinnerProps
  classNames?: SlotsToClasses<"wrapper" | "title" | "caption" | "base">
}

// prettier-ignore
export const SectionLoader = ({ caption, title, classNames, spinnerProps, ...props }: SectionLoaderProps) => {

  return <div className={cn("flex flex-1 flex-col h-full w-full items-center justify-center", classNames?.base)}>
    <Spinner {...spinnerProps} />
    <div className={cn("py-3 text-center", classNames?.wrapper)}>
      <h3 className={cn("text-sm", classNames?.title)}>{title}</h3>
      <p className={cn("text-xs", classNames?.caption)}>{caption}</p>
    </div>
  </div>

}
