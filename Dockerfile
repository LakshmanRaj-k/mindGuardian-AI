FROM python:3.12-slim

WORKDIR /app/backend

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

ENV PYTHONUNBUFFERED=1
ENV PORT=7860
ENV BACKEND_CORS_ORIGINS='["https://frontend-chi-rosy-43.vercel.app","http://localhost:5173","http://127.0.0.1:5173"]'

EXPOSE 7860

CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860}"]
