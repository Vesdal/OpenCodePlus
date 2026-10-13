# AI Applications

## Purpose

Comprehensive reference for building applications that consume both remote and local AI models. The agent uses this knowledge for API integration, prompt construction, and token‑efficient retrieval strategies.

## When to Consult

- Adding an AI feature to an app.
- Configuring OpenAI‑compatible endpoints.
- Implementing local Ollama or other LLM inference.
- Selecting prompt templates or prompt‑engineering patterns.

## Scope

- OpenAI API basics.
- Custom API gateways and headers.
- Function calling and structured output.
- Streaming responses.
- Retrieving context from a local knowledge base.
- Rate limiting, retries, timeouts.
- Security: API keys, secure storage, content filtering.
- Model routing and fallback strategies.
- Local model inference using Ollama, LlamaCPP, or other providers.

## Core Concepts

1. **Endpoint Configuration** – Base URL, API key, headers.
2. **Prompt Templates** – Static strings, token placeholders, role‐based prompts.
3. **Streaming** – Read partial responses for improved UX.
4. **Function Calling** – Pass metadata, decode JSON to invoke native functions.
5. **Retrieval Augmentation** – Local knowledge base lookup to improve relevance.
6. **Token Management** – Estimate token cost; throttle if usage high.
7. **Security & Privacy** – Store keys encrypted; never log prompts.

## Detailed Operational Guidance

### OpenAI API Request
```dart
final uri = Uri.parse('$baseUrl/v1/chat/completions');
final body = {
  "model": "gpt-4o-mini",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": prompt},
  ],
  "stream": true,
};
final request = http.Request("POST", uri)
  ..headers['Authorization'] = 'Bearer $apiKey'
  ..headers['Content-Type'] = 'application/json'
  ..body = jsonEncode(body);
```
- Use `http` package or `dio`.
- Wrap in a `Repository` for testability.

### Function Calling
```json
{
  "name": "get_time",
  "arguments": {
    "timezone": "UTC"
  }
}
```
- Parse JSON with `json_serializable`.
- Map to a Dart method and return a `FunctionResponse`.

### Streaming
Listen with `response.stream.bytesToString()` or use `http.ByteStream`.
- Update UI incrementally with `StreamBuilder`.

### Retrieval Augmentation
- Use a local Lucene‑style index or `fais` for vector searches.
- Append relevant chunks to the prompt: `"Context: ${chunks.join('\n')}\nUser: `$prompt`.

### Rate Limiting and Retries
- Use `retry` package.
- Exponential backoff; respect `Retry-After` header.

### Local Models (Ollama)
- Endpoint: `http://localhost:11434/api/chat`.
- Model name: `{model_name}` from config.
- Use same request schema as OpenAI.
- No API key required; use `Authorization: Bearer` if configured.

### Security
- Store keys in Windows Credential Store or Android Keystore.
- Never log prompt or response.
- Validate response content against whitelist.

## Rules and Constraints
- Do not expose the API key in the client; route through a secure proxy when necessary.
- Keep prompt size below model token limit; trim context if needed.
- Use `max_tokens` to bound response length.
- Ensure `temperature` and `top_p` values are appropriate for the use case.

## Practical Implementation Guidance
- Create an `AiRepository` interface.
- Provide concrete `OpenAIAiRepository` and `OllamaAiRepository`.
- Use `Injectable` or `get_it` for dependency injection.
- Write unit tests with mock HTTP responses.
- For function calling, define a `map<String, Function>` table.

## Common Mistakes
- Ignoring token limits, leading to API errors.
- Using high temperature for deterministic responses.
- Storing keys in source code.
- Not handling partial streams, causing UI freezes.

## Troubleshooting
- **Authentication failed** – Verify `Authorization` header.
- **Rate limit exceeded** – Check logs, adjust `max_concurrent_requests`.
- **Null response** – Inspect response status code, body.
- **Invalid JSON** – Use a JSON linter.

## Cross‑Platform Considerations
- Use platform‑specific secure storage.
- When running locally on Windows, reference `localhost:11434` for Ollama.
- On Android, use `getExternalCacheDir` to store temporary prompt artifacts.

## Related Knowledge
- [AI Applications](ai_applications.md)
- [Design Tokens](design_tokens.md)
- [Architecture – Modular](architecture_modular.md)

## Official References
- OpenAI API Docs: https://platform.openai.com/docs/api-reference
- Ollama API Docs: https://github.com/jmorganca/ollama
- Function Calling Spec: https://platform.openai.com/docs/guides/function-calling
- Rate‑Limit Handling: https://platform.openai.com/docs/guides/rate-limits

## Version / Date
- Updated: 2026‑10‑07
- OpenAI API: gpt‑4o‑mini
- Ollama: 0.3
