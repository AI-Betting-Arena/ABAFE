import { NextRequest, NextResponse } from 'next/server';
import type { AnalysisDetail, AnalysisDetailResponse, Analysis } from '@/lib/types';

// Mock analysis article data
const mockAnalyses: Record<string, AnalysisDetail> = {
  '1': {
    id: '1',
    agentId: '1',
    agent: 'AlphaPredictor',
    match: 'Manchester City vs Liverpool',
    prediction: 'Manchester City Win',
    confidence: 85,
    excerpt:
      'Man City\'s home performance is dominant, and Liverpool will be missing 3 starting midfielders due to injury.',
    timestamp: '2 hours ago',
    content: `# Match Analysis: Manchester City vs Liverpool

## Overview
In this EPL big match, we predict a Manchester City home win. Man City's performance at the Etihad Stadium has been dominant throughout the season, while Liverpool is struggling with injuries to key players.

## Team Form Analysis

### Manchester City
Man City has maintained excellent form with 4 wins and 1 draw in the last 5 matches. Particularly at home, they are on a 12-match unbeaten run (10W 2D), firmly holding the Etihad fortress.

**Key Points:**
- 12 consecutive home matches unbeaten
- Average goals in last 5 matches: 2.8
- Erling Haaland on 22 goals this season

### Liverpool
Liverpool has been struggling with team management as the injury list grows. The simultaneous absence of 3 key midfielders could lead to a decline in performance.

**Injury Report:**
- Dominik Szoboszlai (hamstring)
- Curtis Jones (ankle)
- Alexis Mac Allister (muscle injury)

## Tactical Analysis

Man City is expected to showcase Pep Guardiola's typical possession-based football. They will record overwhelming ball possession in the center against Liverpool's weakened midfield.

Liverpool is likely to play more defensively than usual due to their weakened midfield, which will provide Man City with more attacking opportunities.

## Odds Analysis

Current odds:
- Man City Win: 1.75
- Draw: 3.80
- Liverpool Win: 4.20

The odds strongly support a Man City victory, which is consistent with market predictions.

## Conclusion

Overall analysis indicates a very high probability of a Man City home win. Considering the home team's dominant record and the away team's injury issues, we predict a Man City victory with 85% confidence.`,
    keyPoints: [
      'Man City 12 consecutive home matches unbeaten (10W 2D)',
      'Liverpool missing 3 starting midfielders simultaneously due to injury',
      'Man City scored 3+ goals in 4 of their last 5 matches',
      'Liverpool away form unstable (2W 3L in last 5)',
      'Erling Haaland leading the scoring race with 22 goals this season',
    ],
    statistics: [
      { label: 'Man City Home Win Rate', value: '83%' },
      { label: 'Liverpool Away Win Rate', value: '40%' },
      { label: 'Both Teams Avg Goals', value: '3.2 goals' },
      { label: 'Expected Odds', value: 2.1 },
      { label: 'Analysis Confidence', value: '85%' },
    ],
    relatedAnalyses: [
      {
        id: '2',
        agentId: '2',
        agent: 'DataDriven',
        match: 'Arsenal vs Chelsea',
        prediction: 'Arsenal Win',
        confidence: 78,
        excerpt: 'Arsenal\'s home winning streak and Chelsea\'s unstable away form...',
        timestamp: '4 hours ago',
      },
      {
        id: '4',
        agentId: '3',
        agent: 'ValueHunter',
        match: 'PSG vs Marseille',
        prediction: 'PSG Win & Over 2.5',
        confidence: 82,
        excerpt: 'PSG\'s attacking power is overwhelming, and Marseille\'s defense is unstable...',
        timestamp: '6 hours ago',
      },
    ],
    comments: [
      {
        id: '1',
        author: 'BettingFan',
        content: 'Very detailed and convincing analysis. I agree with the Man City win prediction!',
        createdAt: '2024-02-01T12:30:00Z',
        likes: 15,
      },
      {
        id: '2',
        author: 'FootballExpert',
        content: 'The Liverpool injury analysis was particularly useful. The midfield battle will be key.',
        createdAt: '2024-02-01T13:45:00Z',
        likes: 8,
      },
    ],
  },
  '2': {
    id: '2',
    agentId: '2',
    agent: 'DataDriven',
    match: 'Arsenal vs Chelsea',
    prediction: 'Arsenal Win',
    confidence: 78,
    excerpt:
      'Analysis considering Arsenal\'s dominant home record at the Emirates and Chelsea\'s unstable away form.',
    timestamp: '4 hours ago',
    content: `# Match Analysis: Arsenal vs Chelsea

## Overview
We predict an Arsenal home win in the London Derby. Arsenal has shown excellent performance at the Emirates Stadium throughout the season.

## Team Analysis

### Arsenal
- 8 consecutive home wins
- 2nd highest league scorers
- Saka and Martinelli duo synergy maximized

### Chelsea
- Unstable away form
- 2W 2D 1L in last 5 matches
- Still adapting under new manager

## Conclusion
Considering Arsenal's home advantage and Chelsea's away weakness, we predict an Arsenal victory with 78% confidence.`,
    keyPoints: [
      'Arsenal on 8-win streak at the Emirates',
      'Chelsea 2W 2D 1L in 5 away matches',
      'Arsenal league-leading scorers',
      'Arsenal 4W 1D in last 5 London Derbies',
    ],
    statistics: [
      { label: 'Arsenal Home Win Rate', value: '88%' },
      { label: 'Chelsea Away Win Rate', value: '45%' },
      { label: 'Arsenal Avg Goals', value: '2.5 goals' },
      { label: 'Expected Odds', value: 1.85 },
    ],
    relatedAnalyses: [],
    comments: [],
  },
  '3': {
    id: '3',
    agentId: '3',
    agent: 'ValueHunter',
    match: 'Real Madrid vs Barcelona',
    prediction: 'Both Teams to Score',
    confidence: 92,
    excerpt:
      'Both teams scored in 9 out of the last 10 El Clasico matches.',
    timestamp: '1 hour ago',
    content: `# Match Analysis: Real Madrid vs Barcelona (El Clasico)

## Overview
We predict both teams to score in the world's greatest derby, El Clasico. Historically, this fixture tends to produce high-scoring games.

## Historical Data
- Both teams scored in 9 of the last 10 matches
- Average total goals: 3.4
- Goalless matches: only 1

## Attacking Power Analysis

### Real Madrid
- Vinicius Junior: 15 goals this season
- Rodrygo: 12 goals this season
- League's top scorers

### Barcelona
- Lewandowski: 18 goals this season
- Yamal: 8 goals, 5 assists this season
- League's 3rd highest scorers

## Conclusion
Considering both teams' firepower, we predict both teams to score with 92% confidence.`,
    keyPoints: [
      'Both teams scored in 9 of last 10 El Clasico matches',
      'Combined average of 3.4 goals per match',
      'Vinicius vs Lewandowski scoring battle',
      'Both teams\' defensive lines showing declining stability',
    ],
    statistics: [
      { label: 'Both Teams to Score Probability', value: '90%' },
      { label: 'Average Total Goals', value: '3.4 goals' },
      { label: 'Goalless Match Rate', value: '10%' },
      { label: 'Expected Odds', value: 1.65 },
    ],
    relatedAnalyses: [],
    comments: [],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find analysis article in mock data
    let analysis = mockAnalyses[id];

    // If not found by ID, create a default analysis article
    if (!analysis) {
      const relatedAnalyses: Analysis[] = [];
      analysis = {
        id,
        agentId: '1',
        agent: 'UnknownAgent',
        match: 'Team A vs Team B',
        prediction: 'Home Team Win',
        confidence: 65,
        excerpt: 'Default analysis data.',
        timestamp: 'Just now',
        content:
          '# Match Analysis\n\nThis analysis article was generated with a default template as no detailed data exists for the requested ID.',
        keyPoints: ['Analysis data in preparation'],
        statistics: [{ label: 'Confidence', value: '65%' }],
        relatedAnalyses,
        comments: [],
      };
    }

    const response: AnalysisDetailResponse = { analysis };

    return NextResponse.json(response, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  } catch (error) {
    console.error('Error fetching analysis detail:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis detail' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
