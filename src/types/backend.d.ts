type FailedBackedResponse = {
  ok: false
  error?: {
    [key: string]: {
      errors: Array<string>
    }
  }
  message: string
}

type SuccessfullResponse <T = import("react-hook-form").FieldValues> =
  {
    ok: true
    message?: string
    data: T
    authToken: string | null
    totalPage?: number
  } 
  
type BackendResponse <T = import("react-hook-form").FieldValues> = 
  SuccessfullResponse<T> | 
  FailedBackedResponse