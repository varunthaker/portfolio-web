import type { Localized } from './types'

export type SceneState = 'gears' | 'conveyor' | 'cells' | 'vba' | 'dissolve' | 'services' | 'agents'

export type Chapter = {
  id: string
  /** `{now}` is replaced with the localized word for "today". */
  period: string
  title: Localized
  place: Localized
  body: Localized
  scene: SceneState
}

export const journey: Chapter[] = [
  {
    id: 'mechanical',
    period: '2012 – 2016',
    scene: 'gears',
    title: { en: 'Mechanical Engineering', de: 'Maschinenbau' },
    place: { en: 'B.Tech · University of Mumbai, India', de: 'B.Tech · University of Mumbai, Indien' },
    body: {
      en: 'It started with machines: gears, tolerances and technical drawings. I learned to think in systems where every part has to fit.',
      de: 'Alles begann mit Maschinen: Zahnräder, Toleranzen und technische Zeichnungen. Ich lernte, in Systemen zu denken, in denen jedes Teil passen muss.',
    },
  },
  {
    id: 'industrial',
    period: '2019 – 2022',
    scene: 'conveyor',
    title: { en: 'Industrial Engineering', de: 'Wirtschaftsingenieurwesen' },
    place: { en: 'Technische Universität Berlin', de: 'Technische Universität Berlin' },
    body: {
      en: 'From single machines to whole processes: supply chain, lean, quality and project management — and the business side of every decision.',
      de: 'Von einzelnen Maschinen zu ganzen Prozessen: Supply Chain, Lean, Qualitäts- und Projektmanagement — und die betriebswirtschaftliche Seite jeder Entscheidung.',
    },
  },
  {
    id: 'supply-chain',
    period: '2021',
    scene: 'cells',
    title: { en: 'Supply Chain, in spreadsheets', de: 'Supply Chain, in Tabellen' },
    place: {
      en: 'Working student · Deutsche Energie System GmbH',
      de: 'Werkstudent · Deutsche Energie System GmbH',
    },
    body: {
      en: 'I built an Excel tool for demand-driven material management and KPI tracking. The boxes on the conveyor became rows and columns.',
      de: 'Ich entwickelte ein Excel-Tool für Demand-Driven-Materialmanagement und KPI-Tracking. Aus den Kisten auf dem Förderband wurden Zeilen und Spalten.',
    },
  },
  {
    id: 'reporting',
    period: '2022 – 2023',
    scene: 'vba',
    title: { en: 'The first lines of code', de: 'Die ersten Zeilen Code' },
    place: {
      en: 'Working student · STRABAG Property and Facility Services',
      de: 'Werkstudent · STRABAG Property and Facility Services',
    },
    body: {
      en: 'Automating facility-management reports with VBA macros. Watching a manual process run by itself was the moment I knew: I want to build software.',
      de: 'Automatisierung von Facility-Management-Reports mit VBA-Makros. Einen manuellen Prozess von selbst laufen zu sehen — da wusste ich: Ich will Software bauen.',
    },
  },
  {
    id: 'switch',
    period: '2022 – 2023',
    scene: 'dissolve',
    title: { en: 'Switching tracks', de: 'Der Quereinstieg' },
    place: {
      en: 'Self-study · Spiced Academy Berlin (Full-Stack Web Development)',
      de: 'Selbststudium · Spiced Academy Berlin (Fullstack Web Development)',
    },
    body: {
      en: 'Evenings with JavaScript, React, design patterns and Git, then an intensive full-stack bootcamp. The factory dissolves — gears become nodes, belts become data pipelines.',
      de: 'Abende mit JavaScript, React, Design Patterns und Git, danach ein intensives Fullstack-Bootcamp. Die Fabrik löst sich auf — Zahnräder werden zu Knoten, Förderbänder zu Datenpipelines.',
    },
  },
  {
    id: 'aiio-platform',
    period: '2024 – {now}',
    scene: 'services',
    title: { en: 'Full-Stack Engineer', de: 'Fullstack Engineer' },
    place: { en: 'aiio GmbH · Magdeburg', de: 'aiio GmbH · Magdeburg' },
    body: {
      en: 'Building core business-process domains in Go with Domain-Driven Design, and helping migrate the platform from Django/MySQL to Go/PostgreSQL — faster responses, better concurrency under load.',
      de: 'Entwicklung zentraler Business-Process-Domains in Go nach Domain-Driven Design und Mitwirkung an der Migration von Django/MySQL zu Go/PostgreSQL — kürzere Antwortzeiten, bessere Concurrency unter Last.',
    },
  },
  {
    id: 'aiio-ai',
    period: '2024 – {now}',
    scene: 'agents',
    title: { en: 'AI agents & MCP', de: 'AI-Agents & MCP' },
    place: { en: 'aiio GmbH · Magdeburg', de: 'aiio GmbH · Magdeburg' },
    body: {
      en: 'Owning the platform’s AI services: agents that analyse business processes, MCP servers and tool calling, a PDF-to-process extraction pipeline, multi-provider model selection and an LLM evaluation setup.',
      de: 'Verantwortung für die AI-Services der Plattform: Agents, die Geschäftsprozesse analysieren, MCP-Server und Tool Calling, eine PDF-to-Process-Extraction-Pipeline, Multi-Provider-Model-Selection und ein LLM-Evaluation-Setup.',
    },
  },
]

export const journeyOutro: Localized = {
  en: 'Same mindset: processes → systems. New tools.',
  de: 'Gleiche Denkweise: Prozesse → Systeme. Neue Werkzeuge.',
}

/** Chapters 1–4 are the "factory" era (amber), 5–7 the "software" era (cyan). */
export const isSoftwareEra = (index: number) => index >= 4
