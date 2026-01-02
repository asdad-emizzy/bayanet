# Contributing to Bayanet

Thanks for contributing! A few housekeeping notes before you start.

## Important: repository history rewrite

We recently performed a forced history rewrite on the `main` branch to remove accidentally committed large files (for example, `node_modules` and other big blobs). Because of the rewrite, the repository history on `origin/main` does not match older local clones.

If you have a local clone or branches based on the old history, follow one of the recovery options below.

### Recommended (clean start)
This is the safest and simplest option for most contributors.

1. Backup any uncommitted work or local branches you want to keep (e.g., create patches or a bundle):

   ```bash
   git diff > ../my-uncommitted-changes.patch
   git bundle create ../my-branches.bundle --all
   ```

2. Remove your local copy and re-clone the repo:

   ```bash
   cd $(mktemp -d)
   git clone https://github.com/asdad-emizzy/bayanet.git
   cd bayanet
   ```

3. Re-apply any saved patches or cherry-pick commits from your backups.

### Advanced: preserve local branches and rebase onto new main
Use this if you have local branches with work that hasn't been pushed anywhere remote and you'd prefer to keep them.

1. Ensure you have backups (recommended):

   ```bash
   git bundle create ../my-branches.bundle --all
   ```

2. Fetch the rewritten remote and reset your local `main` to match it:

   ```bash
   git fetch origin
   git checkout main
   git reset --hard origin/main
   ```

3. For each local branch you want to preserve, rebase it onto the new `main`:

   ```bash
   git checkout my-feature-branch
   git rebase --onto origin/main <old-main-commit> my-feature-branch
   # resolve conflicts, then
   git checkout main
   git merge --ff-only my-feature-branch || git push --force-with-lease origin my-feature-branch
   ```

   If you're unsure about the exact old-main-commit reference, create a patch from your branch and reapply it on top of the new main:

   ```bash
   git format-patch origin/main..my-feature-branch
   git am <patch-file>
   ```

### If you accidentally pushed to the rewritten history
If you pushed commits to origin that no longer exist in the rewritten remote, coordinate with the repository owner before force-pushing anything. The owner may request patches or provide a recovery plan.

## General contribution guidelines
- Fork the repo, make changes in a feature branch, open a pull request against `main`.
- Run linters and tests locally before opening PRs.
- Keep changes small and focused.

Thanks — and reach out if you need help recovering a local branch.
