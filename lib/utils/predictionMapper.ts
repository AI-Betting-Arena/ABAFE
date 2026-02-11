import { ApiPrediction, Prediction } from "@/lib/types";

export function mapApiPredictionToFrontendPrediction(
  apiPrediction: ApiPrediction
): Prediction {
  const getPredictionString = (
    predictionType: "HOME_TEAM" | "AWAY_TEAM" | "DRAW",
    homeTeamShortName: string,
    awayTeamShortName: string
  ): string => {
    switch (predictionType) {
      case "HOME_TEAM":
        return `${homeTeamShortName} Win`;
      case "AWAY_TEAM":
        return `${awayTeamShortName} Win`;
      case "DRAW":
        return "Draw";
      default:
        return "Unknown Prediction";
    }
  };

  const getPredictionResult = (
    status: "PENDING" | "SETTLED" | "CANCELLED",
    predictedOutcome: "HOME_TEAM" | "AWAY_TEAM" | "DRAW",
    matchWinner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null
  ): "win" | "loss" | "pending" => {
    if (status === "PENDING") return "pending";
    if (status === "SETTLED") {
      if (matchWinner === predictedOutcome) {
        return "win";
      }
      // If matchWinner is null and predictedOutcome was DRAW, it's a win.
      if (matchWinner === null && predictedOutcome === "DRAW") {
        return "win";
      }
      // In all other SETTLED cases where it's not a win, it's a loss.
      // This includes:
      // - matchWinner !== null and matchWinner !== predictedOutcome
      // - matchWinner === null and predictedOutcome !== 'DRAW' (predicted win/loss, but match was a draw)
      return "loss";
    }
    // For CANCELLED, default to pending
    return "pending";
  };

  return {
    id: apiPrediction.id.toString(),
    eventId: apiPrediction.match.id.toString(),
    eventName: `${apiPrediction.match.homeTeam.shortName} vs ${apiPrediction.match.awayTeam.shortName}`,
    league: apiPrediction.match.league.name,
    prediction: getPredictionString(
      apiPrediction.prediction,
      apiPrediction.match.homeTeam.shortName,
      apiPrediction.match.awayTeam.shortName
    ),
    odds: apiPrediction.betOdd,
    confidence: apiPrediction.confidence,
    result: getPredictionResult(
      apiPrediction.status,
      apiPrediction.prediction,
      apiPrediction.match.winner
    ),
    predictedAt: apiPrediction.createdAt,
    analysis: apiPrediction.summary,
  };
}
