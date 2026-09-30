# Fase 2 — Core operativo en sandbox

30/09/2026. Sólo https://maindave.github.io/growmanager-sandbox/.

## Implementación

- Registrar: Riego, Poda, Trasplante, Medición, Aplicación, Observación, Incidente y Cambio de etapa. Selección de tanda, fecha, notas; litros, pH y EC opcionales en riego. Acceso contextual desde Tanda y entrada principal desde Bitácora; formulario anterior conservado como registro avanzado.
- Riegos reales en irrigation_events; tareas en activities; incidentes en operation_logs. Se usan APIs existentes, sin migraciones ni cambios RLS.
- Agenda Hoy y Semana con navegación por períodos, filtros existentes y estados. Mes conserva calendario y sus funciones anteriores.
- Marcar realizado sobre eventos no recurrentes usa el RPC existente. No crea otra actividad o riego: el historial proyecta el evento completado y enlaza al original.
- Bitácora agrupada por día y ficha Tanda con sus últimos 20 registros y acceso al historial completo. La fecha de realización se obtiene de agenda_event_history; si no existe, se identifica explícitamente la fecha planificada.
- Protección contra doble clic, validación de valores y fechas futuras, comprobación de proyecto/rol antes de guardar. Un fallo de actualización posterior a una escritura confirmada no invita a repetir el guardado.

## Verificación

Pruebas daily-models, today-models, dominio y esquema: correctas. Sintaxis JS y diff: correctos. Despliegue de sandbox con validación CI.

Prueba publicada con administrador: riego ficticio de 1 L y pH 6.2 guardado y visible en historial; evento «Prueba UX Fase 2 · poda planificada» creado en Agenda, mostrado en Hoy y Semana, marcado realizado y observado una sola vez en historial, con fecha de realización y enlace al plan. No hubo comandos sobre hardware.

## Límites y continuación

No hay ejecución independiente por ocurrencia recurrente: el modelo vigente guarda estado de toda la serie. Por eso el acceso rápido Marcar realizado se limita a eventos no recurrentes. El selector anterior se conserva con etiqueta de serie.

Completar un plan no captura aún cantidades/mediciones de ejecución. Registrar separadamente el mismo hecho de forma manual puede duplicar su significado: el formulario avisa usar el evento existente. Resolver esto para riegos planificados con detalles y recurrencias requiere diseño transaccional/backend adicional; no se implementó una vinculación parcial basada en dos escrituras independientes.

No se probaron viewer/editor con cuentas separadas, Android físico, todos los tipos mediante escrituras ni casos de concurrencia entre dispositivos. La validación principal fue móvil; no se declara auditoría exhaustiva. No se inició Fase 3. Los registros ficticios de prueba permanecen identificados en sandbox.
