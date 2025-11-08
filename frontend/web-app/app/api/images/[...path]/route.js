// app/api/images/[...path]/route.js
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request, { params }) {
  try {
    const filePath = params.path.join('/')
    const fullPath = path.join(process.cwd(), 'public', 'uploads', filePath)
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const fileBuffer = fs.readFileSync(fullPath)
    const extension = path.extname(filePath).toLowerCase()
    
    const contentTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    }
    
    const contentType = contentTypes[extension] || 'application/octet-stream'

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}