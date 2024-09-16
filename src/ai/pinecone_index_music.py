from dotenv import load_dotenv
load_dotenv()

import pinecone  # Import the pinecone module
import openai    # Import the openai module
import os
import json

# Initialize Pinecone
pinecone.init(api_key=os.getenv("PINECONE_API_KEY"))

# Create Pinecone index for music embeddings
pinecone.create_index(
    name="music-index",
    dimension=1536,  # Adjust the dimension as per the embedding model
    metric="cosine",
    pod_type="p1"  # Use the appropriate pod_type, ServerlessSpec is not required for basic usage
)

# Load music data
data = json.load(open("music.json"))

processed_data = []
openai.api_key = os.getenv("OPENAI_API_KEY")  # Set OpenAI API key

# Create embeddings for each song
for song in data["songs"]:
    response = openai.Embedding.create(
        input=f"{song['title']} by {song['artist']} - {song['genre']}",
        model="text-embedding-ada-002"  # Use an appropriate OpenAI embedding model
    )
    embedding = response['data'][0]['embedding']
    processed_data.append(
        {
            "values": embedding,
            "id": song["id"],
            "metadata": {
                "title": song["title"],
                "artist": song["artist"],
                "genre": song["genre"],
                "release_year": song["release_year"],
                "link": song.get("link", ""),
            }
        }
    )

# Insert the embeddings into the Pinecone index
index = pinecone.Index("music-index")
upsert_response = index.upsert(
    vectors=processed_data,
    namespace="music-namespace",
)
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())
