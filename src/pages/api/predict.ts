// /pages/api/predict.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const data = await response.json(); // Procesar la respuesta de Flask
      res.status(response.status).json(data); // Enviar la respuesta de vuelta al cliente
    } catch (error) {
      res.status(500).json({ error: "Error al conectar con la API de Flask" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
