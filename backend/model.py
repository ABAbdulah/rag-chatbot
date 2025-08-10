import ollama
from backend.retriever import retrieve

TEMPLATE_PATH = "templates/prompt_template.txt"

def load_template():
    with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
        return f.read()

def build_prompt(query):
    # Get top matches
    matches = retrieve(query, k=5)
    context_text = "\n\n".join([m["text"] for m in matches])

    # Fill template
    template = load_template()
    return template.replace("{{context}}", context_text).replace("{{question}}", query)

def ask_model(query):
    prompt = build_prompt(query)
    response = ollama.chat(model="llama3", messages=[{"role": "user", "content": prompt}])
    return response["message"]["content"]

if __name__ == "__main__":
    q = "Who is abdullah?"
    answer = ask_model(q)
    print(answer)
