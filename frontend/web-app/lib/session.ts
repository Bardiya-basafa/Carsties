// lib/session.ts
import { auth } from '@/auth'

export async function getServerSession() {
  return await auth()
}