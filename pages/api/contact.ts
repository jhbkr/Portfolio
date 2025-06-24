import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["karimbkr269200@gmail.com"],
        subject: "Nouveau message depuis le portfolio",
        html: `<p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ message: error.message || "Erreur lors de l'envoi du message." });
    }

    return res.status(200).json({ message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
} 