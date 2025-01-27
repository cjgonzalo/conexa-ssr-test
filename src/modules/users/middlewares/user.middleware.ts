import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDocument } from "../users.schema";
import { genSalt, hash } from "bcrypt"

// export async function hashPassword(next: Function) {
//   const user = this as UserDocument

//   if(!user.isModified("password")) {
//     next()
//   }
//   const salt = await genSalt(Number(process.env.BCRYPT_SALT))
//   user.password = await hash(user.password, salt)
//   next()
// }

export async function hashPassword(password: string) {
  const salt = await genSalt(Number(process.env.BCRYPT_SALT))
  password = await hash(password, salt)
}

export function validatePassword(password: string) {
  /*
    la expresión regular valida que la contraseña contenga al menos:
      - una letra mayuscula
      - un número
      - un carácter especial
      - 8 caracteres en total
  */
  const strongPasswordRegExp = new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)

  if(!strongPasswordRegExp.test(password)) {
    throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST)
  }
}

export function validateEmail(email: string) {
  // expresión regular para verificar si el mail ingresado es valido
  const emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  
  if(!emailRegExp.test(email)) {
    throw new HttpException("Invalid email", HttpStatus.BAD_REQUEST)
  }
}