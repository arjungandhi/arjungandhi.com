default:
    @just --list

# Build the site
build:
    hugo --minify

# Serve locally with live reload
dev:
    hugo serve

# Build and check for errors (no output written)
test:
    hugo --minify --dryRun
