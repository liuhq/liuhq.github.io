---
title: 'ArchWSL #2 - 配置 WSLg'
date: 2024-08-18
update: 2024-10-31
tags:
  - WSL
pin: false
uuid: 9ad177da-4b40-4d31-a2fa-c2f910847b80
---

## 配置 WSLg

### wayland

put `wsl-wayland-socket.service` on `/etc/systemd/user/`

```ini
[Unit]
Description=Symlink WSLg wayland socket(user) to XDG runtime dir

[Service]
Type=oneshot
ExecStart=ln -sf /mnt/wslg/runtime-dir/wayland-0      $XDG_RUNTIME_DIR
ExecStart=ln -sf /mnt/wslg/runtime-dir/wayland-0.lock $XDG_RUNTIME_DIR

[Install]
WantedBy=default.target
```

then enable service

```bash
systemctl --user enable wsl-wayland-socket
```

### X11

put `wsl-x11-socket.service` on `/etc/systemd/system/`

```ini
[Unit]
Description=Bind WSLg X11 socket to /tmp

[Service]
Type=oneshot
ExecStart=mount -o bind,ro,X-mount.mkdir -t none /mnt/wslg/.X11-unix /tmp/.X11-unix

[Install]
WantedBy=default.target
```

then enable service

```bash
systemctl enable wsl-x11-socket
```

