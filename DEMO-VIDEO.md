# ClubPulse Devpost video

Open `/#demo-video` for an autoplaying 89-second silent product walkthrough.
Play, Pause, Replay, and Exit are available. Use `/#demo-video?recording=true`
to hide playback controls. Append `&autoplay=false` to wait for Play when capturing.

The route embeds the existing app, not screenshots or a parallel product implementation.
It uses the real demo chart, tooltips, inspector, meeting history, driver analysis,
Ask ClubPulse answer, computed recommendation, and planner. The recommended format
is applied using the existing Plan This Meeting behavior. The final product segment
shows import choices and the direct-entry form. Intro/outro and captions contain no
hardcoded analytical metrics. Demo frames use ephemeral meeting/plan storage and
never read or write the user's saved records. Normal product motion preferences remain intact.

## Local capture

Run `node server.mjs`. Set `PLAYWRIGHT_MODULE` to an installed Playwright module path
and `FFMPEG_PATH` to an installed trusted FFmpeg executable. Installed Chrome is used
with a fresh headless browser profile; no personal browser profile is captured.

- `node scripts/demo-video-capture.cjs` — complete playback, checkpoints, controls and route checks.
- `node scripts/demo-video-regression.cjs` — entry persistence, CSV upload, chart tooltip,
  inspector, Ask ClubPulse, planner, Sheets link, video privacy and exit checks.
- `node scripts/demo-video-capture.cjs --record` — records actual webpage viewport frames
  and pipes them to FFmpeg; 1080p H.264/yuv420p MP4, 30fps output, silent, fast-start enabled.
- `node scripts/check-build.mjs` — syntax/import/asset checks and 79 unit tests.

Video, checkpoint screenshots, QA reports, and encoder logs are under `outputs/demo-video/`
(ignored by Git). The capture used the standard imageio-ffmpeg 0.6.0 PyPI wheel in the
local output tools directory, not a system installation. Runtime module and binary paths
are supplied through environment variables and are not shipped to production.

Validated full playback repeatedly, including the complete recorded pass. Final encoded
duration: 89.93 seconds, 1920×1080, H.264, no audio. Full-file decoding passed.
No lint or TypeScript/typecheck command is configured in this static JavaScript project;
the build check parses every JavaScript module and verifies its local imports.

The final copy is placed into the Windows Pictures known folder resolved with
`[Environment]::GetFolderPath('MyPictures')`, under `Clubpulse/ClubPulse_AI_Devpost_Demo.mp4`.
Source and destination SHA-256 hashes are checked after copying.
