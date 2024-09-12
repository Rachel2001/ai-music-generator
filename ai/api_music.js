import { NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

const systemPrompt = `
You are a music recommendation assistant. Users provide queries about songs, artists, or genres, 
and you return the top 3 music recommendations that match.
`;

export async function POST(req) {
    const data = await req.json();

    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index('music-index').namespace('music-namespace');
    const openai = new OpenAI();

    const text = data[data.length - 1].content;
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    });

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
    });

    let resultString = '';
    results.matches.forEach((match) => {
        resultString += `
        Song: ${match.metadata.title}
        Artist: ${match.metadata.artist}
        Genre: ${match.metadata.genre}
        Release Year: ${match.metadata.release_year}
        Link: ${match.metadata.link}
        \n\n`;
    });

    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data[data.length - 1].content + resultString },
        ],
        model: 'gpt-3.5-turbo',
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
}
