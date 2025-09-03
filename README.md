# AI-Powered Knowledge Base Search & Enrichment

Un sistema inteligente que permite a los usuarios subir múltiples documentos, buscar en lenguaje natural, obtener respuestas generadas por IA, y recibir sugerencias para enriquecer la base de conocimiento.

## 🚀 **Características Principales**

- **📁 Carga de Documentos**: Subida múltiple de archivos con drag & drop
- **🔍 Búsqueda Inteligente**: Búsqueda en lenguaje natural en todos los documentos
- **🤖 Respuestas de IA**: Generación de respuestas usando Google Gemini AI
- **✅ Verificación de Completitud**: Análisis automático de la calidad de las respuestas
- **💡 Sugerencias de Enriquecimiento**: Recomendaciones para mejorar la base de conocimiento
- **📊 Indicador Visual**: Sistema de confianza visual (semáforo)

## 🛠️ **Tecnologías Utilizadas**

- **Frontend**: React.js con hooks modernos
- **Backend**: Node.js + Express.js
- **IA**: Google Gemini AI (Gemini 1.5 Flash)
- **Almacenamiento**: In-memory (para prototipo)
- **Manejo de archivos**: Multer

## 🔑 **Configuración de Google Gemini AI**

### **1. Obtener API Key:**
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la API key generada

### **2. Configurar la API Key:**
1. **Opción A**: Copia `server/config.example.js` a `server/config.js`:
   ```bash
   cp server/config.example.js server/config.js
   ```

2. **Opción B**: Crea manualmente `server/config.js`:
   ```javascript
   const config = {
     googleGeminiApiKey: 'TU_API_KEY_AQUI',
     port: 5000,
     nodeEnv: 'development'
   };
   module.exports = config;
   ```

3. Reemplaza `'TU_API_KEY_AQUI'` con tu API key real

## 📦 **Instalación y Ejecución**

### **Requisitos previos:**
- Node.js (versión 16 o superior)
- npm o yarn

### **Instalación paso a paso:**

```bash
# 1. Clonar el repositorio (reemplaza con tu URL real)
git clone <URL-DE-TU-REPOSITORIO>
cd <nombre-del-proyecto>

# 2. Instalar dependencias del root (concurrently)
npm install

# 3. Instalar dependencias del frontend
cd client
npm install

# 4. Instalar dependencias del backend
cd ../server
npm install

# 5. Volver al directorio raíz
cd ..
```

### **Ejecución:**

```bash
# Ejecutar frontend y backend simultáneamente (recomendado)
npm run dev

# O ejecutar por separado:
npm run start-client  # Frontend en http://localhost:5010
npm run start-server  # Backend en http://localhost:5000
```

### **Verificar que funciona:**
- **Frontend**: Abre http://localhost:5010 en tu navegador
- **Backend**: Deberías ver "Server listening at http://localhost:5000" en la terminal

## 🎯 **Cómo Usar el Sistema**

### **1. Cargar Documentos:**
- Arrastra y suelta archivos en la zona de carga
- O haz clic para seleccionar archivos manualmente
- Soporta archivos de texto (.txt), PDFs, y otros formatos

### **2. Buscar Información:**
- Escribe tu pregunta en lenguaje natural
- El sistema buscará en todos los documentos cargados
- Los resultados se muestran en tiempo real

### **3. Obtener Respuestas de IA:**
- Haz preguntas específicas sobre el contenido
- Google Gemini analizará los documentos y generará respuestas
- El sistema evaluará la completitud de cada respuesta

### **4. Enriquecer la Base de Conocimiento:**
- Revisa las sugerencias de enriquecimiento
- Sube documentos adicionales según las recomendaciones
- Mejora la calidad de las respuestas futuras

## 🏗️ **Arquitectura del Sistema**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Node.js Backend│    │  Google Gemini  │
│                 │    │                 │    │       AI        │
│ • Document Upload│◄──►│ • File Storage  │◄──►│ • AI Responses  │
│ • Search UI     │    │ • Search Engine │    │ • Completeness  │
│ • Results Display│    │ • API Endpoints│    │ • Enrichment    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔍 **Endpoints de la API**

- `POST /upload` - Cargar documentos
- `GET /search?q=<query>` - Buscar en documentos
- `POST /answer` - Generar respuesta de IA

## 🎨 **Características de la UI/UX**

- **Diseño Responsivo**: Funciona en dispositivos móviles y desktop
- **Drag & Drop**: Carga intuitiva de archivos
- **Búsqueda Instantánea**: Resultados en tiempo real
- **Indicador Visual**: Sistema de semáforo para confianza
- **Interfaz Limpia**: Diseño moderno y profesional

## 🚧 **Limitaciones del Prototipo**

- **Almacenamiento**: Los documentos se almacenan en memoria (se pierden al reiniciar)
- **Formato de archivos**: Soporte básico para texto y PDFs
- **Escalabilidad**: Diseñado para demostración, no para producción masiva
- **Seguridad**: Sin autenticación de usuarios implementada

## 🔮 **Mejoras Futuras**

- [ ] Base de datos persistente (MongoDB/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Soporte para más formatos de archivo
- [ ] Cache de respuestas de IA
- [ ] Análisis de documentos más avanzado
- [ ] API rate limiting
- [ ] Logs y monitoreo

## 📝 **Decisiones de Diseño**

### **IA Model Selection:**
- **Google Gemini 1.5 Flash**: Elegido por su velocidad, precisión y soporte para español
- **Análisis de Completitud**: Implementado usando el mismo modelo para consistencia
- **Sugerencias de Enriquecimiento**: Generadas dinámicamente basadas en el contexto

### **Arquitectura:**
- **Separación Frontend/Backend**: Para escalabilidad y mantenimiento
- **API RESTful**: Interfaz clara y estándar
- **Manejo de Errores**: Respuestas informativas para debugging

## ⚖️ **Trade-offs por Restricción de 10h**

- **Almacenamiento en Memoria**: Rápido de implementar, pero no persistente
- **Búsqueda Básica**: Implementación simple vs. motor de búsqueda avanzado
- **Manejo de Errores**: Básico vs. sistema robusto de logging
- **UI/UX**: Funcional vs. altamente pulido
- **Testing**: Manual vs. suite de tests automatizados

## 🧪 **Cómo Probar el Sistema**

### **Pruebas Básicas:**
1. **Carga de Documentos:**
   - Sube un archivo .txt con contenido simple
   - Verifica que aparezca en la lista

2. **Búsqueda:**
   - Escribe palabras que aparezcan en el documento
   - Verifica que los resultados se muestren

3. **Respuestas de IA:**
   - Haz una pregunta sobre el contenido del documento
   - Verifica que Gemini genere una respuesta coherente

4. **Verificación de Completitud:**
   - Haz preguntas que requieran información no disponible
   - Verifica que el sistema detecte respuestas incompletas

### **Pruebas Avanzadas:**
- Carga múltiples documentos relacionados
- Haz preguntas que requieran información de varios archivos
- Verifica las sugerencias de enriquecimiento

## 🐛 **Solución de Problemas**

### **Error de API Key:**
- Verifica que hayas configurado `config.js` correctamente
- Asegúrate de que la API key sea válida y tenga cuota disponible
- Revisa que el archivo `server/config.js` exista y tenga el formato correcto

### **Dependencias no instaladas:**
- Ejecuta `npm install` en cada directorio (root, client, server)
- Verifica que Node.js esté en versión 16 o superior
- Revisa que no haya errores durante la instalación

### **Documentos no se cargan:**
- Verifica que el servidor esté ejecutándose en el puerto 5000
- Revisa la consola del navegador para errores
- Asegúrate de que el directorio `server/uploads` exista

### **Respuestas de IA lentas:**
- Google Gemini puede tardar 2-5 segundos en responder
- Verifica tu conexión a internet
- Revisa que tu API key tenga cuota disponible

### **Puertos ocupados:**
- Si el puerto 5000 está ocupado, cambia el puerto en `server/config.js`
- Si el puerto 5010 está ocupado, React automáticamente usará otro puerto

## 📞 **Soporte**

Para problemas técnicos o preguntas sobre la implementación:
- Revisa los logs del servidor en la terminal
- Verifica la consola del navegador
- Asegúrate de que todas las dependencias estén instaladas
- Verifica que la API key de Google Gemini esté configurada correctamente

## 📄 **Licencia**

Este proyecto es un prototipo de demostración. Libre para uso educativo y de desarrollo.

---

**Desarrollado con ❤️ usando React, Node.js y Google Gemini AI**
