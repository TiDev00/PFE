# PFE SONATEL
## Ceci constitue mon projet de fin d'études pour le diplome de master GLSI a l'esp

### BACKEND
Le dossier RestWebServices contient les webservices utilisés par l'application mobile ainsi que la plateforme d'administration Web.

#### Build & Run
Pour build l'application il faut:
  * Aller dans le ficher application.properties et modifier les paramètres vers la bdd et potentiellement le numéro de server
    ```
    > spring.datasource.url = jdbc:mysql://127.0.0.1:3306/sonatel_db?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
    > spring.datasource.username=root
    > spring.datasource.password=
    > spring.jpa.hibernate.ddl-auto=update
    > spring.port=8081
    ```
  * Ma bdd actuelle s'appelle sonatel_db, il faudra donc remplacer le nom dans l'url par le nom de la bdd créée si cela change
  * Une fois le serveur démarré, les tables sont automatiquement créées, il suffit donc d'ajouter un 1er user avec ses bons coordonnées 
    présents dans le LDAP en précisant son id_service (un service doit aussi être créé au moins) et en mettant son password à "NULL". 

### FRONTEND
Le dossier AppliMobile contient la partie mobile cliente de notre système.

#### Build & Run
Pour build l'application mobile il faut suivre les étapes suivantes:
  * Il faut télécharger le projet, l'extraire et en ligne de commande se placer dans le dossier AppliMobile
  * Exécuter la commande
    ```
    > npm install
    ```
  * Une fois l'installation des dépendances effectuées, éxecuter la commande 
    ```
    > ionic build
    ```
  * Le build générera un dossier www contenant notre application mobile 
  * Il faudra ajouter la plateforme de support selon la plateforme choisie entre Android ou iOS
    ```
    > ionic capacitor add android 
    ```
                ou
    ```
    > ionic capacitor add ios 
    ```
Pour run l'application il faudra:
  * Copier le dossier asset en utilisant la commande 
    ```
    > ionic capacitor copy android 
    ```
  * Enfin Ouvrir le dossier android/app généré par le build à l'aide de Android Studio attendre la configuration automatique
  * Cliquer sur Run et choisir notre terminal de déploiement
  * Une fois l'application en marche, entrer un login(matricule) présent à la fois dans notre bdd ainsi que la LDAP.
    Il faut saisir le bon password dans la LDAP et non le password "NULL" dans la bdd.
  * Commencer l'exploitation
  
PS: S'assurer que le chemin contenu dans le fichier src/environnement.ts correspond à notre chemin vers le backend avant de faire la manipulation
     
### BACKOFFICE

#### Déploiement
