### This file is for all the git issues and their resolution that I've come across before, more than welcome to add to it if you find a solution online to an issue you've had.
## Rebasing 
Referenc: https://git-scm.com/book/en/v2/Git-Branching-Rebasing

✅ Step by Step video: https://youtu.be/RGtwxYqkkas?si=nvmMetHWNMegc0v_&t=129 (This guy does it all in his main terminal but i recommend using the IDE terminal so you can see your conflict files)

> **When to use rebasing:** When a new ticket has been merged to develop and your branch is not up to date with the develop branch
> 
> **Why do we rebase?** We want to limit the amount of merge conflicts happening in develop so we put all new changes from develop into our own branchs so we can resolve merge conflicts remotely instead of on develop.
> 
> **_! IMPORTANT !_** We will be prioritising develop branch over yours, so if a merge conflict occurs in develop, it will be rolled back and your changes will be lost, so please make sure you rebase!

### Steps to rebase

#### Step 1: Stage and Commit your current changes in your local branch. Remember 
```console
git add <filename>
```
or
```console
git add .
```
then
```console
git commit -m "your message"
```

#### Step 2: Push local changes to your remote branch
```console
git push
```

#### Step 3: checkout the develop branch
```console
git checkout develop
```

#### Step 4: pull all recent changes from remote develop to your local develop branch
```console
git pull
```

#### Step 5: Go back to your working remote branch and rebase
```console
git checkout <your working branch>
```

```console
git rebase develop
```
### Rebasing Merge conflicts
When rebasing you may run into merge conflicts. In this scenario, your terminal will say something like this:
```console
error: could not apply fa39187... something to add to patch A

When you have resolved this problem, run "git rebase --continue".
If you prefer to skip this patch, run "git rebase --skip" instead.
To check out the original branch and stop rebasing, run "git rebase --abort".
Could not apply fa39187f3c3dfd2ab5faa38ac01cf3de7ce2e841... Change fake file
```
This occurs because one or more of your files is going to be overwritten from the rebase. 
Your terminal will tell you which files are having a conflict. However you can also do cmd/ctrl + shift + f and search '<<<<<<< HEAD'.

A merge conflict typically looked like this:
```javascript
<<<<<<< HEAD
    /**
    * This comment is from your working branch
    */
=======
    /**
    * This comment is from the rebase and it going to overwrite your working branch comment
    */
>>>>>>> feature/some-feature-branch-from-develop
```
The way to resolve this is to select from the middle '=====' and either delete everything above it or below it. Make sure you delete the remaining >>> or <<< as well.

Once your resolve the conflict in the file remember to stage your changes
```console
git add <changed filename>
```

then continue rebasing to see if any other files need to be resolved:
```console
git rebase --continue
```

⚠️ **! IMPORTANT !** ⚠️Sometimes your rebase will ask you to write a commit message. If this occurs. Simply press cmd/ctrl + X to get out of message writing mode and continue rebasing.

✅ **You will know your rebase was successful if your terminal says rebased successfully.**

If everything in your branch is working to your expectations and you are happy with you current branch then do
git push -f

Keep in mind git force push will rewrite your remote branch with everything in local regardless of merge conflicts. This is not a bad thing if you are happy with everything on your local and need your remote to match!
----

## Changing Branch name remotely and locally
Reference: https://stackoverflow.com/questions/30590083/git-how-to-rename-a-branch-both-local-and-remote

Rename the local branch to the new name
```console
git branch -m <old_name> <new_name>
```

Delete the old branch on remote - where <remote> is, for example, origin
```console
git push <remote> --delete <old_name>
```

Or shorter way to delete remote branch [:]
```console
git push <remote> :<old_name>
```

Prevent git from using the old name when pushing in the next step. Otherwise, git will use the old upstream name instead of <new_name>.
```console
git branch --unset-upstream <new_name>
```

Push the new branch to remote
```console
git push <remote> <new_name>
```

Reset the upstream branch for the new_name local branch
```console
git push <remote> -u <new_name>
```

## Git push errors
> error: src refspec feature/86cv1cexu-git-repo-setup does not match any \
> error: failed to push some refs to 'https://github.com/Monash-FIT3170/Behind-The-Veil.git'

This error means the branch doesn't exist in remote but does locally. To resolve this you can do a git status to see what uncommitted files you have and commit them. Do a git push and the branch should push to remote and create it for you.

---

## Merge Request Issues
### Git doesn't give me the option to merge into developer branch?
This means the branch you are trying to push has a detached head i.e it was never branched off the developer branch.

To resolve this go into your current working branch and run
```console
git rebase develop
```

Resolve any conflicts that may occur and do add all changed files using 
```console
git add <filename> # recommended
```
or 
```console
git add . # not recommended unless you are confident you want ALL files staged
```

Finally to attach your branch back to head with all changes do

```console
git push -f
```

**Note** if you are unsure about any of this please reach out to team members via General.






