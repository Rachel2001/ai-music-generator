from dotenv import load_dotenv
load_dotenv()
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
import os
import json

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Create Pinecone index for music embeddings
pc.create_index(
    name="music-index",
    dimension=1536,  # Adjust the dimension as per the embedding model
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1"),
)

# Load music data
data = json.load(open("music.json"))

processed_data = []
client = OpenAI()

# Create embeddings for each song
for song in data["songs"]:
    response = client.embeddings.create(
        input=f"{song['title']} by {song['artist']} - {song['genre']}",
        model="text-embedding-3-small"
    )
    embedding = response.data[0].embedding
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
index = pc.Index("music-index")
upsert_response = index.upsert(
    vectors=processed_data,
    namespace="music-namespace",
)
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())
