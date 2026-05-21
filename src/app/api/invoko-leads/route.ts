import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Force dynamic rendering — never cache this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbPath = path.resolve(process.cwd(), 'invoko_leads.db');
    const db = new Database(dbPath, { readonly: true });
    
    const leads = db.prepare('SELECT * FROM leads WHERE processed = 0 ORDER BY created_at DESC, score DESC').all();
    
    db.close();
    
    return NextResponse.json(leads);
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
