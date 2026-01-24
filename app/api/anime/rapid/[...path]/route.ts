import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const searchParams = request.nextUrl.searchParams;
    const apiPath = path.join('/');

    const ANIME_BASE_URL = 'https://myanimelist.p.rapidapi.com';
    const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

    try {
        const response = await axios.get(`${ANIME_BASE_URL}/${apiPath}`, {
            params: Object.fromEntries(searchParams.entries()),
            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('RapidAPI Proxy Error:', error.response?.data || error.message);
        return NextResponse.json(
            error.response?.data || { error: 'Failed to fetch from RapidAPI' },
            { status: error.response?.status || 500 }
        );
    }
}
