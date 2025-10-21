<p align="center">
  <img src="https://raw.githubusercontent.com/yhrespon/RAIZEXMD/refs/heads/main/banner.jpg" alt="RAIZEL XMD Banner" width="90%"/>
</p>

# ⚡ RAIZEL XMD BOT ⚡
------------------------------------------------------------------------

## 📌 Description

**RAIZEL XMD**, également connu sous le nom de **DEVRAIZEL**, est un bot
WhatsApp multi-device basé sur **Baileys v5**.  
Il automatise les discussions, gère des groupes, exécute des commandes et
permet d’exploiter pleinement WhatsApp via une interface avancée.

------------------------------------------------------------------------

## 🚀 Déploiement rapide

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/yhrespon/RAIZEXMD.git
cd RAIZEXMD
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Lancer le bot

```bash
node index.js
```

> Toutes les configurations (préfixe, mode privé/public, utilisateurs sudo, etc.) sont gérées directement dans `index.js` et via les fichiers JSON :  
> - `config.json` → configuration utilisateur  
> - `mode.json` → mode public/privé  
> - `sudo.json` → liste des utilisateurs sudo

------------------------------------------------------------------------

## ☁️ Déploiement automatique via Launcher

Le **launcher** permet de cloner, mettre à jour, installer et démarrer le bot automatiquement :

### 1️⃣ Cloner le launcher

```bash
git clone https://github.com/yhrespon/RAIZEXMD-launcher.git
cd RAIZEXMD-launcher
npm install
```

### 2️⃣ Lancer le launcher

```bash
npm start
```

> Le launcher vérifie si le projet est déjà présent, met à jour automatiquement et démarre le bot RAIZEXMD.

------------------------------------------------------------------------

## 📂 Structure du projet

```
RAIZEXMD/
│── index.js           # Fichier principal
│── package.json       # Dépendances et scripts
│── /commands          # Commandes du bot (owner, menu, kick, etc.)
│── /media             # Médias sauvegardés (images, sons, vidéos)
│── /sessions          # Sessions WhatsApp
│── config.json        # Configuration utilisateur
│── mode.json          # Mode public/privé
│── sudo.json          # Liste des utilisateurs sudo
```

```
RAIZEXMD-launcher/
│── index.js           # Script de lancement automatique
│── package.json       # Dépendances et scripts
```

------------------------------------------------------------------------

## 👨‍💻 Auteur

**RAIZEL XMD / DEVRAIZEL** développé par  
[DEV-RAIZEL](https://github.com/TON_USER)

------------------------------------------------------------------------

> _Powered by RAIZEL XMD Bot_
