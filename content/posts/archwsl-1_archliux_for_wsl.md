---
title: 'ArchWSL #1 - 构建 Archlinux WSL 镜像包'
date: 2024-10-21
update: 2024-11-02
tags:
  - WSL
  - Windows
pin: true
uuid: ef57eaa4-92ef-462e-a604-8afdde36274e
related:
  - 9ad177da-4b40-4d31-a2fa-c2f910847b80
  - fa183373-9ea1-4699-b8a0-0a61544ba685
---

参考了几位大佬的文章，自己摸索出一套目前完成度比较高的方法，就此记录一番。（大佬文章详见末尾）

> 以下内容中 `<替换内容>` 尖括号为整体替换内容，如：`cd <your-path>/root-fs -> cd ~/test/root-fs` 这里用 `~/test` 替换 `<your-path>`

# 目录

- [解包 -\> 重新打包](#解包---重新打包)
  - [1. 构建前准备](#1-构建前准备)
  - [2. 解包](#2-解包)
  - [3. 初始化环境](#3-初始化环境)
  - [4. 重新打包](#4-重新打包)
- [通过 pacstrap 制作镜像包](#通过-pacstrap-制作镜像包)
  - [1. pacstrap 安装环境](#1-pacstrap-安装环境)
  - [2. 初始化环境](#2-初始化环境)
- [额外仓库支持](#额外仓库支持)
  - [lib32 仓库支持](#lib32-仓库支持)
  - [archlinuxcn 仓库支持](#archlinuxcn-仓库支持)
- [参考](#参考)

## 解包 -> 重新打包

大家通过搜索引擎搜到的大部分内容所讲的，基本是这种方式。经我几次测试，通过 `解包 -> 重新打包`，总能出现几个意料之外、却又情理之中的小问题。虽然它们大部分也能在网上搜罗到解决方案，但是这样那样的各种 hack 构建属实不够优雅。(￣_,￣ )

不过，这方法倒也不能说没用，起码它非常快速，在希望临时搭建一个 archlinux 环境应付一下，则非常好用。

### 1. 构建前准备

下载 archlinux-bootstrap.tar 官方包放入某个已存在的 WSL 实例（比如这里的 Debian）。

```bash
cd ~
# 使用你喜欢的下载工具~~
wget https://<path-to-archlinux-bootstrap-x86_64.tar.zst>
```

这里推荐清华 tuna 的镜像：`https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/archlinux-bootstrap-x86_64.tar.zst`

### 2. 解包

```bash
# 这里推荐使用 bsdtar 来保留文件属性，可以避免诸多意外
sudo bsdtar -xpf archlinux-bootstrap-x86_64.tar.zst
```

或者也可以使用自带的 tar，不过得加上参数 `--numeric-owner`，它会保留合适的 UID 和 GID，参考链接：[Install Arch Linux from existing Linux](<https://wiki.archlinux.org/title/Install_Arch_Linux_from_existing_Linux#Method_A:_Using_the_bootstrap_tarball_(recommended)>)

```bash
sudo tar -xf archlinux-bootstrap-x86_64.tar.zst --numeric-owner
```

### 3. 初始化环境

进入 arch-chroot

> 当尝试 pacman 安装程序时，可能会出现错误 `error: could not determine cachedir mount point /var/cache/pacman/pkg`
> 因此，**arch-chroot 前**可以先 `mount` 一下 `mount --bind directory-to-livecd-or-bootstrap directory-to-livecd-or-bootstrap`
>
> 例如
>
> ```bash
> sudo mount --bind root.x86_64 root.x86_64
> ```

```bash
# in ~
sudo ./root.x86_64/bin/arch-chroot root.x86_64
```

编辑 `root.x86_64/etc/pacman.d/mirrorlist` 选择合适的 mirrors，我这里选择 tuna 和 ustc 的 https 镜像源。

```bash
sed -i '/http:/d; /tuna/!{/ustc/!d}; s/^#//' /etc/pacman.d/mirrorlist
```

<!-- omit from toc -->
#### 初始化 keyring 和下载基础软件包

```bash
pacman-key --init && pacman-key --populate &&  pacman -Syy archlinux-keyring --noconfirm
pacman -Syu
pacman -S base base-devel #你需要的软件
```

<!-- omit from toc -->
#### 跟随 archlinux wiki 如同真实装机那样（这一步非必要，可以跳过）

[Archlinux Wiki guide](https://wiki.archlinux.org/title/Installation_guide#Chroot)

设置时区、语言等

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && hwclock --systohc
echo "LANG=en_GB.UTF-8" > /etc/locale.conf && sed -i '/^#\(en_GB\.UTF-8\|en_US\.UTF-8\|zh_CN\.UTF-8\)/s/^#//' /etc/locale.gen && locale-gen
```

> 我这里取消了 `en_GB.UTF-8`、`en_US.UTF-8` 和 `zh_CN.UTF-8` 的注释，使用 `en_GB.UTF-8` 作为 LANG，可以按需修改

这里需要额外链接 locale.conf 覆盖 wsl 的默认 locale，详见：[https://github.com/yuk7/ArchWSL/issues/76](https://github.com/yuk7/ArchWSL/issues/76)

```bash
ln -sf /etc/locale.conf /etc/default/locale
```

创建普通用户和配置密码

```bash
useradd -m -G wheel <user_name>
passwd root
passwd <user_name>
```

编辑 `/etc/sudoers` 取消 `%wheel  ALL=(ALL:ALL)  ALL` 行的注释，提升普通用户 `sudo` 权限，或者也可以如下设置：

```bash
echo "%wheel  ALL=(ALL:ALL)  ALL" > /etc/sudoers.d/wheel
```

> sudoers 会自动读取 `sudoers.d/*` 下的文件来覆盖自己的内容。

<!-- omit from toc -->
#### WSL 配置

最后配置 `/etc/wsl.conf`，例如我所使用的配置：

```ini
[boot]
systemd = true

[interop]
appendWindowsPath = false

[network]hostname = <your-flavour-name>-WSL-ARCH

[user]
default = <user_name> # 忽略如果你跳过了上一步没有创建普通用户，或者使用 root
```

快速配置可以执行如下命令（注意替换尖括号内容）

```bash
echo -e "[boot]\nsystemd = true\n\n[interop]\nappendWindowsPath = false\n\n[network]\nhostname = <your-flavour-name>-WSL-ARCH\n\n[user]\ndefault = <user_name>" > /etc/wsl.conf

chmod 0644 /etc/wsl.conf
```

### 4. 重新打包

使用 badtar 或者 tar（取决于你用什么解包）重新打包 archlinux 环境。

```bash
# 推荐使用 bsdtar
sudo bsdtar -cpf archlinux-bootstrap.tar -C root.x86_64 .
# 或者使用 tar
sudo tar -cf archlinux-bootstrap.tar -C root.x86_64 .

chmod 0777 archlinux-rootfs.tar
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

如果需要一个相对完整的 archlinux 环境，通过 pacstrap 是可以做到的。不过，你需要利用到前面快速解包、重新打包的镜像，或者在一个真实的 archlinux 环境中操作。

如果使用镜像操作，以 **`root`** 身份登录可以方便许多（反正没什么安全问题 😂），初始化 rootfs 镜像根目录到 `/mnt/rootfs`

```bash
mkdir -p /mnt/rootfs /mnt/rootfs.mount
mount --bind /mnt/rootfs.mount /mnt/rootfs
```

### 1. pacstrap 安装环境

需要先安装 `pacman -Sy arch-install-scripts --noconfirm` 获取 `pacstrap`

然后就像 archlinux 官方 wiki 引导 [Installation guide#Install essential packages](https://wiki.archlinux.org/title/Installation_guide#Install_essential_packages) 安装必要程序：

```bash
pacstrap -G -K -M /mnt/rootfs base base-devel zsh zsh-completions zsh-syntax-highlighting zsh-autosuggestions neovim git wget man-db man-pages openssh fd ripgrep
```

> 以上 `base` 和 `base-devel` 大概是必要的，后面那些是我自己需要的程序，可以按需增删替换

### 2. 初始化环境

和解包、重新打包大致一样的初始化过程，不过有几小处需要特别注意。

<!-- omit from toc -->
#### 设置镜像源

这里选择了 tuna 和 ustc 的 https 镜像源

```bash
sed -i '/http:/d; /tuna/!{/ustc/!d}; s/^#//' /mnt/rootfs/etc/pacman.d/mirrorlist
```

<!-- omit from toc -->
#### 配置和同步日期、时间等

```bash
ln -sf /mnt/rootfs/usr/share/zoneinfo/Asia/Shanghai /mnt/rootfs/etc/localtime
arch-chroot /mnt/rootfs bash -c "hwclock --systohc"
echo "LANG=en_GB.UTF-8" > /mnt/rootfs/etc/locale.conf
sed -i '/^#\(en_GB\.UTF-8\|en_US\.UTF-8\|zh_CN\.UTF-8\)/s/^#//' /mnt/rootfs/etc/locale.gen
arch-chroot /mnt/rootfs bash -c "locale-gen"
```

> 我这里取消了 `en_GB.UTF-8`、`en_US.UTF-8` 和 `zh_CN.UTF-8` 的注释，使用 `en_GB.UTF-8` 作为 LANG，可以按需修改

这里需要额外链接 locale.conf 覆盖 wsl 的默认 locale，详见：[https://github.com/yuk7/ArchWSL/issues/76](https://github.com/yuk7/ArchWSL/issues/76)

```bash
ln -sf /mnt/rootfs/etc/locale.conf /mnt/rootfs/etc/default/locale
```

<!-- omit from toc -->
#### 重置 `machine-id`

解决诸多小问题的一步，重中之重！！！

```bash
rm /mnt/rootfs/etc/machine-id && touch /mnt/rootfs/etc/machine-id
```

<!-- omit from toc -->
#### 初始化 keyring

```bash
arch-chroot /mnt/rootfs bash -c 'pacman-key --init && pacman-key --populate && pacman -Syy archlinux-keyring --noconfirm'
```

<!-- omit from toc -->
#### 创建普通用户和设置密码

创建用户，**注意替换用户名**

```bash
arch-chroot /mnt/rootfs bash -c "useradd -m -G wheel <user_name>"
```

设置密码，**注意替换用户名**

```bash
arch-chroot /mnt/rootfs bash -c "echo root:<root_passwd> | chpasswd"
arch-chroot /mnt/rootfs bash -c "echo <user_name>:<user_passwd> | chpasswd"
```

提升普通用户 `sudo` 权限

```bash
echo "%wheel  ALL=(ALL:ALL)  ALL" > /mnt/rootfs/etc/sudoers.d/wheel
```

> sudoers 会自动读取 `sudoers.d/*` 下的文件来覆盖自己的内容。

<!-- omit from toc -->
#### WSL 配置

配置 `/etc/wsl.conf`，例如我所使用的配置：

```ini
[boot]
systemd = true

[interop]
appendWindowsPath = false

[network]
hostname = <your-flavour-name>-WSL-ARCH

[user]
default = <user_name> # 或者使用 root
```

快速配置可以执行如下命令（注意替换尖括号内容）

```bash
# wsl configuration
echo -e "[boot]\nsystemd = true\n\n[interop]\nappendWindowsPath = false\n\n[network]\nhostname = <your-flavour-name>-WSL-ARCH\n\n[user]\ndefault = <user_name>" > /mnt/rootfs/etc/wsl.conf
chmod 0644 /mnt/rootfs/etc/wsl.conf
```

<!-- omit from toc -->
#### 清理缓存，打包

> 藏好自己，做好清理（bushi）

```bash
rm -rf /mnt/rootfs/var/cache/pacman/pkg/*

tar -cf archlinux-rootfs.tar -C /mnt/rootfs .

chmod 0777 archlinux-rootfs.tar
```

最后将镜像包移出 WSL 实例（前提：你需要挂载 Windows 分区，默认配置已经自动挂载）

```bash
mv archlinux-rootfs.tar /mnt/<path-to-windows>
```

安装镜像包

```powershell
wsl --import <自定义 disto 名，这里 ArchWSL> <期望的 WSL 实例路径> <镜像包路径>/archlinux-rootfs.tar
```

检查安装成功与否

```powershell
wsl -l -v
```

## 额外仓库支持

### lib32 仓库支持

```bash
sed -i "/^#\[multilib\]/s/^#//; /^\[multilib\]/{n;s/^#//}" /mnt/rootfs/etc/pacman.conf
```

### archlinuxcn 仓库支持

```bash
echo -e "\n[archlinuxcn]\nServer = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/\$arch" >> /mnt/rootfs/etc/pacman.conf
arch-chroot /mnt/rootfs bash -c 'pacman-key --lsign-key "farseerfc@archlinux.org"'
arch-chroot /mnt/rootfs bash -c 'pacman -Syy archlinuxcn-keyring --noconfirm'
```

## 参考

1. [WSL2 安装 ArchLinux —— In The Arch Way | 知乎@WSWS](https://zhuanlan.zhihu.com/p/613738433)
2. [Github@rayae/easy-arch-wsl](https://github.com/rayae/easy-arch-wsl)
