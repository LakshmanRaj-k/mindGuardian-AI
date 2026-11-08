"""
High-Precision Adaptive Wellness Intervention Engine (AWIE)
MindGuardian AI - Blueprint 7.0 (Precision Upgrade)

Analyzes specific active contributing factors from face and voice sensors
to generate tailored, highly specific wellness interventions and dynamic breathing durations.
"""

from typing import Dict, Any, List
from models.recommendation.recommendation_rules import get_recommendations_for_level


def generate_adaptive_intervention(
    stress_level: str = "Low",
    risk_score: int = 0,
    confidence: float = 0.0,
    contributing_factors: List[str] = None
) -> Dict[str, Any]:
    """
    Main entry point for generating personalized, signal-driven wellness interventions.
    
    Args:
        stress_level: "Low", "Moderate", "High", or "Critical"
        risk_score: 0 to 100
        confidence: Combined confidence percentage
        contributing_factors: Traceable factors from Blueprint 6
        
    Returns:
        Dict matching RecommendationResponse schema.
    """
    base_config = get_recommendations_for_level(stress_level)
    factors = contributing_factors or []
    
    # ── 1. Tailored Interventions Based on Active Biomarker Drivers ───────────
    custom_interventions: List[str] = []
    
    # Check for facial strain markers
    has_facial_strain = any("facial" in f.lower() or "valence" in f.lower() or "affect" in f.lower() for f in factors)
    # Check for vocal tension markers
    has_vocal_tension = any("vocal" in f.lower() or "pitch" in f.lower() or "energy" in f.lower() for f in factors)

    if has_facial_strain and has_vocal_tension:
        custom_interventions.append("Perform a 2-minute dual recovery break: unclamp jaw & relax facial muscles.")
        custom_interventions.append("Sip water to soothe vocal cord tension and hydrate.")
        custom_interventions.append("Follow the guided 4-4-4 biofeedback respiration cycle below.")
    elif has_facial_strain:
        custom_interventions.append("Release facial tension: drop your shoulders and unclamp your jaw.")
        custom_interventions.append("Palming exercise: cover your eyes with warm palms for 30 seconds to ease eye strain.")
        custom_interventions.append("Maintain relaxed facial posture and reduce screen brightness.")
    elif has_vocal_tension:
        custom_interventions.append("Take a sip of water to ease vocal tract dryness and pitch strain.")
        custom_interventions.append("Speak in a relaxed, slow tempo to lower acoustic vocal exertion.")
        custom_interventions.append("Perform slow diaphragmatic breathing to stabilize vocal resonance.")
    else:
        custom_interventions = list(base_config["interventions"])

    # Fallback if custom list is short
    if len(custom_interventions) < 2:
        custom_interventions.extend(base_config["interventions"])
        custom_interventions = list(dict.fromkeys(custom_interventions))[:3]

    # ── 2. Dynamic Breathing Duration Based on Continuous Risk Score ──────────
    # Dynamically scale duration from 30s to 120s based on numerical risk score
    dynamic_breathing = int(max(30, min(120, round(risk_score * 1.2))))
    # Round to nearest 15 seconds for clean UX
    dynamic_breathing = max(30, (dynamic_breathing // 15) * 15)

    # ── 3. Tailored Wellness Tip ──────────────────────────────────────────────
    if risk_score > 60:
        tip = "High physiological arousal detected. Stepping away for 3 minutes resets autonomic nervous system balance."
    elif risk_score > 35:
        tip = "Moderate strain detected. Short recovery breaks improve working memory and reduce mental fatigue."
    else:
        tip = "Optimal balance. Micro-breaks throughout the day maintain consistent focus and long-term stamina."

    return {
        "wellness_level": base_config["wellness_level"],
        "interventions": custom_interventions,
        "wellness_tip": tip,
        "hydration_reminder": True,
        "breathing_duration": dynamic_breathing,
        "message": "Precision adaptive intervention generated successfully.",
        "error": None
    }
