import type { LegalDocument } from "./types";
import { SUPPORT_EMAIL } from "@/lib/constants";

const LAST_UPDATED = "2025-06-25";
const CONTACT = SUPPORT_EMAIL;

export const termsEs: LegalDocument = {
  title: "Términos de servicio",
  lastUpdated: LAST_UPDATED,
  intro:
    "Estos Términos regulan su uso de Renulo. Al crear una cuenta o utilizar el servicio, acepta estos Términos.",
  sections: [
    {
      heading: "1. Servicio",
      paragraphs: [
        "Renulo le ayuda a hacer un seguimiento manual de suscripciones y gastos recurrentes. No es un banco, procesador de pagos ni asesor financiero.",
        "Los totales y las conversiones de moneda utilizan tipos de cambio aproximados y son solo con fines informativos.",
      ],
    },
    {
      heading: "2. Cuenta",
      paragraphs: [
        "Debe proporcionar información precisa y proteger sus credenciales.",
        "Es responsable de la actividad realizada bajo su cuenta.",
        "Puede eliminar su cuenta en cualquier momento en Ajustes.",
      ],
    },
    {
      heading: "3. Uso aceptable",
      paragraphs: [
        "No haga un uso indebido del servicio, no intente acceder sin autorización ni lo utilice con fines ilícitos.",
        "Podemos suspender o cancelar cuentas que infrinjan estos Términos o perjudiquen el servicio.",
      ],
    },
    {
      heading: "4. Funciones gratuitas y de pago",
      paragraphs: [
        "Renulo puede ofrecer planes gratuitos y de pago. El plan gratuito es actualmente ilimitado. Los precios y las funciones pueden cambiar con previo aviso.",
      ],
    },
    {
      heading: "5. Exención de responsabilidad",
      paragraphs: [
        "El servicio se proporciona «tal cual» sin garantías de funcionamiento ininterrumpido o libre de errores.",
        "No somos responsables de las decisiones que tome basándose en la información mostrada en la aplicación (p. ej. cancelar una suscripción).",
      ],
    },
    {
      heading: "6. Limitación de responsabilidad",
      paragraphs: [
        "En la medida permitida por la ley, Renulo no es responsable de daños indirectos o consecuentes. Nuestra responsabilidad total se limita al importe que nos haya pagado en los doce meses anteriores a la reclamación (o cero si utiliza el plan gratuito).",
        "Nada en estos Términos limita los derechos que le correspondan conforme a la legislación imperativa de protección al consumidor de su país.",
      ],
    },
    {
      heading: "7. Cambios",
      paragraphs: [
        "Podemos actualizar estos Términos. El uso continuado tras los cambios implica su aceptación. Los cambios sustanciales se comunicarán cuando proceda.",
      ],
    },
    {
      heading: "8. Contacto",
      paragraphs: [`Preguntas: ${CONTACT}.`],
    },
  ],
};
