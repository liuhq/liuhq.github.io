---
title: 'ArchWSL #2 - 配置 WSLg'
date: 2024-10-28
update: 2024-11-03
tags:
  - WSL
  - Windows
pin: false
uuid: 9ad177da-4b40-4d31-a2fa-c2f910847b80
related:
  - ef57eaa4-92ef-462e-a604-8afdde36274e
  - fa183373-9ea1-4699-b8a0-0a61544ba685
---

# 目录

- [配置 WSLg](#配置-wslg)
  - [启用 wayland 支持](#启用-wayland-支持)
  - [启用 X11 支持](#启用-x11-支持)

## 配置 WSLg

### 启用 wayland 支持

将 `wsl-wayland-socket.service` 文件放入 `/etc/systemd/user/`，文件内容如下：

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

启用服务

```bash
systemctl --user enable wsl-wayland-socket
```

### 启用 X11 支持

将 `wsl-x11-socket.service` 文件放入 `/etc/systemd/system/`，文件内容如下：

```ini
[Unit]
Description=Bind WSLg X11 socket to /tmp

[Service]
Type=oneshot
ExecStart=mount -o bind,ro,X-mount.mkdir -t none /mnt/wslg/.X11-unix /tmp/.X11-unix

[Install]
WantedBy=default.target
```

启用服务

```bash
systemctl enable wsl-x11-socket
```

---

详细来源：[https://github.com/rayae/easy-arch-wsl/tree/main/systemd](https://github.com/rayae/easy-arch-wsl/tree/main/systemd)
