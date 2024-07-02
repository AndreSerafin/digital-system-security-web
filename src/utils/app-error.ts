import { AxiosResponse } from 'axios'

export class AppError {
  message: string
  error: any

  constructor(response: AxiosResponse<unknown, any> | undefined) {
    if (response) {
      this.error = response.data

      if (typeof response.data === 'string') {
        this.message = response.data
      } else {
        this.message = JSON.stringify(response.data).replace(
          /.*:|[{}[\]",]/g,
          '',
        )
      }
    } else {
      this.message = 'Ocorreu um erro inesperado!'
    }
  }
}
