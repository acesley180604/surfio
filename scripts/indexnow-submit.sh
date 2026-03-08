#!/bin/bash
# IndexNow URL Submission Script for SurfIO
# Run after each deploy to notify Bing/Yandex/Naver of content updates
# This triggers immediate crawling by Bing (and thereby ChatGPT via Bing)
#
# Usage: ./scripts/indexnow-submit.sh

SITE="https://surfio.net"
KEY="surfio-aeo-indexnow-key-2026"
KEY_LOCATION="${SITE}/${KEY}.txt"

URLS=(
  "${SITE}/"
  "${SITE}/aeo/financial-services"
  "${SITE}/aeo/accounting-firms"
  "${SITE}/aeo/b2b-software"
  "${SITE}/aeo/legal-services"
  "${SITE}/aeo/healthcare"
  "${SITE}/aeo/ecommerce"
  "${SITE}/aeo/edtech"
  "${SITE}/aeo/startups"
  "${SITE}/platform/chatgpt"
  "${SITE}/platform/google-ai-overview"
  "${SITE}/platform/perplexity"
  "${SITE}/platform/claude"
  "${SITE}/platform/bing-chat"
  "${SITE}/glossary"
  "${SITE}/glossary/aeo"
  "${SITE}/glossary/geo"
  "${SITE}/glossary/llm"
  "${SITE}/glossary/schema-markup"
  "${SITE}/glossary/e-e-a-t"
  "${SITE}/glossary/featured-snippets"
  "${SITE}/glossary/knowledge-graph"
  "${SITE}/glossary/ai-citations"
  "${SITE}/glossary/brand-mentions"
  "${SITE}/glossary/prompt-optimization"
)

# Build JSON payload
URL_LIST=""
for url in "${URLS[@]}"; do
  URL_LIST="${URL_LIST}\"${url}\","
done
URL_LIST="${URL_LIST%,}"

PAYLOAD="{
  \"host\": \"surfio.net\",
  \"key\": \"${KEY}\",
  \"keyLocation\": \"${KEY_LOCATION}\",
  \"urlList\": [${URL_LIST}]
}"

echo "Submitting ${#URLS[@]} URLs to IndexNow..."

# Submit to Bing IndexNow
echo "-> Bing..."
curl -s -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "${PAYLOAD}" && echo " OK" || echo " FAILED"

# Submit to Yandex IndexNow
echo "-> Yandex..."
curl -s -X POST "https://yandex.com/indexnow" \
  -H "Content-Type: application/json" \
  -d "${PAYLOAD}" && echo " OK" || echo " FAILED"

echo "Done! ${#URLS[@]} URLs submitted to IndexNow."
echo "Bing/Copilot should index within minutes."
