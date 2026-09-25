MatMatcha

MatMatcha är en webbapplikation framtagen som ett examensarbete. Målet är att hjälpa hushåll att spara tid och pengar genom att automatiskt matcha veckans aktuella butikserbjudanden (från bl.a. Willys och ICA) med skalbara recept och skräddarsydda inköpslistor.

Projektet är uppdelat i två delar:

Backend: C# .NET Core Web API

Frontend: React (Vite + Tailwind CSS)

🛠️ Förutsättningar

Innan du börjar behöver du ha följande installerat på din dator:

.NET SDK (version 8.0 eller senare)

Node.js (vilket inkluderar npm)

En valfri kodredigerare (t.ex. Visual Studio, Rider eller VS Code)

🚀 Steg-för-steg för att testa projektet

Steg 1: Klona repository

Öppna din terminal (eller Git Bash) och klona ner projektet till din dator:

git clone https://github.com/squashyGalaxys/MatMatcha.git cd MatMatcha

Steg 2: Starta C#-backenden (.NET Web API)

Du kan köra backenden antingen via din IDE (som Visual Studio eller Rider) eller direkt i terminalen.

Via terminalen:

Navigera till mappen där din API-projektfil (.csproj) ligger:
cd MatMatcha.API

Starta API:et:
dotnet run

Servern startar nu upp (vanligtvis på http://localhost:5177). Du kan testa att öppna http://localhost:5177/api/offers eller /swagger i webbläsaren för att se att den svarar.

Steg 3: Starta frontend (React)

Öppna ett nytt terminalfönster/flik och gå till din frontend-mapp från projektets rot:
cd frontend

Installera alla beroenden (första gången du kör):
npm install

Starta utvecklingsservern:
npm run dev

Klicka på länken som dyker upp i terminalen (vanligtvis http://localhost:5173) för att öppna MatMatcha i webbläsaren Klart!
