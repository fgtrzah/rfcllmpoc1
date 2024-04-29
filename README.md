#### Overview

This is the front end for 1) browsing RFC documents with a context menu and a ietf datatracker api proxy
2) a baseline llm driven QA platform that uses basic prompt engineering.

#### Quick start

run locally
```bash
chmod +x ./scripts/*
./scripts/start.sh
```

generating repetitive components

```bash
./scripts/genicon.sh iconname
```

lint
```bash
npm run format
```


#### Dependencies

- depends on backend counterpart which will be published once the repo is cleansed and the supply chain security is ready for production
- interim a sandboxed version of the api's openapi spec can be used to stub a proxy (tbd)

#### Example of QA

![qa](https://github.com/fgtrzah/rfcllmpoc1/blob/main/demo.gif?raw=true)

#### Example of proxy datatracker search

![search](https://github.com/fgtrzah/rfcllmpoc1/blob/main/demo-search.gif?raw=true)

#### Usual setup and local development

1. clone and run vite
2. a copy of .env should be in
   .env.example, the keys get obfuscated prior to being
   saved on disk or being susceptable to ending up
   sneaking through git cache 
3. when in doubt, rotate oai key and utilize ```git rm -r --cached .```
   which always clears up any credential related residue from working
   tree

#### Prior art

- [rfc.fyi](https://rfc.fyi)
- [datatracker](https://datatracker.ietf.org/)
- github's command palette exploration functionality
which inspired the omni-search kbd shortcut

#### Tentative roadmap + planning

- sqlite ec2 for warehousing all QA that transpires
- link github issued uid and all questions and responses asked
 by the user
- emphasis on stowing and doing so in journaled fashion for
 future use (will cross that bridge later)
- exhaustive telemetry around any instances of hallucination
  or violations of moderation rules
- since this experiment is so coupled with OpenAI, its best
 to cover all bases and not get in any smoke
- scatterplot matrix with dynamic charting ability that uses ietf dt statistics tables
as the fodder for visualization while allowing control over axes
- keyboard short cuts, statuses of rfc documents that the logged in user is actively tracking (as per the official datatracker api meta-data associated with anyone with an account of the original platform)

#### Misc Notes and Disclaimers

- this app isn't unearthing anything related to rapidly expanding sea of llm / gen ai related 
topics and research
- the sharpest edge is shadowing posts from OpenAI's own blog "OpenAI Cookbook" 
- I intentionally went this route just to see how rich the functionality can become just off of clever prompting techniques and basic systems thinking
- this repo scratches the itch to build a front-end system with a plethora of opportunities for egress and entry, cross-pollinated responses from current gen ai api offerings, and some alternative rfc exploration and discovery methods that ultimately accomplish the same thing as the original rfc editor/data-tracker tooling
- in a production / industry context its better to use something like vercel ai sdk or similar frameworks (nothing against rolling your own) but the benefits of safety and moderation aware options for something as trivial or common as chat ui workflows is a thing to consider
- *please* ensure you've trusted *and* verified via using the authoritative applications / sources that are meant to be used when reading rfcs - this isn't a redesign exercise or replacement by any means
