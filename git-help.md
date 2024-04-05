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