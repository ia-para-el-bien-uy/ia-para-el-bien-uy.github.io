#!/usr/bin/env bash
# Repo-local opengrep runner. One command, same in git-bash, WSL and CI.
#
#   bash scripts/scan.sh                     # all rules, prints findings, always exit 0
#   bash scripts/scan.sh --severity ERROR --error   # CI gate: fails on ERROR findings only
#
# Extra args are passed straight to `opengrep scan`. Handy ones:
#   --json -o out.json        machine-readable results
#   --dataflow-traces         show taint paths
#   --verbose                 list files skipped by .semgrepignore
#
# Override the binary with OPENGREP_BIN=/path/to/opengrep if it is not on PATH.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

OPENGREP_BIN="${OPENGREP_BIN:-opengrep}"
RULESET="${RULESET:-.opengrep/rules.yaml}"

if ! command -v "$OPENGREP_BIN" >/dev/null 2>&1; then
  printf 'opengrep not found (set OPENGREP_BIN=/path/to/opengrep)\n' >&2
  printf 'install: see docs/OPENGREP.md\n' >&2
  exit 127
fi

args=("$@")

# The Windows binary is a native exe: an MSYS path like /c/tmp/og.json is not
# translated for it, and `-o` then silently writes nothing. Rewrite the output
# path to the mixed C:/... form before handing it over.
if [ -n "${MSYSTEM:-}" ] && command -v cygpath >/dev/null 2>&1; then
  for i in "${!args[@]}"; do
    case "${args[$i]}" in
      -o|--output)
        n=$((i + 1))
        [ -n "${args[$n]:-}" ] && args[$n]="$(cygpath -m "${args[$n]}")"
        ;;
      -o=*|--output=*) args[$i]="${args[$i]%%=*}=$(cygpath -m "${args[$i]#*=}")" ;;
    esac
  done
fi

exec "$OPENGREP_BIN" scan -f "$RULESET" --no-rewrite-rule-ids "${args[@]}" .
