---
title: 为 WSL 编译最新内核（手稿翻译中……）
date: 2024-10-30
tags:
  - WSL
pin: false
uuid: fa183373-9ea1-4699-b8a0-0a61544ba685
---

Download latest kernel from `https://www.kernel.org/`

```bash
cd ~
wget https://cdn.kernel.org/pub/linux/kernel/<version>/linux-<version>.tar.xz
tar -xf linux-<version>.tar.xz
cd linux-<version>
```

get kernel build config for WSL

```bash
# in ~/linux-<version>
mkdir Microsoft
wget -O Microsoft/config-wsl https://raw.githubusercontent.com/microsoft/WSL2-Linux-Kernel/refs/heads/linux-msft-wsl-6.6.y/arch/x86/configs/config-wsl
```

custom version tag:

- `Makefile` : change `EXTRAVERSION`
- `Microsoft/config-wsl` : change `CONFIG_LOCALVERSION`

will be displayed as `<kernel-version>[EXTRAVERSION][CONFIG_LOCALVERSION]`

install the dependencies: `build-essential flex bison dwarves libssl-dev libelf-dev cpio bc python3`

begin compile kernel, run

```bash
# in ~/linux-<version>
make -j12 KCONFIG_CONFIG=Microsoft/config-wsl # j12 is j<number> equal to CPU logical processors

# OR: custom kernel in tui
make -j12 menuconfig KCONFIG_CONFIG=Microsoft/config-wsl

# compilation successful:
Kernel: arch/x86/boot/bzImage is ready
```

then move (or copy) `~/linux-<version>/arch/x86/boot/bzImage` to `/mnt/c/<path-to-windows-where-want-to-place>/wsl-kernel`

edit `~/.wslconfig`

```ini
[wsl2]
kernel=C:\\<path-to-kernel>\\wsl-kernel
```

finally, restart wsl and check `uname -r`
