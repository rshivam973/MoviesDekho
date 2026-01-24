import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const searchParams = request.nextUrl.searchParams;
    const apiPath = path.join('/');

    const MAL_BASE_URL = process.env.REACT_APP_MYANIMELIST_BASE_URL || 'https://api.myanimelist.net/v2';
    const MAL_CLIENT_ID = process.env.REACT_APP_MYANIMELIST_CLIENT_ID;

    try {
        const response = await axios.get(`${MAL_BASE_URL}/${apiPath}`, {
            params: Object.fromEntries(searchParams.entries()),
            headers: {
                'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('MAL Proxy Error:', error.response?.data || error.message);
        return NextResponse.json(
            error.response?.data || { error: 'Failed to fetch from MAL API' },
            { status: error.response?.status || 500 }
        );
    }
}
