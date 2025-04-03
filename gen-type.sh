#!/bin/bash

echo "gen-type.sh started"

export $(grep -v '^#' .env | xargs)

if [ -z "$SUPABASE_PROJECT_ID" ]
then
  echo "❌ SUPABASE_PROJECT_ID not found!"
  exit 1
fi

npx supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > types/supabase.ts

echo "gen-type.sh done"
