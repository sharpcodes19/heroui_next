import { z } from "zod/v4"
import { UploadItem } from "~/schemas/misc"

export const toSrc = (image: UploadItem | null | undefined) =>
  [`data:${image?.mime};base64`, image?.base64].filter(Boolean).join(",")

// prettier-ignore
export const toBase64Async = async <T extends File> (file: T) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async (evt) => {
    const validator = await z.string().safeParseAsync(evt.target?.result)
    if(!validator.success) {
      console.warn(validator.error)
      return reject("Unable to convert file to base64")
    }
    return resolve(validator.data)
  }
  reader.onerror = () => {
    reject("An error occured while converting file to base64")
  }
})
