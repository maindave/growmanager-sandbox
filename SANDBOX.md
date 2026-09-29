# GrowManager Sandbox

Este repositorio es el entorno público de pruebas de GrowManager.

- URL: `https://maindave.github.io/growmanager-sandbox/`
- Supabase: proyecto `GrowManager Sandbox` (`bpjcrfdsftjewjfspjpm`)
- No contiene ni debe conectarse a datos de producción.
- No genera ni distribuye APK Android.
- Todo cambio se valida aquí antes de integrarse en `maindave/growmanager`.

## Flujo de trabajo

1. Implementar y publicar primero en este repositorio.
2. Validar la funcionalidad en la URL sandbox.
3. Confirmar explícitamente el pase a producción.
4. Recién entonces aplicar migraciones y código en GrowManager productivo.

El workflow bloquea el despliegue si `supabase-config.js` contiene el identificador del Supabase productivo.
