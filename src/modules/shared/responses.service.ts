import { HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class ResponseService {

  success(data: any = null) {
    return {
      success: true,
      httpCode: HttpStatus.OK,
      data
    }
  }
  
  error(message: string, httpCode: number = HttpStatus.BAD_REQUEST) {
    return { success: false, message, httpCode }
  }

  create(data: any = null) {
    return {
      success: true,
      message: "Registro creado correctamente",
      httpCode: HttpStatus.CREATED,
      data
    }
  }

  update(data: any = null) {
    return {
      success: true,
      message: "Registro actualizado correctamente",
      httpCode: HttpStatus.OK,
      data
    }
  }

  delete(data: any = null) {
    return {
      success: true,
      message: "Registro eliminado correctamente",
      httpCode: HttpStatus.OK,
      data
    }
  }
}