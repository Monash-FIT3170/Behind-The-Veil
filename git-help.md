This file is for all the git issues and their resolution that I've come across before, more than welcome to add to it if you find a solution online to an issue you've had.

## Changing Branch name remotely and locally
Reference: https://stackoverflow.com/questions/30590083/git-how-to-rename-a-branch-both-local-and-remote

Rename the local branch to the new name

<code>git branch -m <old_name> <new_name></code>

Delete the old branch on remote - where <remote> is, for example, origin

<code>git push <remote> --delete <old_name></code>

Or shorter way to delete remote branch [:]

<code>git push <remote> :<old_name></code>

Prevent git from using the old name when pushing in the next step. Otherwise, git will use the old upstream name instead of <new_name>.

<code>git branch --unset-upstream <new_name></code>

Push the new branch to remote

<code>git push <remote> <new_name></code>

Reset the upstream branch for the new_name local branch

<code>git push <remote> -u <new_name></code>

## Git push errors
> error: src refspec feature/86cv1cexu-git-repo-setup does not match any \
> error: failed to push some refs to 'https://github.com/Monash-FIT3170/Behind-The-Veil.git'

This error means the branch doesn't exist in remote but does locally. To resolve this you can do a git status to see what uncommitted files you have and commit them. Do a git push and the branch should push to remote and create it for you.

## Merge Request Issues
### Git doesn't give me the option to merge into developer branch?
This means the branch you are trying to push has a detached head i.e it was never branched off the developer branch.

To resolve this go into your current working branch and run

<code> git rebase develop </code>

Resolve any conflicts that may occur and do add all changed files using 

<code> git add . </code>

or 

<code> git add filename </code> (recommended)

Finally to attach your branch back to head with all changes do

<code> git push -f </code>

**Note** if you are unsure about any of this please reach out to team members via General.






