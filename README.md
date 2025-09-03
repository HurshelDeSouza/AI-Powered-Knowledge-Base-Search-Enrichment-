# AI-Powered Knowledge Base Search & Enrichment

An intelligent system that allows users to upload multiple documents, perform natural language searches, receive AI-generated answers, and get suggestions to enrich the knowledge base.

## 🚀 **Key Features**

- **📁 Document Upload**: Multiple file upload with drag & drop
- **🔍 Intelligent Search**: Natural language search across all documents
- **🤖 AI Responses**: Answer generation using Google Gemini AI
- **✅ Completeness Verification**: Automatic analysis of answer quality
- **💡 Enrichment Suggestions**: Recommendations to improve the knowledge base
- **📊 Visual Indicator**: Visual confidence system (traffic light)

## 🛠️ **Technologies Used**

- **Frontend**: React.js with modern hooks
- **Backend**: Node.js + Express.js
- **AI**: Google Gemini AI (Gemini 1.5 Flash)
- **Storage**: In-memory (for prototype)
- **File handling**: Multer

## 🔑 **Google Gemini AI Configuration**

### **1. Get API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### **2. Configure the API Key:**
1. **Option A**: Copy `server/config.example.js` to `server/config.js`:
   ```bash
   cp server/config.example.js server/config.js
   ```

2. **Option B**: Manually create `server/config.js`:
   ```javascript
   const config = {
     googleGeminiApiKey: 'YOUR_API_KEY_HERE',
     port: 5000,
     nodeEnv: 'development'
   };
   module.exports = config;
   ```

3. Replace `'YOUR_API_KEY_HERE'` with your real API key

## 📦 **Installation and Execution**

### **Prerequisites:**
- Node.js (version 16 or higher)
- npm or yarn

### **Step-by-step installation:**

```bash
# 1. Clone the repository (replace with your real URL)
git clone <YOUR-REPOSITORY-URL>
cd <project-name>

# 2. Install root dependencies (concurrently)
npm install

# 3. Install frontend dependencies
cd client
npm install

# 4. Install backend dependencies
cd ../server
npm install

# 5. Return to root directory
cd ..
```

### **Execution:**

```bash
# Run frontend and backend simultaneously (recommended)
npm run dev

# Or run separately:
npm run start-client  # Frontend at http://localhost:5010
npm run start-server  # Backend at http://localhost:5000
```

### **Verify it works:**
- **Frontend**: Open http://localhost:5010 in your browser
- **Backend**: You should see "Server listening at http://localhost:5000" in the terminal

## 🎯 **How to Use the System**

### **1. Upload Documents:**
- Drag and drop files into the upload area
- Or click to manually select files
- Supports text files (.txt), PDFs, and other formats

### **2. Search Information:**
- Type your query in natural language
- The system will search across all uploaded documents
- Results are displayed in real-time

### **3. Get AI Answers:**
- Ask specific questions about the content
- Google Gemini will analyze the documents and generate answers
- The system will evaluate the completeness of each answer

### **4. Enrich the Knowledge Base:**
- Review enrichment suggestions
- Upload additional documents based on recommendations
- Improve the quality of future answers

## 🏗️ **System Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Node.js Backend│    │  Google Gemini  │
│                 │    │                 │    │       AI        │
│ • Document Upload│◄──►│ • File Storage  │◄──►│ • AI Responses  │
│ • Search UI     │    │ • Search Engine │    │ • Completeness  │
│ • Results Display│    │ • API Endpoints│    │ • Enrichment    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔍 **API Endpoints**

- `POST /upload` - Upload documents
- `GET /search?q=<query>` - Search in documents
- `POST /answer` - Generate AI answer

## 🎨 **UI/UX Features**

- **Responsive Design**: Works on mobile and desktop devices
- **Drag & Drop**: Intuitive file upload
- **Instant Search**: Real-time results
- **Visual Indicator**: Traffic light system for confidence
- **Clean Interface**: Modern and professional design

## 🚧 **Prototype Limitations**

- **Storage**: Documents are stored in memory (lost on restart)
- **File formats**: Basic support for text and PDFs
- **Scalability**: Designed for demonstration, not massive production
- **Security**: No user authentication implemented

## 🔮 **Future Improvements**

- [ ] Persistent database (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Support for more file formats
- [ ] AI response caching
- [ ] More advanced document analysis
- [ ] API rate limiting
- [ ] Logs and monitoring

## 📝 **Design Decisions**

### **AI Model Selection:**
- **Google Gemini 1.5 Flash**: Chosen for its speed, accuracy, and Spanish support
- **Completeness Analysis**: Implemented using the same model for consistency
- **Enrichment Suggestions**: Generated dynamically based on context

### **Architecture:**
- **Frontend/Backend Separation**: For scalability and maintenance
- **RESTful API**: Clear and standard interface
- **Error Handling**: Informative responses for debugging

## ⚖️ **Trade-offs due to 10h Constraint**

- **In-Memory Storage**: Quick to implement, but not persistent
- **Basic Search**: Simple implementation vs. advanced search engine
- **Error Handling**: Basic vs. robust logging system
- **UI/UX**: Functional vs. highly polished
- **Testing**: Manual vs. automated test suite

## 🧪 **How to Test the System**

### **Basic Tests:**
1. **Document Upload:**
   - Upload a .txt file with simple content
   - Verify it appears in the list

2. **Search:**
   - Type words that appear in the document
   - Verify that results are displayed

3. **AI Responses:**
   - Ask a question about the document content
   - Verify that Gemini generates a coherent response

4. **Completeness Verification:**
   - Ask questions that require unavailable information
   - Verify that the system detects incomplete answers

### **Advanced Tests:**
- Upload multiple related documents
- Ask questions that require information from several files
- Verify enrichment suggestions

## 🐛 **Troubleshooting**

### **API Key Error:**
- Verify that you have configured `config.js` correctly
- Make sure the API key is valid and has available quota
- Check that the `server/config.js` file exists and has the correct format

### **Dependencies not installed:**
- Run `npm install` in each directory (root, client, server)
- Verify that Node.js is version 16 or higher
- Check that there are no errors during installation

### **Documents not uploading:**
- Verify that the server is running on port 5000
- Check the browser console for errors
- Make sure the `server/uploads` directory exists

### **Slow AI responses:**
- Google Gemini can take 2-5 seconds to respond
- Verify your internet connection
- Check that your API key has available quota

### **Ports occupied:**
- If port 5000 is occupied, change the port in `server/config.js`
- If port 5010 is occupied, React will automatically use another port

## 📞 **Support**

For technical issues or questions about the implementation:
- Check the server logs in the terminal
- Verify the browser console
- Make sure all dependencies are installed
- Verify that the Google Gemini API key is configured correctly

## 📄 **License**

This project is a demonstration prototype. Free for educational and development use.

---

**Developed with ❤️ using React, Node.js and Google Gemini AI**