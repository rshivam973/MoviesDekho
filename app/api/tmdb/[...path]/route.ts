import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const searchParams = request.nextUrl.searchParams;
    const apiPath = path.join('/');
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

    const fullUrl = `${TMDB_BASE_URL}/${apiPath}`;

    try {
        const response = await axios.get(fullUrl, {
            params: Object.fromEntries(searchParams.entries()),
            headers: {
                'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
                'accept': 'application/json',
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('[TMDB Proxy] Error:', error.response?.data || error.message);
        return NextResponse.json(
            {
                error: 'Failed to fetch from TMDB API',
                details: error.response?.data || error.message,
                requestedUrl: fullUrl,
                tokenPresent: !!TMDB_ACCESS_TOKEN
            },
            { status: error.response?.status || 500 }
        );
    }
}
