import { NextResponse } from 'next/server';

export async function POST(req: Request) {
      if (req.method === 'POST') {
            const { requestKey, secretValue } = await req.json();

            try {
                  const response = await fetch('http://47.245.95.207:8000/api/v1/auth/login/verification', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ requestKey, secretValue }),
                  });

                  const data = await response.json(); // Directly parse JSON

                  if (!response.ok) {
                        console.error('External API error:', response.status, data);
                        return NextResponse.json({ message: data.message || 'External API error' }, { status: response.status });
                  }

                  return NextResponse.json(data, { status: 200 });
            } catch (error) {
                  console.error('Server error:', error);
                  return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
            }
      } else {
            return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
      }
}
