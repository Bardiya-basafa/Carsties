// app/actions/auctionActions.ts
'use server'

import {writeFile, mkdir} from 'fs/promises'
import path from 'path'
import {v4 as uuidv4} from 'uuid'

export async function saveFile(imageFile: any) {
    try {

        // If there's an image file, save it to public directory
        if (imageFile) {
            // Generate unique filename
            const fileExtension = imageFile.name.split('.').pop()
            const uniqueFileName = `auction-${uuidv4()}.${fileExtension}`

            // Convert file to buffer
            const bytes = await imageFile.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Define public uploads directory
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

            // Create uploads directory if it doesn't exist
            await mkdir(uploadsDir, {recursive: true})

            // Save file to public/uploads
            const filePath = path.join(uploadsDir, uniqueFileName)
            await writeFile(filePath, buffer)

            // Update imageUrl with the actual stored file path
            const imageUrl = `/uploads/${uniqueFileName}`
            return imageUrl;
        }


    } catch (error) {
        console.error('Create auction error:', error)
        return {error: 'Failed to create auction'}
    }
}