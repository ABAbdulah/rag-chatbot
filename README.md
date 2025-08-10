# AI Chatbot with React, TypeScript & FastAPI (Ollama Backend)

This project is a **local AI-powered chatbot** built with React and TypeScript on the frontend and FastAPI serving as the backend API that connects to Ollama’s LLaMA models running on your personal GPU.

It supports:  
- Conversational chat interface with Markdown rendering  
- Upload & retrieval of PDF/docs with RAG (Retrieval-Augmented Generation)  
- Real-time typing indicator (“Thinking...”)  
- Responsive UI styled with Tailwind CSS  

---

## Features

- **Local AI inference:** Runs LLaMA models on your own machine (GPU accelerated via Ollama)  
- **FastAPI backend:** API endpoints for chat, PDF ingestion, and retrieval  
- **Document search:** Extracts and indexes documents for contextual answers  
- **React + TypeScript frontend:** Modern UI with streaming responses and smooth UX  
- **Markdown rendering:** Nicely formatted answers in chat  
- **Typing indicator:** Shows `...Thinking` while AI responds  
- **Clean & customizable Tailwind styling**  

---

## Getting Started

### Prerequisites

- Python 3.10+  
- Node.js 18+  
- GPU with CUDA support (recommended for model acceleration)  
- Ollama installed and running  
- [Optional] Visual Studio Build Tools (Windows) for Python packages  

### Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/ABAbdulah/rag-chatbot.git
   cd rag-chatbot
