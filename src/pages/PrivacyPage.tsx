import { Shield } from 'lucide-react';
import { LegalShell, LegalTableView } from '@/components/legal/LegalShell';
import { LEGAL_UPDATED } from '@/content/legal';

const PrivacyPage = () => {
  return (
    <LegalShell title="Política de privacidad">
      <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4">
        <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          En Maseya tratamos tus datos con el mínimo imprescindible y con respeto al RGPD.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Responsable del tratamiento</h2>
        <p>
          Asmae Oumanzou. Mollet del Vallès (08100), Barcelona, España. Contacto:{' '}
          <a className="underline underline-offset-2" href="mailto:team@maseya.es">
            team@maseya.es
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Datos que tratamos</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Datos de cuenta: dirección de email.</li>
          <li>
            Perfil de salud facilitado voluntariamente: alergias e intolerancias, tipo y
            condiciones de piel, tipo y estado del cabello, embarazo o lactancia, preferencias de
            dieta y objetivos nutricionales.
          </li>
          <li>Historial de escaneos de productos.</li>
          <li>Favoritos que guardas.</li>
          <li>Productos que aportas mediante foto de etiqueta.</li>
          <li>
            Medición de uso anónima, solo si la aceptas: un identificador aleatorio de sesión y los
            eventos de uso (aperturas, escaneos, errores). No permite identificarte.
          </li>
          <li>Comentarios y valoraciones que envías desde la app.</li>
        </ul>
        <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
          <p className="text-sm font-medium text-foreground/90">
            No recogemos tu nombre, tu dirección postal, tu teléfono, tu ubicación ni datos de pago.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Finalidades</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Prestar el servicio de análisis de productos.</li>
          <li>
            Personalizar los análisis según tu perfil de salud, únicamente si has dado tu
            consentimiento explícito.
          </li>
          <li>Guardar tus productos favoritos.</li>
          <li>Mejorar nuestra base de datos de productos.</li>
          <li>
            Entender de forma agregada cómo se usa la aplicación para mejorarla y detectar fallos,
            solo si aceptas la medición.
          </li>
          <li>Responder a los comentarios que nos envías.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Base legal</h2>
        <p>
          Ejecución del servicio para la cuenta y el historial de escaneos. Para el tratamiento de
          los datos de salud aplicamos el consentimiento explícito (art. 9.2.a RGPD), revocable en
          cualquier momento sin afectar al uso básico de la app.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Medición de uso: consentimiento (art. 6.1.a RGPD y art. 22.2 LSSI), revocable en
            cualquier momento.
          </li>
          <li>Interés legítimo para la seguridad del servicio y la prevención de abusos.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Almacenamiento en tu dispositivo</h2>
        <p>
          Maseya funciona como aplicación web y guarda información en el almacenamiento local de tu
          navegador. No usamos cookies publicitarias, ni cookies de terceros, ni rastreadores de
          redes sociales. No hay publicidad en Maseya.
        </p>
        <p className="text-sm">
          Detalle completo en la{' '}
          <a className="underline underline-offset-2" href="/cookies">
            Política de cookies
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Inteligencia artificial</h2>
        <p>
          Maseya usa inteligencia artificial para dos cosas: leer las fotos de etiquetas que envías,
          y extraer de ellas los ingredientes, la tabla nutricional y el nombre del producto; y
          generar la explicación personalizada del análisis (la función Mira). El proveedor es
          Google (modelos Gemini), a través de la pasarela de Lovable. Para generar la explicación
          se le envían los datos del producto y los factores que el motor ha detectado según tu
          perfil. No se envía tu correo electrónico, ni tu nombre, ni ningún dato que permita
          identificarte, y estos datos no se utilizan para entrenar modelos. Las explicaciones
          generadas se guardan en una memoria interna para no repetir la misma consulta. Esa memoria
          se indexa por producto y por los factores detectados, nunca por usuario.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Cómo se calculan las notas</h2>
        <p>
          Maseya calcula automáticamente dos puntuaciones: una general, basada en criterios
          científicos públicos, y una personal, que evalúa el mismo producto según el perfil que tú
          configuras. Este cálculo es automatizado, pero no produce efectos jurídicos ni te afecta
          significativamente: es información orientativa para tu decisión de compra. En cualquier
          caso, puedes retirar el consentimiento para la personalización y seguir usando la
          aplicación con la nota general.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Destinatarios</h2>
        <p>
          Los datos se alojan en la infraestructura de Supabase/Lovable (UE/EEUU con garantías
          adecuadas). Los análisis con IA procesan tu perfil de forma puntual para generar la
          explicación; no se utilizan para entrenar modelos. Las consultas a Open Food Facts y Open
          Beauty Facts se realizan únicamente con el código de barras del producto, nunca con tus
          datos personales.
        </p>
        <p>
          Transferencias internacionales: algunos proveedores pueden tratar datos fuera del Espacio
          Económico Europeo. En esos casos la transferencia se ampara en las Cláusulas Contractuales
          Tipo aprobadas por la Comisión Europea. Puedes solicitar una copia escribiendo a{' '}
          <a className="underline underline-offset-2" href="mailto:team@maseya.es">
            team@maseya.es
          </a>
          .
        </p>
        <p>No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Conservación</h2>
        <LegalTableView
          headers={['Dato', 'Plazo']}
          rows={[
            [
              'Cuenta, perfil de salud, historial y favoritos',
              'Mientras mantengas tu cuenta activa',
            ],
            ['Medición de uso anónima', '90 días'],
            ['Explicaciones guardadas de la IA', '90 días'],
            ['Preferencia de consentimiento', '12 meses'],
            ['Comentarios enviados', 'Mientras sean útiles para mejorar el servicio'],
          ]}
        />
        <p>
          Al eliminar tu cuenta, borramos tu perfil de salud, tu historial y tus favoritos. Puedes
          solicitarlo en cualquier momento en{' '}
          <a className="underline underline-offset-2" href="mailto:team@maseya.es">
            team@maseya.es
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas adecuadas: cifrado en tránsito, control de
          acceso por usuario a nivel de base de datos (cada persona solo puede acceder a sus propios
          datos) y acceso restringido a la administración. Ninguna transmisión por internet es 100%
          segura, por lo que no podemos garantizar de forma absoluta la seguridad de la información
          transmitida.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Menores</h2>
        <p>
          Maseya está dirigida a mayores de 14 años, edad a partir de la cual la legislación
          española (art. 7 LOPDGDD) permite el consentimiento para el tratamiento de datos
          personales. Si eres menor de 14 años, no crees una cuenta ni facilites datos de salud. Si
          detectamos una cuenta de una persona menor de esa edad, la eliminaremos.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad escribiendo a{' '}
          <a className="underline underline-offset-2" href="mailto:team@maseya.es">
            team@maseya.es
          </a>
          . También tienes derecho a presentar una reclamación ante la Agencia Española de
          Protección de Datos (
          <a
            className="underline underline-offset-2"
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aepd.es
          </a>
          ).
        </p>
        <p>
          Derecho a retirar tu consentimiento en cualquier momento desde Perfil → Privacidad, tanto
          para la personalización con datos de salud como para la medición de uso. Retirarlo no
          afecta a la licitud del tratamiento anterior.
        </p>
      </section>

      <section className="space-y-2 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
        <h2 className="font-display text-base font-semibold">Límites de la información</h2>
        <p>
          Maseya se basa en información declarada por los fabricantes en bases de datos públicas y
          en el análisis automatizado de fotografías. Esa información puede estar incompleta,
          desactualizada o ser incorrecta. La información del envase físico siempre prevalece. Si
          tienes una alergia grave, verifica el etiquetado oficial antes de consumir cualquier
          producto.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-base font-semibold">Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política. La versión vigente será siempre la publicada aquí, con
          su fecha de actualización. Si el cambio es significativo, te avisaremos dentro de la
          aplicación.
        </p>
      </section>

      <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground/80">Aviso: </span>
          Maseya ofrece información orientativa y no sustituye el consejo de un profesional
          sanitario. Las indicaciones sobre embarazo y lactancia se apoyan en recomendaciones
          públicas de AESAN y deben contrastarse con tu matrona o tu médico.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">{LEGAL_UPDATED}</p>
    </LegalShell>
  );
};

export default PrivacyPage;
