# Video Storytelling Platform Specification

This document outlines the end-to-end product requirements for a platform that transforms English or Arabic stories into studio-quality audio and video, ready for distribution on YouTube or TikTok.

## 1. Core User Journey
- **Inputs**: Paste text, upload `.txt` / `.docx` / `.pdf`, or record voice with automatic transcription.
- **Language Handling**: Auto-detect English or Arabic with manual override; support mixed-language paragraphs.
- **Script Preparation Tools**:
  - Spelling and grammar assistance.
  - Optional Arabic diacritization for improved TTS output.
  - Configurable number reading styles (e.g., "1999" pronounced as a year or an amount).
  - Profanity filtering.
  - Pronunciation overrides for names and glossary terms.
- **Voice & Style Controls**:
  - Narrator selection (gender, age, accent).
  - Emotion presets (calm, epic, dramatic).
  - Speed and pitch sliders, pause control, SSML markup support, and multi-speaker assignment.
- **Audio Rendering Pipeline**: Neural TTS → mixing → mastering with targets of -14 LUFS for YouTube and -16 to -14 LUFS for vertical shorts, ≤ -1 dBTP true-peak, plus noise gate, de-esser, and limiter.
- **Video Assembly**:
  - Template selection (kinetic text, illustrated scenes, stock footage, AI-generated imagery).
  - Aspect ratios (16:9, 9:16, 1:1) and resolutions (1080p default, optional 4K).
  - Subtitle styling, intro/outro, and logo insertion.
- **Export Options**: MP4 (H.264/AAC), separate WAV/MP3 audio, captions (SRT/VTT), thumbnail (PNG/JPEG).
- **Publishing Integrations**: One-click upload to YouTube (title, description, tags, chapters, thumbnail, privacy) and TikTok (caption, hashtags, cover frame for 9:16), with credential linking.

## 2. Audio Features (Studio-Quality Narration)
- High-end neural TTS voices for English and Arabic, with opt-in voice cloning (with consent).
- Realistic breathing and pause behaviors with per-sentence pause length controls.
- Music and SFX library that is searchable and license-safe, with automatic ducking under narration and scene-linked cues.
- Room tone insertion, tail fades, click/pop removal.
- Pronunciation editor supporting ARPAbet/IPA and per-word stress adjustments for Arabic names.
- Batch rendering support for chaptered stories.

## 3. Video Features (Professional Output)
- Genre-based templates (e.g., kids bedtime, horror, sci-fi, romance, inspirational, religious).
- Scene engine that auto-splits by paragraph; each scene includes background media, text overlays, camera motion, and transitions.
- Asset options:
  - **Stock**: Curated, safe library with script keyword search.
  - **AI Images**: Per-scene generation with style presets, safety filters, and prompt history.
  - **Uploads**: User-supplied assets with auto-cropping for aspect ratios.
- Subtitle support: Burned-in and sidecar captions, karaoke-style highlighting, bilingual tracks.
- Branding toolkit: Watermark, logo bug, brand colors, fonts, reusable kits.
- Thumbnail maker with bold text, subject cutouts, and rule-of-thirds guides.

## 4. Platform-Ready Outputs (YouTube & TikTok)
- Presets:
  - **YouTube**: 16:9, 24/30/60 fps, ~12–16 Mbps at 1080p, -14 LUFS, auto-generated chapters, end screen assets.
  - **TikTok/Shorts**: 9:16, 30/60 fps, ~6–8 Mbps at 1080p vertical, safe text margins, auto captions, hook-first layout.
- Metadata editor for titles, descriptions, tags/hashtags, chapter timestamps, and audience flags (e.g., "made for kids").
- Policy helpers: Copyright checks, content suitability checklist.

## 5. Editor & User Experience
- Hybrid timeline + storyboard editor for scene arrangement, music trimming, and subtitle timing.
- Inline preview using fast, low-resolution proxies with high-quality final passes.
- Versioning and history management to compare takes (e.g., voice A vs voice B).
- Autosave, drafts, keyboard shortcuts, dark mode, RTL support for Arabic.
- Project templates (e.g., "60-sec TikTok story", "10-min YouTube narration").

## 6. Quality & Compliance
- Automated QC checklist covering loudness, peaks, missing assets, subtitle coverage, spelling, and safe margins.
- Accessibility features: Closed captions, dyslexia-friendly fonts, color-contrast-safe palettes.
- Legal compliance: License registry with attribution storage, GDPR-style data management, clear consent for voice cloning.
- Kid-safe mode with COPPA-aware settings when targeting children’s stories.

## 7. Integrations (Build vs Buy)
- Pluggable TTS providers (Azure, Google, AWS, ElevenLabs, etc.) with per-voice cost estimates.
- Accurate ASR with diarization for recorded inputs.
- Stock media provider abstraction with license filters.
- YouTube/TikTok upload APIs with OAuth, status tracking, error handling, and rate limit management.
- Payment integrations (Stripe, Apple Pay, Google Pay) supporting credit-based rendering and subscriptions.

## 8. Rendering Pipeline (Technical Overview)
- Microservice workflow: Orchestrator → per-scene TTS workers → audio post (mixing, normalization, limiting) → visual compositor → FFmpeg mux/encode.
- Scalability considerations: Queueing (Redis/RabbitMQ), autoscaled GPU/CPU workers, resumable jobs, idempotent stages.
- Storage strategy: Object storage for source, intermediate, and final assets with lifecycle policies and signed URLs.
- Observability: Stage-level logs, render timings, failure reporting, progress indicators with ETA.
- Caching for repeated voice lines and image prompts.

## 9. Data Model (High-Level)
- **Users**: Profiles, OAuth links, usage limits, roles.
- **Projects**: Title, language, brand kit, template, status.
- **Scenes**: Text, timing, voice selection, assets, transitions.
- **Assets**: Type, license, source, checksum.
- **Renders**: Settings (ratio, fps, bitrate, loudness), outputs, QC report.
- **Billing**: Credit ledger, invoices, provider costs.

## 10. Performance & Security
- Client optimizations: WebAssembly previews (ffmpeg.wasm), resumable uploads, edge caching.
- Security controls: OAuth, MFA, role-based access, rate limits, signed webhooks, content moderation.
- Reliability: Cross-region backups, disaster recovery, job replay mechanisms.

## 11. Analytics & Growth
- Project analytics: Render counts, time saved, cost per minute, voice popularity.
- Publishing assistance: Title/hashtag suggestions, hook performance heatmaps, A/B thumbnail testing.
- Post-publish insights: Fetch basic YouTube/TikTok metrics, "remix for Shorts" workflows.

## 12. Pricing & Governance
- Tiered plans: Free (watermark, low bitrate), Pro (1080p, watermark-free), Studio (4K, teams, brand kits), EDU/Non-profit discounts.
- Fair-use safeguards against copyrighted uploads and DMCA handling.
- Audit trail recording asset usage and user activity.

## 13. MVP vs Phase 2 Roadmap
- **MVP Focus**:
  - Text input with language detection.
  - 2–3 premium voices (EN/AR) with basic SSML support.
  - Three video templates (16:9, 9:16), stock image search, burned-in subtitles.
  - Loudness normalization, export presets, YouTube/TikTok upload, simple thumbnailing.
  - Timeline editor, drafts, versioning, Stripe-powered credits.
- **Phase 2 Enhancements**:
  - Voice cloning, AI scene art generation, karaoke subtitles, automated chaptering, brand kits.
  - Collaboration features (comments, share links), batch rendering, analytics, A/B testing for thumbnails.
  - Advanced QC automation, real-time previews, multi-language dubbing.

## 14. Suggested Tech Stack
- **Frontend**: React + Next.js (SSR), Tailwind CSS, ffmpeg.wasm for previews, RTL support.
- **Backend**: Node.js/TypeScript or Python (FastAPI), message queues, FFmpeg worker fleet, scalable functions for burst handling.
- **Data Layer**: PostgreSQL, Redis (queue/cache), S3-compatible object storage.
- **Infrastructure**: Terraform-managed cloud resources, CI/CD pipelines, secrets management, usage metering.

