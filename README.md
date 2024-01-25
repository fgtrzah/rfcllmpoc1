#### Overview

This is the front end for 1) browsing RFC documents with a context menu and a ietf datatracker api proxy
2) a baseline llm driven QA platform that uses basic prompt engineering.

#### Development

- depends on backend counterpart which isn't finished clearing vulnerability scans

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
3. when in doubt, rotate oai key and hit up ```git rm -r --cached .```
   which always clears up any credential type artifacts from working
   tree

Tentative roadmap + misc planning

Chat data persistence and authorization
- sqlite ec2 for warehousing all QA that transpires
  - link github issued uid and all questions and responses asked
    by the user
  - emphasis on stowing and doing so in journaled fashion for
    future use (will cross that bridge later)
- exhaustive telemetry around any instances of hallucination
  or violations of moderation rules
  - since this experiment is so coupled with OpenAI, its best
    to cover all bases and not get in any smoke
