
from openai import OpenAI
from config import Config


client = OpenAI(
    api_key=Config.OPENAI_KEY
)

class AdRating():
  
  message = [{"role": "system","content": "You are an assitant to explain the probability of text being a clickbait ad. Conversations outside of topic strictly forbidden"}]
  def Ad_rate(request, MaxToken=500, message=message):
    message.append(
      {"role": "user", "content": "Number only as an answer, text absolutely forbidden. Rate from 1 to 10 that the ad is clickbait: '"+request+"'"})
    
    request_1 = client.chat.completions.create(
    model="gpt-3.5-turbo",
    max_tokens=MaxToken,
    messages=[{"role": m["role"], "content": m["content"]} for m in message]
    )

    rating = request_1.choices[0].message.content
    message.append({"role": request_1.choices[0].message.role, "content": rating})
    message.append({"role": "user", "content": "Explain in 15 words per sentence, 3 sentences maximum, the reasoning behind the rating you gave"})

    request_2 = client.chat.completions.create(
    model="gpt-3.5-turbo",
    max_tokens=MaxToken,
    messages=[{"role": m["role"], "content": m["content"]} for m in message]
    )

    response = request_2.choices[0].message.content


    return rating, response