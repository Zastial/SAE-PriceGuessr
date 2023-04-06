# ProductGuessr

## Description du projet

La SAE S4 s’est déroulée pendant les semaines S12 à S14. L’objectif est de construire une application reposant sur des micro-services, disposant d’un client 
Android natif et d’un client Web. Les données utilisées doivent provenir de plusieurs sources externes, à savoir des API ou fichiers CSV.

Notre application nommée PriceGuessr est inspirée du jeu GuessTheGame disponible sur navigateur et dont le but est de deviner le nom d’un jeu à partir de 
plusieurs images. Nous nous sommes inspirés de ce concept et l’avons transposé aux produits vendus par l’enseigne IKEA. Ainsi, les joueurs sont invités à 
deviner le prix des produits à partir de leur nom et de leur image. Il convient de noter que l’application est alimentée tous les jours avec 10 nouveaux 
produits. De plus, les joueurs n’ont que 5 essais pour trouver le prix du produit et des indications après chacune des tentatives (est-ce que le prix correct 
est supérieur ou inférieur au prix rentré). L’utilisateur a également la possibilité de consulter l’intégralité des produits (titre, description, image, prix, 
disponibilité). Bien entendu, le prix est affiché uniquement lorsque le produit n’est pas dans la liste du jour, ou lorsque l’utilisateur l’a trouvé. Enfin, il 
est possible d’obtenir la disponibilité de ces produits dans les différents magasins IKEA de France et leur localisation.

Pour permettre son bon fonctionnement, l’application dispose d’un système d’authentification incluant, la connexion, l’inscription, la modification de mot de 
passe ainsi que la suppression de compte. INGKA Holding B.V. est un groupe possédant 367 magasins IKEA sur les 422 existants à la date du 5 avril 2023. Nos 
données proviennent directement de l’API Ingka qui met notamment à disposition la liste des magasins, les articles en stock et leurs informations.

## Technologies

Cet API a été créé en NodeJS avec le framework Hapi, ainsi que les librairies joi et hapi-auth-jwt2.

Hapi-auth-jwt2 sert à authentifier les utilisateurs avec des Json Web Token (JWT), qui permettent de signer un jeton que les utilisateurs donnent à chaque 
requête. Une vérification se fait ensuite au niveau du serveur. Cela permet de vérifier l’identité de la personne et qu’elle n’essaie pas de passer pour 
quelqu’un d’autre. La structure du token permet de vérifier que son contenu n’a pas été modifié.

Voici un schéma de son fonctionnement:
![](./img/jwt.png)

Ainsi qu'une description plus détaillée:
![](./img/Diagramme jwt.png)

Deux sources de données sont utilisées:
- Un script Python qui permet de récupérer et traiter nos données depuis Ikea, avec le module ikea-api
- Une api Javascript, qui fonctionne avec Ingka pour obtenir la disponibilité des produits dans les magasins Ikea du monde entier.

Les clients reposent sur des micro-services:
- Client Android natif : kotlin
- Client Web : ReactJS

## Déploiement

Pour cloner ce projet directement avec l'application Android: `git clone --recurse-submodules https://gitlab.univ-nantes.fr/sea4-eq_03_01/eq_03_01-App.git`

Ou, si le projet était déjà cloné de manière normale, pour obtenir l'application Android, exécuter `git submodule update --init --recursive` dans le dossier du git.

Pour mettre à jour le projet à la dernière version:
```
git pull
git submodule update --recursive
```
