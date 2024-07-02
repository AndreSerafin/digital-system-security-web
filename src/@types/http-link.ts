export interface HttpLink<R> {
  get(url: string, config?: any): Promise<R>
  patch(url: string, config?: any): Promise<R>
  put(url: string, config?: any): Promise<R>
  post(url: string, config?: any): Promise<R>
  delete(url: string, config?: any): Promise<R>
}
