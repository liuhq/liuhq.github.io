---
title: 构建 Archlinux WSL 镜像包（手稿翻译中……）
date: 2024-10-30
tags:
  - WSL
pin: true
uuid: ef57eaa4-92ef-462e-a604-8afdde36274e
---

参考了几位大佬的文章，自己摸索出一套目前完成度比较高的方法。（大佬文章详见末尾）

> 以下内容中 `<替换内容>` 尖括号为整体替换内容，如：`cd <your-path>/root-fs -> cd ~/test/root-fs` 这里用 `~/test` 替换 `<your-path>`

## 解包 -> 重新打包

大家通过搜索引擎搜到的大部分内容所讲的，基本是这种方式。经我几次测试，通过 `解包 -> 重新打包`，总能出现几个意料之外、却又情理之中的小问题。虽然它们大部分也能在网上搜罗到解决方案，但是这样那样的各种 hack 构建属实不够优雅。

不过，这方法倒也不能说没用，起码它非常快速，在希望临时搭建一个 archlinux 环境应付一下，则非常好用。

### 构建前准备

下载 archlinux-bootstrap.tar 官方包放入某个已存在的 WSL 实例（比如这里的 Debian）。

```bash
cd ~
# 使用你喜欢的下载工具~~
wget https://<path-to-archlinux-bootstrap-x86_64.tar.zst>
```

这里推荐清华 tuna 的镜像：`https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/archlinux-bootstrap-x86_64.tar.zst`

### 解包

```bash
# 这里推荐使用 bsdtar 来保留文件属性，可以避免诸多意外
sudo bsdtar -xpf archlinux-bootstrap-x86_64.tar.zst
```

或者也可以使用自带的 tar，不过得加上参数 `--numeric-owner`，它会保留合适的 UID 和 GID，参考链接：[Install Arch Linux from existing Linux](https://wiki.archlinux.org/title/Install_Arch_Linux_from_existing_Linux#Method_A:_Using_the_bootstrap_tarball_(recommended))

```bash
sudo tar -xf archlinux-bootstrap-x86_64.tar.zst --numeric-owner
```

### 初始化环境

进入 arch-chroot

```bash
# in ~
sudo ./root.x86_64/bin/arch-chroot root.x86_64
```

> 当尝试 pacman 安装程序时，可能会出现错误 `error: could not determine cachedir mount point /var/cache/pacman/pkg`
> 因此，**arch-chroot 前**可以先 `mount` 一下 `mount --bind directory-to-livecd-or-bootstrap directory-to-livecd-or-bootstrap`
>
> 例如
>
> ```bash
> sudo mount --bind root.x86_64 root.x86_64
> ```

编辑 `root.x86_64/etc/pacman.d/mirrorlist` 选择合适的 mirrors，我这里选择 tuna 和 ustc 的 https 镜像源。

```bash
sed -i '/http:/d; /tuna/!{/ustc/!d}; s/^#//' /etc/pacman.d/mirrorlist
```

#### 初始化 keyring 和下载基础软件包

```bash
pacman-key --init && pacman-key --populate &&  pacman -Syy archlinux-keyring --noconfirm
pacman -Syu
pacman -S base base-devel #你需要的软件
```

#### 跟随 archlinux wiki 如同真实装机那样

[Archlinux Wiki guide](https://wiki.archlinux.org/title/Installation_guide#Chroot)

设置时区、语言等

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && hwclock --systohc
echo "LANG=en_GB.UTF-8" > /etc/locale.conf && sed -i '/^#\(en_GB\.UTF-8\|en_US\.UTF-8\|zh_CN\.UTF-8\)/s/^#//' /etc/locale.gen && locale-gen
```

这里需要额外链接 locale.conf 覆盖 wsl 的默认 locale，详见：[https://github.com/yuk7/ArchWSL/issues/76](https://github.com/yuk7/ArchWSL/issues/76)

``` bash
ln -sf /etc/locale.conf /etc/default/locale
```

创建普通用户

```bash
useradd -m -G wheel <user_name>
```

编辑 `/etc/sudoers` 取消 `%wheel  ALL=(ALL:ALL)  ALL` 行的注释，提升普通用户 `sudo` 权限，或者也可以如下设置：

```bash
echo "%wheel  ALL=(ALL:ALL)  ALL" > /etc/sudoers.d/wheel
```

> sudoers 会自动读取 `sudoers.d/*` 下的文件来覆盖自己的内容。

最后配置 `/etc/wsl.conf`，例如我所使用的配置：

```bash
echo -e "[boot]\nsystemd = true\n\n[interop]\nappendWindowsPath = false\n\n[network]\nhostname = <your-flavour-name>-WSL-ARCH\n\n[user]\ndefault = <user_name>" > /etc/wsl.conf
```

### 重新打包（就是这么的简单粗暴）

使用 badtar 或者 tar（取决于你用什么解包）重新打包 archlinux 环境。

```bash
# 推荐使用 bsdtar
sudo bsdtar -cpf archlinux-bootstrap.tar -C root.x86_64 .
# 或者使用 tar
sudo tar -cf archlinux-bootstrap.tar -C root.x86_64 .
```

最后将镜像包移出 WSL 实例（前提：你需要挂载 Windows 分区，默认配置已经自动挂载）

```bash
mv archlinux-bootstrap.tar /mnt/<path-to-windows>
```

安装镜像包

```powershell
wsl --import <自定义 disto 名，这里 ArchWSL> <期望的 WSL 实例路径> <镜像包路径>/archlinux-bootstrap.tar
```

检查安装成功与否

```powershell
wsl -l -v
```

## 通过 pacstrap 制作镜像包

login in **`root`**, then start initializing rootfs (path -> `/mnt/rootfs`)

```bash
mkdir -p /mnt/rootfs /mnt/rootfs.mount
mount --bind /mnt/rootfs.mount /mnt/rootfs

pacstrap -G -K -M /mnt/rootfs base base-devel zsh zsh-completions zsh-syntax-highlighting zsh-autosuggestions neovim git wget man-db man-pages openssh fd ripgrep

# only keep tuna and ustc sources
sed -i '/http:/d; /tuna/!{/ustc/!d}; s/^#//' /mnt/rootfs/etc/pacman.d/mirrorlist

# set locale
ln -sf /mnt/rootfs/usr/share/zoneinfo/Asia/Shanghai /mnt/rootfs/etc/localtime
arch-chroot /mnt/rootfs bash -c "hwclock --systohc"
echo "LANG=en_GB.UTF-8" > /mnt/rootfs/etc/locale.conf
sed -i '/^#\(en_GB\.UTF-8\|en_US\.UTF-8\|zh_CN\.UTF-8\)/s/^#//' /mnt/rootfs/etc/locale.gen
arch-chroot /mnt/rootfs bash -c "locale-gen"
# set locale with wsl. see: https://github.com/yuk7/ArchWSL/issues/76
ln -sf /mnt/rootfs/etc/locale.conf /mnt/rootfs/etc/default/locale

rm /mnt/rootfs/etc/machine-id && touch /mnt/rootfs/etc/machine-id

arch-chroot /mnt/rootfs bash -c 'pacman-key --init && pacman-key --populate && pacman -Syy && pacman -S archlinux-keyring --noconfirm'

# wsl configuration
echo -e "[boot]\nsystemd = true\n\n[interop]\nappendWindowsPath = false\n\n[network]\nhostname = HORA-WSL-ARCH\n\n[user]\ndefault = horace" > /mnt/rootfs/etc/wsl.conf
chmod 0644 /mnt/rootfs/etc/wsl.conf

# add normal user and set passwd both root and normal user
arch-chroot /mnt/rootfs bash -c "useradd -m -G wheel <user_name>"
arch-chroot /mnt/rootfs bash -c "echo root:<root_passwd> | chpasswd"
arch-chroot /mnt/rootfs bash -c "echo <user_name>:<user_passwd> | chpasswd"
echo "%wheel  ALL=(ALL:ALL)  ALL" > /mnt/rootfs/etc/sudoers.d/wheel

rm -rf /mnt/rootfs/var/cache/pacman/pkg/*

tar -cf archlinux-rootfs.tar -C /mnt/rootfs .
chmod 0777 archlinux-rootfs.tar
```

### open `wayland` support

```bash
echo -e "[Unit]\nDescription=Symlink WSLg wayland socket(user) to XDG runtime dir\n\n[Service]\nType=oneshot\nExecStart=ln -sf /mnt/wslg/runtime-dir/wayland-0      $XDG_RUNTIME_DIR\nExecStart=ln -sf /mnt/wslg/runtime-dir/wayland-0.lock $XDG_RUNTIME_DIR\n\n[Install]\nWantedBy=default.target" > /mnt/rootfs/etc/systemd/user/wsl-wayland-socket.service
arch-chroot /mnt/rootfs bash -c "systemctl --user enable wsl-wayland-socket"
```

### lib32 and archlinuxcn repo support

```bash
# enable lib32
sed -i "/^#\[multilib\]/s/^#//; /^\[multilib\]/{n;s/^#//}" /mnt/rootfs/etc/pacman.conf
# enable archlinuxcn repo
echo -e "\n[archlinuxcn]\nServer = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/\$arch" >> /mnt/rootfs/etc/pacman.conf
arch-chroot /mnt/rootfs bash -c 'pacman-key --lsign-key "farseerfc@archlinux.org"'
arch-chroot /mnt/rootfs bash -c 'pacman -Syy archlinuxcn-keyring --noconfirm'
```

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
