// /pages/api/predict.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const requestData = req.body; // Recibe los datos directamente

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData), // Enviar los datos sin modificar
      });

      const data = await response.json();

      res.status(200).json(data);
    } catch (error) {
      console.error("Error al conectar con la API de Flask:", error);
      res.status(500).json({ error: "Error al conectar con la API de Flask" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
