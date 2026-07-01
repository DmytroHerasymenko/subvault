import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const privacyEs: LegalDocument = {
  title: "Política de privacidad",
  lastUpdated: LAST_UPDATED,
  intro:
    "Renulo («nosotros») es un servicio de seguimiento de suscripciones. Esta política describe qué datos personales tratamos, por qué, y qué derechos tiene conforme al RGPD y leyes similares (incluidos los usuarios en España, Polonia y Ucrania).",
  sections: [
    {
      heading: "1. Responsable del tratamiento",
      paragraphs: [
        `Operador del servicio: Renulo. Contacto para solicitudes de privacidad: ${CONTACT}.`,
      ],
    },
    {
      heading: "2. Qué datos recopilamos",
      paragraphs: [
        "Datos de cuenta: dirección de correo electrónico, identificadores de autenticación (incluidos los del inicio de sesión con Google, si lo utiliza).",
        "Datos de perfil: nombre para mostrar (si se proporciona), moneda preferida, preferencia de idioma.",
        "Datos de suscripciones que introduce: nombres de servicios, importes, monedas, fechas de facturación, categorías, notas.",
        "Datos técnicos: cookies de sesión necesarias para mantener su sesión iniciada (véase Cookies).",
        "No nos conectamos a su cuenta bancaria ni escaneamos su bandeja de correo.",
      ],
    },
    {
      heading: "3. Por qué usamos sus datos",
      paragraphs: [
        "Para crear y proteger su cuenta y proporcionar el rastreador de suscripciones.",
        "Para almacenar y mostrar sus suscripciones y resúmenes de gastos.",
        "Para enviar correos transaccionales (p. ej. confirmación de correo) a través de nuestro proveedor de autenticación.",
        "Base legal (RGPD): ejecución del contrato (prestación del servicio) y, cuando proceda, interés legítimo en operar y proteger el servicio.",
      ],
    },
    {
      heading: "4. Dónde se almacenan los datos",
      paragraphs: [
        "Los datos se almacenan en Supabase (base de datos y autenticación) y se sirven a través de Vercel. Los proveedores pueden tratar datos en la UE, EE. UU. u otras regiones según sus condiciones y garantías (p. ej. cláusulas contractuales tipo).",
      ],
    },
    {
      heading: "5. Cuánto tiempo conservamos los datos",
      paragraphs: [
        "Cuenta activa: conservamos sus datos mientras su cuenta exista.",
        "Tras eliminar su cuenta: los datos de perfil y suscripciones se eliminan de nuestra base de datos sin demora indebida. Las copias de seguridad de nuestros proveedores de infraestructura pueden conservar copias durante un período limitado (normalmente hasta unas semanas) antes de la rotación automática.",
        "Los registros del servidor y de seguridad pueden conservarse durante un tiempo limitado por nuestros proveedores de alojamiento para la resolución de problemas y la prevención de abusos.",
      ],
    },
    {
      heading: "6. Cookies",
      paragraphs: [
        "Utilizamos únicamente cookies esenciales para mantener su sesión iniciada. Actualmente no utilizamos cookies publicitarias ni de análisis. Si añadimos análisis en el futuro, actualizaremos esta política y solicitaremos el consentimiento cuando sea necesario (p. ej. en la UE).",
      ],
    },
    {
      heading: "7. Compartición con terceros",
      paragraphs: [
        "Utilizamos Supabase (autenticación/base de datos), Vercel (alojamiento) y, opcionalmente, Google (inicio de sesión). No vendemos sus datos personales.",
        "Los datos de tipos de cambio se obtienen de APIs públicas; no se envían datos personales con ese fin.",
      ],
    },
    {
      heading: "8. Sus derechos",
      paragraphs: [
        "Puede acceder, rectificar o eliminar sus datos. Puede eliminar su cuenta en Ajustes, lo que eliminará su perfil y suscripciones.",
        "Puede retirar el consentimiento otorgado, oponerse a determinados tratamientos y presentar una reclamación ante una autoridad de control (p. ej. la AEPD en España).",
        `Para ejercer sus derechos, contacte con ${CONTACT}.`,
      ],
    },
    {
      heading: "9. Menores",
      paragraphs: [
        "Renulo no está dirigido a menores de 16 años. No recopilamos datos de menores de forma consciente.",
      ],
    },
    {
      heading: "10. Cambios",
      paragraphs: [
        "Podemos actualizar esta política. Publicaremos la nueva versión en esta página con una fecha actualizada.",
      ],
    },
  ],
};
