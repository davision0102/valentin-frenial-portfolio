---
version: 1
slug: 'src-routes-index-tsx'
primary_target: 'src/routes/index.tsx'
related_targets: ['src/routes/projets/$slug.tsx']
---

# Home and project pages: Valentin Frenial portfolio

Scope: home (`/`) and project pages (`/projets/<slug>`). Visitor mode: Experience (the work leads).
Audience: recruiters / learning managers and freelance clients, arriving from LinkedIn or a CV, desktop and phone. Job: see real work in seconds, open a project, contact him.
Constraints: texts and projects from his PDF stay as they are; carousels are binding; FR/EN and dark theme kept; no "template" look, nothing "scolaire". User pin (quoted): "je veux un truc moderne, valentin il m'a dit qu'il aimait bien le mood glass comme apple".

## Direction contract

THESIS: The portfolio is an edit in progress, played on a glass editing suite: projects are clips on tracks, the playhead is the carousel, the monitor previews. Refuses the category default of big-name hero over a grid of thumbnails.

OWN-WORLD: Apple-style glass (pinned material) over an ambient backdrop made from the current project's own visual, blurred and saturated, so the whole page takes that project's colour. Frosted panels with a bright top edge, thicker blur on bigger surfaces, never glass on glass. Track colours from Apple's system palette: indigo for e-learning clips, orange for design clips, green for skills, red playhead. Geist display tight-tracked, Geist Mono tabular for timecodes only. Light ground in daylight (recruiter at a desk), dark theme kept.

STORY: The visitor sees his name and role, watches the reel advance clip by clip on the monitor, scrubs or clicks a clip to preview it, opens the project, then reaches the end credits with email and LinkedIn.

FIRST VIEWPORT: Glass header. Left: name in large tight Geist, role, pitch, "Voir mes projets" and "Me contacter". Right: the glass monitor showing the current clip's visual with its ticket (client, format, year) and timecode. Full width below: the glass timeline with ruler, V1 e-learning clips, V2 design clips, A1 skills, red playhead, transport controls (previous, play/pause, next, open). Signature interaction: the reel plays, the playhead glides with a critically damped spring, the monitor and the ambient backdrop change with each clip; any click or key takes control.

FORM: Editing timeline, position 7 of the grounded list, translated into Apple glass material per the user's pin. seed:286c6683a9cea5d4. Raises: full-strength track colours and one consistent edge line (from Menhera); every clip carries a ticket of origin (from the bazaar); project pages walk a strict numbered margin sequence (from Orizuru); hovering or selecting a clip previews it in the monitor before opening (from the darkroom); the strongest project opens the reel (from the ink basin).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
