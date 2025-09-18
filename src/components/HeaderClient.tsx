'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import {Separator} from "@/components/ui/separator";
import NavLink from "@/components/NavLink";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import {useState} from "react";
import type {Locale} from "@/i18n";

type Props = {
  locale: Locale;
  labels: { home: string; about: string; contact: string };
};

export default function HeaderClient({locale, labels}: Props) {
  const [open, setOpen] = useState(false);

  const homeHref = `/${locale}`;
  const aboutHref = `/${locale}/about`;
  const contactHref = `/${locale}/contact`;

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div className="flex items-center justify-between py-3 mx-auto max-w-5xl px-4">
        <a href={homeHref} className="font-bold">MultiWeb</a>

        {/* Asztali menü */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <NavLink href={homeHref}>{labels.home}</NavLink>
          <NavLink href={aboutHref}>{labels.about}</NavLink>
          <NavLink href={contactHref}>{labels.contact}</NavLink>
          <LocaleSwitcher current={locale} />
          <ThemeToggle />
        </nav>

        {/* Mobilmenü gomb */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="px-3 py-2 border rounded-xl" aria-label="Nyisd meg a menüt">
              ☰ Menü
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              {/* A11y cím/desc a dialoghoz */}
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation menu</SheetTitle>
                <SheetDescription>Site sections and language switch</SheetDescription>
              </SheetHeader>

              <div className="grid gap-3 mt-8">
                <a className="font-bold mb-2" href={homeHref} onClick={() => setOpen(false)}>
                  MultiWeb
                </a>

                <Separator />

                {/* *** ITT A LÉNYEG: a Kapcsolat link mobilon is *** */}
                <NavLink href={homeHref} onClick={() => setOpen(false)}>
                  {labels.home}
                </NavLink>
                <NavLink href={aboutHref} onClick={() => setOpen(false)}>
                  {labels.about}
                </NavLink>
                <NavLink href={contactHref} onClick={() => setOpen(false)}>
                  {labels.contact}
                </NavLink>

                <Separator className="my-2" />

                <LocaleSwitcher current={locale} />
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


// A HeaderClient komponens a fejlécet valósítja meg
// Mobilon egy "hamburger" menü gomb jelenik meg, ami egy oldalsó panelt nyit meg
// Ebben a panelben találhatók a navigációs linkek, nyelvváltó és téma váltó
// Az asztali nézetben a menü elemek vízszintesen jelennek meg
// A Sheet komponens a dialog/panel megvalósításáért felelős
// A SheetTrigger egy gomb, ami megnyitja a panelt
// A SheetContent maga a panel tartalma
// A SheetHeader, SheetTitle és SheetDescription a hozzáférhetőség miatt szükségesek
// A Separator komponens egy vízszintes elválasztó vonal
// A NavLink komponens a navigációs linkeket valósítja meg, aktív állapot kezeléssel
// A LocaleSwitcher és ThemeToggle komponensek a nyelv és téma váltást biztosítják
// A useState hook segítségével kezeljük a panel nyitott/zárt állapotát
// A setOpen függvényt átadjuk a Sheet komponensnek, hogy az tudja módosítani az állapotot
// A menü linkekre kattintáskor bezárjuk a panelt a setOpen(false) hívással
// A className-ek Tailwind CSS osztályokat használnak a stílushoz
// A "md:hidden" és "hidden md:flex" osztályok segítségével rejtjük/elrejtjük a menü elemeket különböző képernyőméreteken
// Az aria-label attribútum javítja a hozzáférhetőséget, leírva a menü gomb funkcióját    npm run dev
// A "backdrop-blur" osztály enyhe elmosódást ad a háttérnek, amikor a panel nyitva van
// A "z-50" osztály biztosítja, hogy a fejléc mindig a tetején legyen más elemekhez képest
// A "max-w-5xl" osztály korlátozza a fejléc maximális szélességét nagy képernyőkön
// A "px-4" és "py-3" osztályok belső margót adnak a fejléc tartalmának
// A "gap-4" és "gap-3" osztályok távolságot biztosítanak a menü elemek között
// A "text-sm" osztály kisebb betűméretet alkalmaz a menü elemekre
// A "rounded-xl" osztály lekerekített sarkokat ad a menü gombnak
// A "border" osztály keretet ad a menü gombnak
// A "hover:bg-muted" osztály háttérszínt változtat hover állapotban a menü gombon
// A "inline-flex" és "items-center" osztályok középre igazítják a menü gomb tartalmát
// A "w-64" osztály fix szélességet ad a mobil panelnek
// A "mt-8" osztály felső margót ad a panel tartalmának
// A "my-2" osztály függőleges margót ad a panel elválasztóinak
// A "font-bold" osztály félkövér betűstílust alkalmaz a logóra és címekre
// A "mb-2" osztály alsó margót ad a logónak a panelen belül
// A "sr-only" osztály elrejti a fejlécet vizuálisan, de elérhetővé teszi képernyőolvasók számára
// A "aria-label" attribútum javítja a hozzáférhetőséget, leírva a menü gomb funkcióját 

