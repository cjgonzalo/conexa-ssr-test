// dynamic-model.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Schema, model, Model, connection, connect, Types } from 'mongoose';
import { SwapiService } from '../swapi/swapi.service';

@Injectable()
export class DynamicModelService implements OnModuleInit {
  private models: Map<string, Model<any>> = new Map()

  constructor(private readonly swapiService: SwapiService) {}

  /*
    Dado que las peticiones a /api/<resource>/schema devuelven 404 
    los esquemas se generan a partir de los tipos de datos que se reciben de los recursos de SWAPI
  */
  private async createOrGetModel(name: string, data: object): Promise<Model<any> | undefined> {
    if (this.models.has(name)) {
      return this.models.get(name)
    }

    // Se agrega un index en campo "id" ya que la mayoria de las busquedas se realizan a traves de este
    const schemaFields = {
      id: { type: "number", required: true, unique: true, index: true }
    }
    Object.keys(data).forEach(key => {
      schemaFields[key] = { type: typeof data[key] }
    })

    const schema = new Schema(schemaFields, { collection: name, _id: true })
    const newModel = model(name, schema)

    this.models.set(name, newModel)
    return newModel
  }

  /*
    Antes de insertar los objetos en la db se transforman para facilitar la busqueda y poder relacionarlos entre si.
    Para facilitar la busqueda se agrega el campo "id" con el mismo id que le asigna SWAPI al recurso y para facilitar el mapeo
    transforman las urls en los ids correspondientes de los recursos a los que apuntan.
    El campo "url" no se transforma ya que sirve para obtener el id del recurso actual
  */
  private transformDocForInsert(doc: any) {
    const urlRegExp = new RegExp(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)

    Object.entries(doc).forEach(([key, value]) => {
      if(key !== "url") {
        if(Array.isArray(value)) {
          doc[key] = value.map(
            elem => urlRegExp.test(elem)
              ? Number(this.extractLastSegment(String(elem)))
              : elem
          )
        } else {
          doc[key] = urlRegExp.test(String(value))
            ? Number(this.extractLastSegment(String(value)))
            : value
        }
      }
    })

    return { ...doc, id: Number(this.extractLastSegment(doc.url)) }
  }

  private async insertDocuments(model: Model<any>, docs: any[]) {
    await model.insertMany(docs.map(doc => this.transformDocForInsert(doc)))
  }

  private extractLastSegment(input: string): string {
    return String(input
      .slice(0, input.length - 1)
      .split("/")
      .pop())
  }

  getModel(name: string): Model<any> {
    return this.models.get(name) as Model<any>
  }

  private async populateDatabase(resource: string) {
    const collName = this.extractLastSegment(resource)

    console.log(`Obteniendo recursos para poblar la coleccion ${collName}`)

    let swapiData = await this.swapiService.getSwapiData(resource)

    const model = await this.createOrGetModel(collName, swapiData.results[0]) as Model<any>
    await this.insertDocuments(model, swapiData.results)
    
    while(swapiData.next) {
      swapiData = await this.swapiService.getSwapiData(swapiData.next)
      await this.insertDocuments(model, swapiData.results)
    }

    console.log(`Finalizó la inserción de ${collName}, se insertaron en total ${swapiData.count} documentos\n`)
  }

  private async initializeModels(): Promise<void> {
    try {
      if(!connection.readyState) {
        await connect(String(process.env.DATABASE_URI))
      }
      
      const resources = await this.swapiService.getResources()
  
      for (const resource of Object.values(resources)) {
        const collName = this.extractLastSegment(resource)
        const data = await connection
          .collection(collName)
          .find()
          .limit(1)
          .toArray()
        
        /*
          Si una coleccion proveniente de SWAPI ya contiene datos (es decir que ya fue poblada en algun momento)
          solo se crea el modelo para disponibilizarlo para su uso, en cambio, si la coleccion no contiene datos
          se pobla con los datos provenientes de la api
        */
        if (data.length) {
          await this.createOrGetModel(collName, data[0])
        } else {
          await this.populateDatabase(resource)
        }
      }

    } catch(error) {
      console.error("Ocurrio un error al poblar la base de datos con los datos de SWAPI")
      error.code && console.error(`Código de error: ${error.code}`)
      error.message && console.error(`Detalle de error: ${error.message}`)
    }
  }

  async onModuleInit() {
    await this.initializeModels()
  }
}
