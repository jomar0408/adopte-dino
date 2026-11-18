# 🦖 Adopte un dinosaure

Jeu web (PWA) où l'on adopte un œuf de dinosaure, qu'on fait éclore, puis qu'on élève jusqu'à l'âge adulte avant de le faire combattre dans l'arène.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | Le jeu complet (HTML, CSS et JavaScript) |
| `manifest.json` | Nom, couleurs et icônes de l'application installée |
| `sw.js` | Service worker : permet de jouer hors ligne |
| `icons/` | Icônes 192 px, 512 px et « maskable » pour Android |

La partie est enregistrée dans le navigateur du joueur (localStorage).

## Tester en local

Un service worker ne fonctionne pas en ouvrant le fichier par double-clic (`file://`). Lance un petit serveur dans ce dossier :

```
cd D:\projets_Git\adopte-dino
python -m http.server 8000
```

Puis ouvre http://localhost:8000 dans Chrome.

## Publier sur GitHub Pages

1. Sur GitHub, crée un dépôt public nommé `adopte-dino` (sans README).
2. Dans ce dossier :
   ```
   cd D:\projets_Git\adopte-dino
   git init
   git add .
   git commit -m "Première version de la PWA Adopte un dinosaure"
   git branch -M main
   git remote add origin https://github.com/TON-COMPTE/adopte-dino.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → main / (root) → Save**.
4. Après une minute, le jeu est en ligne sur `https://TON-COMPTE.github.io/adopte-dino/`.

## Installer sur le téléphone

Ouvre l'adresse dans Chrome sur Android, puis menu ⋮ → **Ajouter à l'écran d'accueil** (ou « Installer l'application »).

## Mettre à jour le jeu

Après avoir modifié `index.html`, change la version dans `sw.js` (`adopte-dino-v1` → `adopte-dino-v2`), puis `git add .`, `git commit` et `git push`. Sans ça, les téléphones peuvent garder l'ancienne version en cache.
