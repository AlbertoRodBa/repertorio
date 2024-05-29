const { Pool } = require('pg'); 
const config = { 
  user: process.env.USERDB, 
  host: process.env.HOST, 
  database: process.env.DATABASE, 
  password: process.env.PASSWORD, 
  port: process.env.PORT, 
} 

const pool = new Pool(config);

// Escribir
const insertar = async (payload) => {  
const text = "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING*";
const values = [payload.titulo, payload.artista , payload.tono]
const queryObject = {
 text: text,
 values: values
}
const result = await pool.query(queryObject)
return result
}

// Leer
const consultar = async() => {
    const text = "SELECT * FROM canciones";
    const result = await pool.query(text)
  
    return result
  }



// Editar
const actualizar = async (payload) => {
    // Actualizar un registro
    const text = 'UPDATE canciones SET titulo =$1, artista = $2, tono = $3 WHERE id = $4'
    const values = [payload.titulo, payload.artista, payload.tono, payload.id]
    const queryObject = {
      text: text,
      values: values
    }
    const result = await pool.query(queryObject)
    return result
}


  // Borrar
  const borrar = async (id) => {
    const text = "DELETE FROM canciones WHERE id=$1"
    const values = [id]

    const result = pool.query(text, values)
    return result
  }

module.exports = {insertar, consultar, actualizar, borrar};