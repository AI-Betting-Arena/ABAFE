import { authenticatedFetch } from "@/lib/api/fetchWrapper";
import { NextRequest, NextResponse } from "next/server";
import type {
  AnalysisDetailResponse,
  AnalysisDetail,
  ApiPrediction,
  ApiPredictionMatch,
} from "@/lib/types";

const BACKEND_API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!BACKEND_API_BASE) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined.");
      return NextResponse.json(
        { error: "Backend API URL is not configured." },
        { status: 500 },
      );
    }
    const { id } = await params;
    const apiUrl = `${BACKEND_API_BASE}/api/v1/predictions/${id}`;

    // Validate if ID is a number
    if (isNaN(Number(id))) {
      console.error(`Invalid analysis ID received: ${id}`);
      return NextResponse.json(
        { error: "Invalid analysis ID" },
        { status: 400 },
      );
    }

    const accessToken = request.headers.get('Authorization')?.split(' ')[1]; // Extract Bearer token

    const res = await authenticatedFetch(
      apiUrl,
      { cache: "no-store" }, // Fetch fresh data for each request
      accessToken // Pass the extracted accessToken
    );

    console.log(`Response status from backend: ${res.status}`);

    if (!res.ok) {
      // If the backend returns a 404, we forward that response
      if (res.status === 404) {
        console.warn(`Analysis with ID ${id} not found.`);
        return NextResponse.json(
          { error: "Analysis not found" },
          { status: 404 },
        );
      }
      // For other errors, we return a generic 500
      const errorText = await res.text();
      console.error(
        `Failed to fetch prediction from backend: ${res.status} - ${errorText}`,
      );
      throw new Error(
        `Failed to fetch prediction from backend: ${res.statusText}`,
      );
    }

    const apiPrediction: ApiPrediction = await res.json();

    // Manually map ApiPrediction to AnalysisDetail
    const analysis: AnalysisDetail = {
      id: apiPrediction.id.toString(),
      agentId: apiPrediction.agent.id.toString(), // Assuming AnalysisDetail expects string agentId
      agent: apiPrediction.agent, // Already typed as PredictionAgent
      match: apiPrediction.match, // Already typed as ApiPredictionMatch
      prediction: apiPrediction.prediction,
      confidence: apiPrediction.confidence,
      betAmount: apiPrediction.betAmount, // New field
      excerpt: apiPrediction.summary, // Map summary to excerpt
      timestamp: apiPrediction.createdAt, // Map createdAt to timestamp
      content: apiPrediction.content,
      keyPoints: apiPrediction.keyPoints,
      analysisStats: apiPrediction.analysisStats,
      comments: [], // Initialize as empty array as per user confirmation
      relatedAnalyses: [], // Initialize as empty array as per user confirmation
    };

    console.log("Successfully fetched analysis data:", analysis);

    const response: AnalysisDetailResponse = { analysis };

    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    console.error("Error fetching analysis detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch analysis detail" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    },
  );
}
