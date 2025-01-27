import { Injectable } from "@nestjs/common";

@Injectable()
export class ResponseService {
  constructor() {}

  success(message: string, data: any = null) {
    return { success: true, message, data }
  }
  
  error(message: string, httpCode: number = 400) {
    return { success: false, message, httpCode }
  }
}