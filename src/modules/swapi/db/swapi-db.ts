import mongoose, { Schema, model } from "mongoose"

const existsCollection = async (name: string | undefined) => {
  return (await mongoose
    .connection
    .db
    ?.listCollections({ name })
    .toArray())
    ?.length
}

const createCollection = async (name: string, data: Object[]) => {
  /*
    Se crean las colecciones de esta forma ya que las peticiones a 
    /api/<resource>/schema de SWAPI devuelven error 404
  */
  const schemaFields = {}

  Object.keys(data[0])
    .forEach(key => { schemaFields[key] = { type: typeof key } })

  const schema = new Schema(schemaFields)
  model(name, schema)
}

const insertDocuments = async (collName: string, data: Object[]) => {
  const coll = mongoose.connection.collection(collName)
  await coll.insertMany(data)
}

export async function populateDatabase(resource: string) {
  try {
    if(!mongoose.connection.readyState) {
      await mongoose.connect(String(process.env.DATABASE_URI))
    }
  
    const collName = resource
      .slice(0, resource.length - 1)
      .split("/")
      .pop()
    
    if(collName && !await existsCollection(collName)) {
      console.log(`Obteniendo recursos para poblar la coleccion ${collName}`)
      
      let response = await fetch(resource)
      let data = await response.json()

      createCollection(collName, data.results)
      insertDocuments(collName, data.results)

      while(data.next) {
        response = await fetch(data.next)
        data = await response.json()
        await insertDocuments(collName, data.results)
      }
      console.log(`Finalizó la inserción de ${collName}, se insertaron en total ${data.count} documentos`)
    }
  
    await mongoose.connection.close()

  } catch(error) {
    console.error("Ocurrio un error al poblar la base de datos con los datos de SWAPI")
    error.code && console.error(`Código de error: ${error.code}`)
    error.message && console.error(`Detalle de error: ${error.message}`)
  }
  
}