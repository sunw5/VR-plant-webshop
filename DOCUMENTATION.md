## **1. Az alkalmazás célja**

Az alkalmazás feladata, hogy a Növénykereskedés webshop adminisztrátori felületének adatait nyilvántartsa és kezelje.

## **2. Az alkalmazás telepítése**

- Forkolni kell az adott GitHub repository tartalmát:

    https://github.com/sunw5/vizsgaremek

- A célgépre le kell klónozni az adott GitHub repository tartalmát.

   `git clone https://github.com/sunw5/vizsgaremek.git`

- Telepíteni kell az alkalmazás függőségeit:

    - Backend

        - A terminálon be kell lépni a /backend mappába és futtatni az `npm i` parancsot.
    
    - Frontend

        - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.  

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.
- A terminálban ki kell adni az `ng build` parancsot.
- A /frontend/dist/vizsgaremek mappa tartalmát be kell másolni a /backend/public mappába.

VAGY

- A terminálon be kell lépni a /backend mappába és futtatni az `npm run build` parancsot.

## **3. Az alkalmazás konfigurálása**

A /frontend/src/environments mappában be kell állítani az API végpont elérési útvonalát: 

  - _environment.ts_ állomány: http://localhost:3000/  
  - _environment.prod.ts_ állomány: http://localhost:3000/ 

## **4. Az alkalmazás indítása**

A megadott Docker container indítása és inicializálása:

- El kell indítani a Docker Desktop alkalmazást.
- A /backend mappába belépve a terminálban ki kell adni az `npm run dev` parancsot.  
(Ha szükséges, a /frontend mappába belépve a terminálban az `npm start` paranccsal indítható a frontend.) 

_Megjegyzés_:  
A belépéshez és teszteléshez érvényes e-mail-cím és jelszó páros (példa):  

E-mail | Jelszó | (Hozzáférési szint)
------------ | ------------- | -------------
johndoe@gmail.com | test | admin
jilldoe@gmail.com | test | szerkesztő
janedoe@gmail.com | test | felhasználó

## **5. A végpontok dokumentációja**

Swagger 
- Az alábbi URL-t kell beírni a böngészőbe: http://localhost:3000/api-docs/

---
---

## **Linkek:**  

- [A User Story (adminisztrátori szerepkör) itt érhető el.](https://github.com/sunw5/vizsgaremek/blob/main/README.md)






