import { NextResponse } from 'next/server';
import { generateCropPlan } from '@/lib/agent';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const crop = searchParams.get('crop') || 'paddy';
    const location = searchParams.get('location') || 'coimbatore';
    const startDate = searchParams.get('startDate') || Date.now();
    
    const plan = await generateCropPlan(crop, location, new Date(startDate));
    return NextResponse.json({ success: true, plan }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate plan' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { crop, location, startDate } = body;
    
    const plan = await generateCropPlan(crop, location, new Date(startDate || Date.now()));
    
    return NextResponse.json({ success: true, plan }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate plan' }, { status: 500, headers: corsHeaders });
  }
}
