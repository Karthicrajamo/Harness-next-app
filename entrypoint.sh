#!/usr/bin/env bash
set -e

APP_DIR=/Harness-next-app
GIT_REPO=${GIT_REPO:-}
GIT_BRANCH=${GIT_BRANCH:-main}

echo "⚙️  GIT_REPO not set — using local mounted code at $(pwd)"
echo "⚙️  GIT_REPO not set — using local mounted code atdf $(tree .)"

if [ -z "$GIT_REPO" ]; then
  echo "⚙️  GIT_REPO not set — using local mounted code at $GIT_REPO"
else
  if [ -d ".git" ]; then
    echo "🔄 Updating repo..."
    # cd $APP_DIR
    # git fetch --all || true
    # git reset --hard origin/$GIT_BRANCH || true
  else
    echo "📥 Cloning $GIT_REPO (branch: $GIT_BRANCH) into $APP_DIR"
    git clone --depth 1 --branch $GIT_BRANCH "$GIT_REPO" "$APP_DIR"
  fi
fi


# cd $APP_DIR
# if [ -f package-lock.json ]; then
#   echo "📦 Installing dependencies with npm ci..."
#   npm ci
# else
  echo "📦 Installing dependencies with npm install..."
  npm install
# fi

echo "🚀 Starting Next.js dev server..."
exec npm run dev
