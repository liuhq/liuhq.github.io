---
title: 'Windows 配置 GnuPG'
date: 2024-11-10
# update:
tags:
  - Windows
pin: false
uuid: 3fab6750-711f-4c30-9286-a635a0492ae8
# related:
#   -
---

## Configure SSH (Auth agent)

### Configure the following files 👇

`gpg.conf`

```conf
use-agent
```

`gpg-agent.conf`

```conf
# open ssh support
enable-win32-openssh-support
use-standard-socket

# default-cache-ttl 3600
# max-cache-ttl 3600

## allow use cli pinentry
# gpg --pinentry-mode loopback <do-something>
allow-loopback-pinentry
```

`sshcontrol`

```
gpg -k --with-keygrip
```

1. must use unix-end line `\n`
2. should have a new-line character at the end **if it contain just a single keygrip**

### Configure the environment variable 👇

`SSH_AUTH_SOCK="\\.\pipe\openssh-ssh-agent`

### Configure startup

create a shortcut from `<path>\gnupg\bin\gpg-connect-agent.exe` and put it into `C:\Users\<user>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`

Note:
- the shortcut target must add `/bye` at the end, such as `"<path>\gnupg\bin\gpg-connect-agent.exe" /bye`
- set `Run` to use `Minimized`

### Test

run `ssh-add -L` and `ssh -T git@github.com`

## Configure git (Sign Commit)

`gpg.conf`

```conf
use-agent
```

git config

```ini
[user]
	signingkey = <key-id>
[commit]
	gpgsign = true
[gpg]
	program = <path>\\gnupg\\bin\\gpg.exe # indicate your gpg program path
```
