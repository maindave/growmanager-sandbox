# GrowManager — Fase 1, implementación y validación

Fecha: 30 de septiembre de 2026. Implementación destinada exclusivamente a GrowManager Sandbox. Fases 2 y 3 no iniciadas.

## Cambios

Base light neutra, tipografía de sistema, tokens y espaciados; nueva navegación móvil Hoy / Cultivos / Registrar / Agenda / Más; Inicio reorganizado alrededor de próximos eventos, tandas, atención y actividad. Ambiente y sistemas quedan después del cultivo; diagnóstico y energía permanecen en un detalle secundario.

Tanda incorpora Hoy, Historial, Plan y Datos. Los enlaces usan Bitácora, Agenda y Nutrición existentes; no crean un nuevo historial ni guardan nuevas relaciones. Registrar abre los formularios existentes o el asistente. Las alertas se derivan de eventos no recurrentes vencidos, registros no resueltos y conectividad observada; no se infieren diagnósticos agronómicos.

## Archivos

- `index.html`: jerarquía Hoy, ficha Tanda, navegación, menú Registrar, carga de módulos.
- `ui-foundations.css`: tokens claros, componentes y adaptación responsive sobre estilos existentes.
- `today-models.js`: derivaciones de antigüedad, pendientes y alertas, sin persistencia.
- `today.js`: presentación y enlaces contextuales, control de rol del acceso Registrar.
- `app.js`: integración de navegación, tema claro por defecto, lectura de dispositivo y arranque.
- `agenda.js`: datos para Hoy, filtro por tanda y apertura de eventos; guarda contra respuestas de otro proyecto.
- `operations.js`: actividad para Hoy, historial por tanda; guarda contra respuestas de otro proyecto.
- `cultivation.js`: entrada a Tanda y acceso a edición existente.
- `nutrition-calendar.js`: apertura contextual de nutrición y visibilidad del botón según rol.
- `onboarding-tour.js`: descripción actualizada de Hoy.
- `scripts/sync-web.mjs`, `sw.js`: inclusión de recursos y renovación de caché.
- `tests/today-models.test.mjs`: casos de fechas futuras, eventos terminados, recurrentes y alertas resueltas.
- `www/`: salida generada con el script de sincronización; recursos Android sincronizados con Capacitor.

## Compatibilidad y límites

No se modificaron Supabase, RLS, migraciones, repositorio de persistencia, firmware, contratos de IA ni relaciones entre eventos, riegos y registros. Se conservaron todos los IDs preexistentes del HTML. Esto es evidencia de compatibilidad estructural, no sustituye pruebas funcionales autenticadas.

Se conserva la preferencia de tema de usuarios existentes; el modo claro es el predeterminado para nuevas preferencias. El tema oscuro definitivo queda fuera de esta fase. Parte de la iconografía antigua permanece; los componentes nuevos usan SVG lineal.

## Verificaciones ejecutadas

- Pruebas TodayModels: correctas.
- Pruebas de dominio cultivo-models: correctas.
- Validación estática de esquema/RLS supabase-schema: correcta. No es una prueba de permisos contra Supabase.
- Comprobación de sintaxis de ocho módulos JS: correcta.
- git diff --check: correcto.
- Sincronización web y Capacitor Android: correcta.
- Gradle assembleDebug offline: compilación correcta; no se ejecutó en dispositivo Android.
- Pantalla de login local renderizada.
- Copia visual aislada con datos ficticios: Hoy escritorio y móvil, Cultivos, Tanda, Agenda y Más. Se probó apertura/cierre de Registrar y navegación Tanda → Plan → Agenda, observando el filtro de la tanda seleccionado.
- Sin desborde de documento en Agenda a 390 px y menú Más a 320 px; sin errores de consola observados en la copia visual.

## Validación pendiente del sandbox

La validación previa aislada y la compilación Android se realizaron sobre la copia local de origen. No certifican los flujos autenticados de este sandbox. El sandbox conserva su configuración Supabase, almacenamiento separado, etapas y creación de espacios, calendario y recetas ya existentes; conserva también Personalizar Hoy. No genera APK.

Destino: https://maindave.github.io/growmanager-sandbox/. Copia de trabajo: /private/tmp/growmanager-sandbox. Verificar allí login, proyectos, permisos y vistas con una sesión de pruebas. Las capturas anteriores contienen datos de otra instancia y no se publican en este repositorio.

La fase 2 requiere aprobación posterior y análisis independiente del registro universal, cronología y relación plan → ejecución. No iniciarla hasta cerrar las verificaciones de esta fase.

## Cierre de revisión en sandbox publicado

Validado con sesión de administrador el 30/09/2026: carga de Hoy, navegación móvil, cultivo y espacios existentes, creación y persistencia del lote «Prueba UX · Fase 1», ficha Tanda, enlace a Bitácora con lote y período completo seleccionados, Agenda mensual, Nutrición con el lote de prueba, menú Más, apertura/cierre de Registrar y carga de los cuatro canales de Control. No se accionaron relés ni se cambiaron automatizaciones. Nutrición no desborda horizontalmente a 390 px.

Se publican ajustes finales de superficie neutra, margen móvil y controles de expansión de 44 px. Capturas del sandbox se conservan localmente en `ui-captures/sandbox-fase1` de la carpeta APP-V2.5, fuera del repositorio público.

Límites de validación: no se probaron sesiones viewer/editor, onboarding desde cuenta nueva, cambio entre proyectos (sólo uno disponible), ejecución IA, guardados de riego/actividad ni un dispositivo Android. Esos puntos no se consideran verificados por la compilación o la inspección de código. No hubo migraciones ni publicación en producción. El lote de prueba permanece identificable en el sandbox.
