"""Flask application that generates rich video content ideas.

The service exposes two endpoints:
- GET /api/options returns the available option lists for the planner UI
- POST /api/ideas generates an idea based on the selected options
"""

from __future__ import annotations

import random
import textwrap
from datetime import datetime
from typing import Dict, List

from flask import Flask, jsonify, request

app = Flask(__name__)


VIDEO_THEMES: Dict[str, Dict[str, List[str]]] = {
    "education": {
        "hooks": [
            "What if learning your next skill only took five minutes?",
            "3 lessons your teacher never told you about",
            "This micro-class might change your career overnight",
        ],
        "beats": [
            "Relatable challenge learners face today",
            "Break down the topic into a visual, snackable metaphor",
            "Provide one practical exercise viewers can try immediately",
            "Wrap with a reflection question to drive comments",
        ],
        "visuals": [
            "Clean infographics with animated callouts",
            "Split-screen expert demo with captioned steps",
            "Lightweight motion graphics highlighting stats",
        ],
        "audio": [
            "Calm, upbeat background track at -18 LUFS",
            "Soft whoosh and sparkle sound design on transitions",
            "Tight voiceover pacing with 0.3s pauses between sections",
        ],
    },
    "travel": {
        "hooks": [
            "This hidden gem is only two hours from the city",
            "Stop scrolling and imagine waking up here tomorrow",
            "A weekend escape that feels like crossing continents",
        ],
        "beats": [
            "Show the travel problem you're solving (budget, time, experience)",
            "Reveal location with cinematic b-roll and map overlays",
            "Break down top three experiences with estimated costs",
            "Finish with packing or booking pro-tip viewers can screenshot",
        ],
        "visuals": [
            "Drone-inspired establishing shots with parallax text",
            "POV walking footage layered with playful stickers",
            "Texture-rich food close-ups with shallow depth-of-field",
        ],
        "audio": [
            "Rhythmic travel beat with percussion hits on cuts",
            "Nature ambience stem to fill quiet transitions",
            "Voiceover with smiley tone and crisp consonants",
        ],
    },
    "gaming": {
        "hooks": [
            "Can you beat this boss without taking any damage?",
            "The speedrun trick pros won't tell you about",
            "Build the ultimate loadout using this underrated combo",
        ],
        "beats": [
            "Kick off with an on-screen challenge countdown",
            "Reveal the strategy while replaying highlight moments",
            "Add split-second overlays for button inputs or gear stats",
            "Close with a viewer challenge and call for stitched duos",
        ],
        "visuals": [
            "HUD-inspired frames with neon accent lighting",
            "Slow-motion replays with motion blur and chromatic aberration",
            "Stylized glitch transitions between clips",
        ],
        "audio": [
            "Trap or drum-and-bass loop side-chained to commentary",
            "Layered controller clicks subtly mixed underneath",
            "Energetic delivery with emphasis on hype phrases",
        ],
    },
    "wellness": {
        "hooks": [
            "Take a 60-second reset with me",
            "Breathe in for 4, hold for 4, out for 4—ready?",
            "You only need the space beside your desk for this routine",
        ],
        "beats": [
            "Invite the viewer to pause and mirror your breathing",
            "Guide through a grounded routine with soft lower-thirds",
            "Share one science-backed insight to build credibility",
            "Encourage journaling or hydration as a follow-up micro-habit",
        ],
        "visuals": [
            "Soft gradients with floating particle animations",
            "Close-up of calm facial expressions and hand movements",
            "Minimalist typography with high legibility",
        ],
        "audio": [
            "Lo-fi piano textures with warm vinyl noise",
            "ASMR-inspired foley for tactile movements",
            "Gentle voiceover with deliberate pacing and whispered sibilants",
        ],
    },
}

PLATFORMS = {
    "youtube": {
        "name": "YouTube",
        "duration": "6-8 minutes",
        "cta": "Invite viewers to subscribe and drop their own twists in the comments",
    },
    "shorts": {
        "name": "YouTube Shorts",
        "duration": "45-60 seconds",
        "cta": "Ask for a double-tap and encourage sharing the short with a friend",
    },
    "tiktok": {
        "name": "TikTok",
        "duration": "35-50 seconds",
        "cta": "Prompt viewers to stitch their attempt and follow for part two",
    },
    "reels": {
        "name": "Instagram Reels",
        "duration": "50-75 seconds",
        "cta": "Encourage a save for later and a DM to someone who needs the reminder",
    },
}

AUDIENCE_TONES = {
    "beginner": "Keep explanations crystal clear and friendly for first-time viewers.",
    "intermediate": "Balance insights with jargon—they already know the basics.",
    "expert": "Deliver fast-paced breakdowns with data or references to stand out.",
}

CALL_TO_ACTIONS = [
    "Drop a comment with the next problem you want solved",
    "Tag a friend who needs to try this",
    "Download the free checklist linked in bio",
    "Screenshot the breakdown and build along with me",
]

PACINGS = {
    "steady": "Balanced",
    "fast": "Fast-paced",
    "calm": "Calming",
}


def build_outline(beats: List[str], duration: str) -> List[Dict[str, str]]:
    outline = []
    for index, beat in enumerate(beats, start=1):
        word_count = len(beat.split())
        estimated_seconds = max(8, int(round(word_count / 3.5)) * 2)
        outline.append(
            {
                "step": index,
                "description": beat,
                "estimated_time": f"{estimated_seconds:02d}s of the {duration} runtime",
            }
        )
    return outline


def generate_idea(payload: Dict[str, str]) -> Dict[str, object]:
    theme_key = payload.get("theme", "education")
    platform_key = payload.get("platform", "youtube")
    tone_key = payload.get("tone", "beginner")
    pacing = payload.get("pacing", "steady")

    theme = VIDEO_THEMES[theme_key]
    platform = PLATFORMS[platform_key]
    tone_hint = AUDIENCE_TONES[tone_key]

    random.seed()
    hook = random.choice(theme["hooks"])
    call_to_action = random.choice(CALL_TO_ACTIONS)

    pacing_copy = {
        "steady": "Use mid-tempo editing—clean cuts every 3–4 seconds to keep a conversational feel.",
        "fast": "Accelerate the pacing with snappy jump cuts and kinetic text for each keyword.",
        "calm": "Lean into longer holds and cross-dissolves so viewers can breathe between beats.",
    }[pacing]

    pacing_label = PACINGS[pacing]

    outline = build_outline(theme["beats"], platform["duration"])

    summary = textwrap.fill(
        (
            f"Craft a {platform['name']} piece built around the hook \"{hook}\". "
            f"Target a {tone_key} audience: {tone_hint} {pacing_copy} "
            f"Keep the runtime near {platform['duration']} and close with: {call_to_action}."
        ),
        110,
    )

    return {
        "title": hook.replace("?", "!") if "?" in hook else hook,
        "hook": hook,
        "platform": platform,
        "tone": tone_hint,
        "pacing": pacing_label,
        "summary": summary,
        "outline": outline,
        "visuals": theme["visuals"],
        "audio": theme["audio"],
        "call_to_action": call_to_action,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.route("/api/options", methods=["GET"])
def get_options():
    return jsonify(
        {
            "themes": {key: key.title() for key in VIDEO_THEMES.keys()},
            "platforms": {key: value["name"] for key, value in PLATFORMS.items()},
            "tones": {key: key.title() for key in AUDIENCE_TONES.keys()},
            "pacings": PACINGS,
        }
    )


@app.route("/api/ideas", methods=["POST", "OPTIONS"])
def post_idea():
    if request.method == "OPTIONS":
        return ("", 204)

    payload = request.get_json(silent=True) or {}

    for key in ("theme", "platform", "tone", "pacing"):
        if key in payload:
            continue
        payload[key] = {
            "theme": "education",
            "platform": "youtube",
            "tone": "beginner",
            "pacing": "steady",
        }[key]

    try:
        idea = generate_idea(payload)
    except KeyError as exc:
        return jsonify({"error": f"Unknown option: {exc.args[0]}"}), 400

    return jsonify(idea)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
