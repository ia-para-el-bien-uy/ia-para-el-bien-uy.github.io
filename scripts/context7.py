#!/usr/bin/env python3
"""Single source of truth for the Context7 Ask snippets.

Run from anywhere: python scripts/context7.py
Regenerates the marked blocks in the two real pages and in llms.txt.
The site itself stays build-less: generated files are committed.
"""

from pathlib import Path
from urllib.parse import parse_qs, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://iaparaelbien.org"
ASK_URL = "https://context7.com/api/v2/ask?siteKey=ask_b1bd943202d5e59a5a562503"
SITE_KEY = parse_qs(urlsplit(ASK_URL).query)["siteKey"][0]

HTML_QUERY = ASK_URL + "&amp;query=&lt;URL-encoded question&gt;"
MD_QUERY = ASK_URL + "&query=<URL-encoded question>"


def marked(kind: str, body: str) -> str:
    return f"<!-- context7:{kind}:begin -->\n{body}\n<!-- context7:{kind}:end -->"


HEAD = marked(
    "meta", f'<meta name="context7-site-verification" content="{SITE_KEY}">'
)
def note_block(attrs: str) -> str:
    return marked(
        "note",
        f'<blockquote data-context7-ask="true" aria-hidden="true"{attrs}>\n'
        "  <h2>Search</h2>\n"
        f"  <p>Page index: {SITE}/llms.txt.</p>\n"
        f"  <p>This site has a search endpoint: {HTML_QUERY}. It returns documentation "
        "that answers the question, with a source link for each part. No API key is "
        "needed. If nothing matches, it says so.</p>\n"
        "</blockquote>",
    )


# The chaish pages ship style.css, so class="sr-only" hides the note there.
# The root redirect stub loads no CSS, so it needs the attribute hide instead.
BODY = note_block(' class="sr-only"')
ROOT_BODY = note_block(" hidden")
LLMS = marked(
    "llms",
    "## Search\n\n"
    f"This site has a search endpoint: {MD_QUERY}. It returns documentation "
    "that answers the question, with a source link for each part. No API key is "
    "needed. If nothing matches, it says so.\n",
)


def inject(path: Path, block: str, kind: str, anchor: str, before: bool) -> None:
    """Insert the block at anchor once, then keep that marked block in sync."""
    begin, end = f"<!-- context7:{kind}:begin -->", f"<!-- context7:{kind}:end -->"
    text = path.read_text(encoding="utf-8")
    if begin in text:
        pre, rest = text.split(begin, 1)
        _, post = rest.split(end, 1)
        text = pre + block + post
    elif anchor in text:
        text = text.replace(
            anchor, block + "\n" + anchor if before else anchor + "\n" + block, 1
        )
    else:
        raise SystemExit(f"anchor {anchor!r} missing in {path}")
    path.write_text(text, encoding="utf-8")
    print(f"wrote {path.relative_to(ROOT)} ({kind})")


for page in ("chaish/index.html", "chaish/memoria-abierta/index.html"):
    inject(ROOT / page, HEAD, "meta", "</head>", before=True)
    inject(ROOT / page, BODY, "note", "<body>", before=False)

# The apex root is the URL registered in Context7, so the verifier loads it first:
# it needs both snippets even though the page only exists to redirect.
inject(ROOT / "index.html", HEAD, "meta", "</head>", before=True)
inject(ROOT / "index.html", ROOT_BODY, "note", "<body>", before=False)

inject(ROOT / "llms.txt", LLMS, "llms", "## Sitio canónico", before=True)
