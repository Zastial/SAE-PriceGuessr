-- CreateTable
CREATE TABLE "User" (
    "login" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "jwt" TEXT
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guess" (
    "userLogin" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "guess" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("userLogin", "productId"),
    CONSTRAINT "Guess_userLogin_fkey" FOREIGN KEY ("userLogin") REFERENCES "User" ("login") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Guess_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
