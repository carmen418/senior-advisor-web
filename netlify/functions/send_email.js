import nodemailer from "nodemailer";

export async function handler(event, context) {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ success: false, error: "Method not allowed" })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const formType = data.formType || "general"; // general, reunion, advisors

    // Transporter configuration
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    // Determine email subject and content based on form type
    let subject, emailContent;

    switch (formType) {
      case "reunion":
        // Formulario solicitud de reunion (formulario-clientes)
        subject = "Solicitud de Reunión Informativa - Senior Advisors";
        emailContent = `
Nueva solicitud de reunión informativa recibida desde el sitio web.

INFORMACIÓN DE CONTACTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Empresa: ${data.empresa || "No especificado"}
Nombre: ${data.nombre || "No especificado"}
Apellidos: ${data.apellidos || "No especificado"}
Correo electrónico: ${data.email || "No especificado"}
Teléfono: ${data.telefono || "No especificado"}

DIRECCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Calle: ${data.calle || "No especificado"}
Municipio: ${data.municipio || "No especificado"}
Código postal: ${data.codigo_postal || "No especificado"}

TIPO DE SERVICIO BUSCADO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.tipo_servicio && data.tipo_servicio.length > 0 
  ? data.tipo_servicio.join("\n- ") 
  : "No especificado"}

DISPONIBILIDAD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.disponibilidad && data.disponibilidad.length > 0 
  ? data.disponibilidad.join(", ") 
  : "No especificado"}

RESUMEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.resumen || "No especificado"}

${data.comentarios ? `\nOTROS COMENTARIOS:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${data.comentarios}` : ""}
        `;
        break;

      case "advisors":
        // Formulario senior advisors
        subject = "Nueva Solicitud de Senior Advisor - Senior Advisors";
        emailContent = `
Nueva solicitud para unirse a la red de Senior Advisors recibida desde el sitio web.

INFORMACIÓN PERSONAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${data.nombre || "No especificado"}
Apellidos: ${data.apellidos || "No especificado"}
Correo electrónico: ${data.email || "No especificado"}
Teléfono: ${data.telefono || "No especificado"}

DIRECCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Calle: ${data.calle || "No especificado"}
Municipio: ${data.municipio || "No especificado"}
Código postal: ${data.codigo_postal || "No especificado"}

INFORMACIÓN PROFESIONAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LinkedIn: ${data.linkedin || "No especificado"}
Años de experiencia: ${data.anos_experiencia || "No especificado"}
Horas semanales disponibles: ${data.horas_semanales || "No especificado"}
Horario preferente: ${data.horario_inicio || ""} - ${data.horario_fin || ""}
Días disponibles: ${data.dias_semana && data.dias_semana.length > 0 
  ? data.dias_semana.join(", ") 
  : "No especificado"}

HONORARIOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.honorarios || "No especificado"}

DISPONIBILIDAD PARA VIAJAR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.disponibilidad_viajar || "No especificado"}

BIO RESUMIDA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.bio || "No especificado"}

ÁREAS DE INTERVENCIÓN PREFERIDAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.areas_intervencion && data.areas_intervencion.length > 0 
  ? data.areas_intervencion.join("\n- ") 
  : "No especificado"}

RESULTADOS E INTERVENCIÓN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.resultados || "No especificado"}

PREFERENCIAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Certificación: ${data.certificacion || "No especificado"}
Notificaciones: ${data.notificaciones || "No especificado"}
Aportar conocimiento: ${data.aportar_conocimiento || "No especificado"}
Assessment personal: ${data.assessment || "No especificado"}

${data.comentarios ? `\nOTROS COMENTARIOS:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${data.comentarios}` : ""}
        `;
        break;

      default:
        // Formulario de consulta general (contacto.html)
        subject = "Nuevo mensaje de contacto desde el sitio web";
        emailContent = `
Nuevo mensaje recibido desde el formulario de contacto.

INFORMACIÓN DE CONTACTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${data.nombre || "No especificado"}
Email: ${data.email || "No especificado"}
Concepto: ${data.concepto || "No especificado"}

MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.mensaje || "No especificado"}
        `;
    }

    // Email options
    const mailOptions = {
      from: `"Web Senior Advisors" <${process.env.EMAIL_USER}>`,
      to: "cortegamartin6@gmail.com",
      subject: subject,
      text: emailContent.trim()
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify({ success: true, message: "Email enviado correctamente" })
    };

  } catch (err) {
    console.error("Error enviando email:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify({ 
        success: false, 
        error: err.message || "Error al enviar el email" 
      })
    };
  }
}
