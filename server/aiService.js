const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(config.googleGeminiApiKey);

// Fallback responses for when Gemini is unavailable
const getFallbackResponse = (query, documents) => {
  const documentNames = documents.map(doc => doc.originalname).join(', ');
  
  return {
    answer: `Based on the available documents (${documentNames}), here's what I can tell you about "${query}": This is a simulated response since the AI service is currently unavailable. The system detected ${documents.length} document(s) that could potentially contain relevant information.`,
    confidence: 0.6,
    enrichmentSuggestion: 'To get more accurate AI-powered responses, please check your API quota or try again later when the service is available.',
  };
};

const getAIAnswer = async (query, documents) => {
  try {
    // Check if API key is configured
    if (config.googleGeminiApiKey === 'your_api_key_here') {
      return {
        answer: '⚠️ Error: API Key not configured. Please update config.js with your Google Gemini API key.',
        confidence: 0,
        enrichmentSuggestion: 'Configure your API key in server/config.js to use real AI.',
      };
    }

    // Prepare context from documents
    const documentContext = documents.map(doc => 
      `Documento: ${doc.originalname}\nContenido: ${doc.content}\n---`
    ).join('\n');

    // Create the prompt for Gemini
    const prompt = `Basándote en los siguientes documentos, responde a esta pregunta: "${query}"

Documentos disponibles:
${documentContext}

Instrucciones:
1. Responde de manera clara y concisa
2. Cita específicamente qué documentos usaste para tu respuesta
3. Si la información es incompleta, indícalo claramente
4. Proporciona sugerencias para enriquecer la base de conocimiento si es necesario

Respuesta:`;

    // Get Gemini model - using available model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiAnswer = response.text();

    // Analyze completeness and generate enrichment suggestions
    const completeness = await analyzeCompleteness(query, aiAnswer, documents);
    
    let enrichmentSuggestion = '';
    if (completeness < 0.7) {
      enrichmentSuggestion = await generateEnrichmentSuggestion(query, documents);
    }

    return {
      answer: aiAnswer,
      confidence: completeness,
      enrichmentSuggestion: enrichmentSuggestion,
    };

  } catch (error) {
    console.error('Error getting AI answer:', error);
    
    // Handle specific Google Gemini errors
    if (error.status === 503) {
      return {
        answer: '⚠️ Google Gemini is temporarily overloaded. Please wait 1-2 minutes and try again.',
        confidence: 0.3,
        enrichmentSuggestion: 'This is a temporary service issue. Try again in a few minutes.',
      };
    }
    
    if (error.status === 429) {
      return {
        answer: '⚠️ API quota exceeded. You have reached your daily limit of 50 requests for the free tier.',
        confidence: 0.2,
        enrichmentSuggestion: 'Please upgrade your plan or wait until tomorrow. Using fallback response for now.',
      };
    }
    
    if (error.message.includes('overloaded')) {
      return {
        answer: '⚠️ The AI service is very busy at the moment. Please try again in 2-3 minutes.',
        confidence: 0.2,
        enrichmentSuggestion: 'Wait a bit and try your question again.',
      };
    }
    
    if (error.message.includes('quota') || error.message.includes('Too Many Requests')) {
      return getFallbackResponse(query, documents);
    }
    
    return getFallbackResponse(query, documents);
  }
};

// Analyze answer completeness using Gemini
const analyzeCompleteness = async (query, answer, documents) => {
  try {
    const prompt = `Analiza la completitud de esta respuesta:

Pregunta: "${query}"
Respuesta: "${answer}"

Documentos disponibles: ${documents.map(doc => doc.originalname).join(', ')}

Evalúa en una escala del 0 al 1 (0 = muy incompleta, 1 = completamente satisfactoria):
- ¿La respuesta responde completamente a la pregunta?
- ¿Hay información faltante?
- ¿Se necesitan más documentos?

Responde SOLO con un número entre 0 y 1.`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const score = parseFloat(response.text().trim()) || 0.5;
    
    return Math.max(0, Math.min(1, score)); // Ensure between 0 and 1
  } catch (error) {
    console.error('Error analyzing completeness:', error);
    return 0.5; // Default to medium confidence
  }
};

// Generate enrichment suggestions using Gemini
const generateEnrichmentSuggestion = async (query, documents) => {
  try {
    const prompt = `Basándote en esta pregunta: "${query}" y los documentos disponibles: ${documents.map(doc => doc.originalname).join(', ')}

Sugiere formas específicas de enriquecer la base de conocimiento para obtener respuestas más completas. Sé específico sobre:
- Tipos de documentos adicionales
- Fuentes de información
- Palabras clave para búsquedas
- Áreas específicas que necesitan más cobertura

Responde en español de manera clara y práctica.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error generating enrichment suggestion:', error);
    return 'Considera subir más documentos relacionados con el tema para obtener respuestas más completas.';
  }
};

module.exports = { getAIAnswer };
