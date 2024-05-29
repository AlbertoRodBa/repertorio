const express = require('express')
const app = express()
const { insertar, consultar, actualizar, borrar } = require('./db'); 

app.listen(3000, () => {
    console.log("App escuchando puerto 3000")
  })

// Middleware
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})


   // 1. Método Post /cancion

  app.post('/cancion', async (req, res) => {
    const payload = req.body;
  
    try {
      const response = await insertar(payload);
      res.send(response.rows);
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.json({error: 'Algo salió mal, inténtalo más tarde'})
    }
  });


  // 2. Método GET

  app.get("/canciones", async (req, res) => {
    try {
      const response = await consultar();
      const canciones = response.rows; 
      res.json(canciones); 
    } catch (error) {
      res.statusCode = 500;
      res.json({ error: "Algo salió mal, inténtalo más tarde"});
    }
  });
  


  // 3. Metodo PUT

  app.put("/cancion/:id", async (req, res) => {
    const { id } = req.params
    const payload = req.body

    // agregar id al Payload
    payload.id = id
    try {
      const result = await actualizar(payload)
      res.send(result)
    } catch (error) {
      console.log(error)
      res.statusCode = 500;
      res.json({error: 'Algo salió mal, inténtalo más tarde'})
    }
  })

  // 4. Metodo DELETE

  app.delete('/cancion', async (req, res) => {
    const { id } = req.query
  
    try {
      const result = await borrar(id)
  
      res.send(result)
    } catch (error) {
      res.statusCode = 500
      res.json({ message: 'Algo salió mal, inténtalo más tarde'})
    }
  })
  
  