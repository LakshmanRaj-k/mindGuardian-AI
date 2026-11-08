"""
Rule-Based Recommendation Mapping Rules
MindGuardian AI - Blueprint 7.0
"""

from typing import Dict, Any, List, Tuple

INTERVENTION_RULES = {
    "Low": {
        "wellness_level": "Optimal Balance",
        "interventions": [
            "Maintain current healthy pace.",
            "Stay hydrated throughout your session.",
            "Continue good ergonomic posture."
        ],
        "wellness_tip": "Consistent small micro-breaks preserve long-term cognitive focus and prevent fatigue.",
        "hydration_reminder": True,
        "breathing_duration": 30,
    },
    "Moderate": {
        "wellness_level": "Needs Attention",
        "interventions": [
            "Take a 2-minute posture and screen break.",
            "Drink a glass of water.",
            "Perform a 60-second guided breathing exercise."
        ],
        "wellness_tip": "Short recovery breaks improve focus, reset working memory, and reduce mental fatigue.",
        "hydration_reminder": True,
        "breathing_duration": 60,
    },
    "High": {
        "wellness_level": "High Strain Detected",
        "interventions": [
            "Pause current task temporarily.",
            "Reduce screen glare and dim overhead lighting.",
            "Practice a 90-second deep guided breathing session.",
            "Walk or stretch for 3–5 minutes."
        ],
        "wellness_tip": "Stepping away for 3 minutes resets autonomic nervous system arousal and lowers cortisol.",
        "hydration_reminder": True,
        "breathing_duration": 90,
    },
    "Critical": {
        "wellness_level": "Severe Acute Tension",
        "interventions": [
            "Stop current work task immediately.",
            "Perform a calming box-breathing exercise.",
            "Reach out to a colleague, friend, or trusted person.",
            "If stress persists, consider consulting a qualified healthcare professional."
        ],
        "wellness_tip": "Prioritize immediate rest and physiological regulation before resuming complex tasks.",
        "hydration_reminder": True,
        "breathing_duration": 120,
    },
}

def get_recommendations_for_level(stress_level: str) -> Dict[str, Any]:
    """Returns rule-based intervention configuration for given stress level."""
    level_key = (stress_level or "Low").capitalize()
    return INTERVENTION_RULES.get(level_key, INTERVENTION_RULES["Low"])
