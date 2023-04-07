# ProductGuessr

## Déploiement

Pour cloner ce projet directement avec l'application Android:
```
git clone --recurse-submodules https://gitlab.univ-nantes.fr/pub/but/but2/sae4-real-01/eq_init_03_01_aji-emerik_carol-alexandre_michenaud-mathis_painter-louis.git
```
Ou, si le projet était déjà cloné de manière normale, pour obtenir l'application Android, exécuter `git submodule update --init --recursive --remote --merge` dans le dossier du git.

Pour mettre à jour le projet à la dernière version:
```
git pull
git submodule update --recursive --remote --merge
```
Il faut installer les dépendances des projets javascript, dans api/ avec `npm install`; Pour utiliser le script python, il faut également installer le module nécessaire avec `pip install ikea-api`.

## Utilisation

Pour mettre à jour le cache qui contient les produits Ikea, utiliser le script python `ikea.py` dans ce même dossier:
```
cd api/dao/data/
python3 ikea.py
```

Pour remplir la base de données avec les produits du jour, il faut exécuter le script `api/dao/data/startPopulate.mjs`, qui va prendre 10 produits aléatoires de ce cache:
```
cd api/dao/data/
node startPopulate.mjs
```

Un fichier api/.env est nécessaire au bon fonctionnement du serveur. Ce fichier est fourni dans le git, mais selon le type de machine sur laquelle le serveur sera déployé, il faudra changer l'entrée `USE_IUT_PROXY`.

Si le serveur est déployé sur une machine de l'IUT, utiliser `USE_IUT_PROXY = true`.
Sinon, utiliser `USE_IUT_PROXY = false`.

Pour démarrer le serveur, utiliser la commande `npm start` dans le dossier api/

L'application peut être démarrée depuis Android Studio, à partir du dossier projet `eq_03_01-App`. Les dépendances devraient être automatiquement prises en charge par Gradle.

## Détails application

Après avoir créé un compte et s'être connecté, ou en utilisant un compte existant, le jeu devient accessible.

La page principale est la page du jeu; Il devrait normalement y avoir une image du produit, mais l'accès aux images fournies par notre API est impossible dû au proxy de l'IUT. Le jeu peut fonctionner normalement si il est accédé en dehors de ce réseau.

Sur cette page, accessible à tout moment en appuyant sur le bouton de page principale à gauche de la barre de navigation, un utilisateur peut essayer de deviner le prix des produits.

Le bouton du milieu permet d'accéder à l'historique des produits; Le prix pour les produits du jour ne s'affichent que si l'utilisateur les a deviné. Sinon, il doit attendre le landemain.

Enfin, le troisième bouton, à gauche, mène à la page de compte, qui permet à l'utilisateur de changer son mot de passe ou supprimer son compte.
