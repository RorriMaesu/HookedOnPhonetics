# Hooked On Phonetics

<div align="center">

![Hooked On Phonetics Logo](client/public/images/logo.png)

A production-ready, full-stack literacy and speech web application designed to help users improve their reading, writing, and speech skills.

### [🚀 Visit the Live Application](https://hookedonphonetics-d58c3.web.app/dashboard)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.x-orange.svg)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.x-brown.svg)](https://github.com/pmndrs/zustand)

</div>

## Overview

Hooked On Phonetics is a comprehensive literacy platform that provides interactive tools for phonics, fluency, morphology, sentence construction, semantic analysis, context clues, story mapping, speech practice, and writing workshops. The platform is built on an "Integrated Structured-Literacy Stack" that combines evidence-based approaches to literacy instruction with modern technology.

**🌐 Live Application: [https://hookedonphonetics-d58c3.web.app/dashboard](https://hookedonphonetics-d58c3.web.app/dashboard)**

## Project Showcase

This repository serves as a portfolio showcase for the Hooked On Phonetics project. The actual application is hosted on Firebase, and this GitHub repository contains documentation about the project's features, architecture, and implementation details.

### Technology Stack

- **Frontend**: React 18, Vite, TailwindCSS, Zustand (state management)
- **Backend**: Node.js, Express, Firebase Functions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Hosting**: Firebase Hosting
- **AI Integration**: Google Gemini API for content generation

### Pedagogical Core

Our "Integrated Structured-Literacy Stack" includes:

| Layer                           | Approach                                                            | Implementation                                                        |
| ------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Phonology → Phonics**         | Link manipulation tasks to letters to speed catch-up                | 2-min sound–letter drills before each decoding micro-lesson           |
| **Syllables & Morphology**      | Multisyllabic decoding strategies + explicit morphology instruction | One "3-step" syllable routine; color-coded morphemes                  |
| **Fluency Bridge**              | Guided + repeated oral reading; silent-fluency programs             | Weekly: 2 guided reads, 1 auto-timed silent-read challenge            |
| **Vocabulary & Syntax**         | Direct morphology + academic-word teaching; sentence-combining      | Vocabulary in phonics, fluency and writing games                      |
| **Comprehension Strategies**    | Summarize, question-generate, monitor, recognize text structures    | Animated thought-bubble prompts; auto-filling graphic organizers      |
| **Writing & Spelling Loop**     | Encoding practice; SRSD writing routines                            | Quick-write after each reading lesson; SRSD planner for longer pieces |
| **Digital & Critical Literacy** | Media-literacy skills for evaluating AI-driven content              | Monthly "Think-Like-a-Fact-Checker" quests                            |

### Adaptive Learning Brain

The platform uses Bayesian Knowledge Tracing (BKT) and Item Response Theory (IRT) to personalize learning:

- **BKT-inside-Firestore:** For each micro-skill, Cloud Functions store four BKT parameters and update mastery probability
- **IRT-flavoured Diagnostics:** Initial CAT chooses items that maximize information

### Key Features

- **Phonics Playground**: Interactive phonics exercises with Sound-Swap games and Elkonin-Box tile linking
- **Fluency Studio**: Timed WCPM (Words Correct Per Minute) practice with prosody coaching
- **Morphology Lab**: Word-Factory with color-coded morpheme analysis
- **Sentence Combiner**: Three-step complexity ladder for sentence construction
- **Context Clue Detective**: Interactive unknown-word highlighter with context clue routines
- **Story Map Builder**: Interactive story-grammar maps and expository inference missions
- **Speech Practice**: Web Speech recognition with confidence-band UI and self-validation
- **Writing Workshop**: POW+TREE tabbed wizard with revision checklists and peer-review prompts
- **Skill Tree Dashboard**: Hexagonal grid showing skill mastery and recommended next steps
- **Motivation Engine**: Features designed to satisfy Autonomy, Competence, and Relatedness needs

## Technical Implementation Highlights

### Adaptive Learning Algorithm

The application implements a sophisticated adaptive learning system that combines:

- **Bayesian Knowledge Tracing (BKT)**: Probabilistic framework for modeling knowledge acquisition
- **Item Response Theory (IRT)**: Statistical framework for designing and analyzing assessments
- **Cloud Functions**: Serverless backend for real-time skill mastery updates

### Progressive Web App (PWA)

The application is built as a Progressive Web App, providing:

- Offline functionality
- Install-to-home-screen capability
- Fast loading times with service worker caching
- Responsive design for all device sizes

### Real-time Collaboration

The platform includes real-time collaboration features:

- Shared whiteboard for teletherapy sessions
- Real-time progress tracking for educators
- Collaborative writing spaces for peer feedback

## Key Modules

The application consists of several integrated modules that work together to provide a comprehensive literacy learning experience:

### Learning Modules

- **Phonics Playground**: Interactive phonics exercises with Sound-Swap games and Elkonin-Box tile linking
- **Fluency Studio**: Timed reading practice with prosody coaching and automatic WCPM calculation
- **Morphology Lab**: Word structure analysis with color-coded morpheme visualization
- **Sentence Combiner**: Sentence complexity exercises with three-step progression system
- **Context Clue Detective**: Interactive unknown-word highlighting with guided context clue routines
- **Story Map Builder**: Interactive story-grammar maps and expository inference missions
- **Speech Practice**: Web Speech recognition with confidence-band UI and self-validation
- **Writing Workshop**: Guided writing process with POW+TREE methodology and peer review

### Support Features

- **Skill Tree Dashboard**: Visual representation of progress with hexagonal grid and mastery tracking
- **Motivation Engine**: SDT-based engagement system with autonomy, competence, and relatedness features
- **Teletherapy Widget**: Remote therapy support with video chat and shared whiteboard
- **Intensity Toggle**: Customizable learning schedules with "High Intensity" and "Maintenance" modes

### Image Service

The Image Service provides educational images for various modules.

**Features:**

- AI-powered image generation for educational content
- Caching system for efficient resource usage
- Custom image templates for different educational contexts

## Deployment

The application is deployed to Firebase Hosting and can be accessed at:

**[https://hookedonphonetics-d58c3.web.app/dashboard](https://hookedonphonetics-d58c3.web.app/dashboard)**

The GitHub Pages deployment at [https://rorrimaesu.github.io/HookedOnPhonetics/](https://rorrimaesu.github.io/HookedOnPhonetics/) serves as a redirect to the Firebase-hosted version.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For more information about this project, please contact:

Andrew J. Green - [GitHub Profile](https://github.com/RorriMaesu)
