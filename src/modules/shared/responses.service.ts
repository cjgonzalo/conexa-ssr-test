import { HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class ResponseService {

  success(message: string, httpCode = HttpStatus.OK, data: any = null) {
    return { success: true, message, httpCode, data }
  }
  
  error(message: string, httpCode: number = HttpStatus.BAD_REQUEST) {
    return { success: false, message, httpCode }
  }

  create(message: string, httpCode: number = HttpStatus.CREATED, data: any) {
    return { success: true, message, httpCode, data }
  }

  update(message: string, httpCode: number = HttpStatus.OK, data: any) {
    return { success: true, message, httpCode, data }
  }

  delete(message: string, httpCode: number = HttpStatus.OK, data: any) {
    return { success: true, message, httpCode, data }
  }
}