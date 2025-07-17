from fastapi import FastAPI, requests
import os
from dotenv import load_dotenv
load_dotenv()

app=FastAPI()

@app.get("/")
async def root():
    return {"message": "Hola!"}