# Smart Utility Toolkit

Smart Utility Toolkit is a mobile-first utility app built with **React Native**, **Expo**, **Expo Router**, **TypeScript**, **NativeWind**, and **Reanimated**. It brings together essential daily tools in one polished app with a clean interface, strong visual hierarchy, smooth navigation, and scalable architecture.

## Overview

The app is designed as a compact toolkit for everyday use. It includes:

- a multi-category **Unit Converter**
- a locally persistent **Notes** feature
- a **Tools Hub** with multiple calculators
- a clean **Home Dashboard**
- a simple **Settings** screen
- a **native splash screen**
- a themed **sticky header** and **bottom tab shell**

## Features

### Home

- Quick access cards for core modules
- Clean dashboard layout
- Strong visual grouping and modern spacing

### Converter

- Length Converter
- Weight Converter
- Temperature Converter
- Currency Converter
- Swap actions
- Instant result updates
- Modular conversion logic for future expansion

### Notes

- Create notes
- Edit notes
- Delete notes
- Search notes
- AsyncStorage persistence
- Friendly empty state

### Tools

- BMI Calculator
- Tip Calculator
- Age Calculator
- Discount Calculator
- Loan Calculator

### Settings

- App information
- Support placeholders
- Terms/privacy placeholders
- Kept inside tab navigation so the bottom tab remains visible

## Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- NativeWind
- React Native Reanimated
- AsyncStorage
- Expo Vector Icons
- EAS Build

## UI / UX Direction

The design system focuses on:

- soft, modern visual styling
- clean card surfaces
- strong spacing consistency
- readable typography hierarchy
- mobile-first touch targets
- subtle motion and micro-interactions
- sticky header behavior
- a full-width bottom tab bar tuned for Android and iOS safe areas

## Project Structure

```text
app/
  _layout.tsx
  index.tsx
  +not-found.tsx
  (tabs)/
    _layout.tsx
    home/
      index.tsx
    converter/
      _layout.tsx
      index.tsx
      length.tsx
      weight.tsx
      temperature.tsx
      currency.tsx
    notes/
      index.tsx
      new.tsx
      [id].tsx
    tools/
      index.tsx
      bmi.tsx
      tip.tsx
      age.tsx
      discount.tsx
      loan.tsx
    settings.tsx

components/
  ui/
  notes/

features/
  converter/
  notes/

lib/
  calculators.ts
  converters.ts
  notes.ts
  theme.ts

assets/
  images/
```
