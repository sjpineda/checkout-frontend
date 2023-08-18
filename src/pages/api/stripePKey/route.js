import { NextResponse } from 'next/server'

export async function GET(request, response) {
  NextResponse.json({ hello: 'world' })
}
