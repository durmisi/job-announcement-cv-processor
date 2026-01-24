import os
import logging
import requests
from . import LLMClient

logger = logging.getLogger(__name__)


class OllamaClient(LLMClient):
    def __init__(self) -> None:
        self.base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.model = os.getenv("LLM_MODEL", "deepseek-r1:8b")

        logger.info("Initialized OllamaClient")
        logger.info(f"Ollama base URL: {self.base_url}")
        logger.info(f"Ollama model   : {self.model}")

    def generate_response(self, prompt: str) -> str:
        url = f"{self.base_url}/api/generate"

        logger.info("Sending request to Ollama")
        logger.debug(f"Endpoint: {url}")
        logger.debug(f"Model: {self.model}")

        try:
            response = requests.post(
                url,
                headers={"Content-Type": "application/json"},
                json={
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=120
            )
        except requests.RequestException as ex:
            logger.exception("Failed to connect to Ollama")
            raise RuntimeError("Ollama request failed") from ex

        logger.info(f"Ollama response status: {response.status_code}")

        if not response.ok:
            logger.error(f"Ollama error response: {response.text}")
            response.raise_for_status()

        data = response.json()
        output = data.get("response", "").strip()

        if not output:
            logger.warning("Ollama returned an empty response")

        return output
