/**
 * Mock data for lessons
 */

/**
 * Mock morphology lessons
 */
export const mockMorphologyLessons = [
  {
    id: 'prefixes',
    title: 'Common Prefixes',
    description: 'Learn common prefixes and their meanings',
    skillId: 'morphology',
    difficulty: 'intermediate',
    words: [
      {
        word: 'unhappy',
        colorCoded: '<span class="prefix">un</span><span class="root">happy</span>',
        parts: [
          { type: 'prefix', text: 'un', meaning: 'not' },
          { type: 'root', text: 'happy', meaning: 'feeling pleasure or contentment' }
        ],
        definition: 'not happy; sad or discontented',
        sentence: 'She was unhappy with her test score and decided to study harder next time.'
      },
      {
        word: 'preview',
        colorCoded: '<span class="prefix">pre</span><span class="root">view</span>',
        parts: [
          { type: 'prefix', text: 'pre', meaning: 'before' },
          { type: 'root', text: 'view', meaning: 'to look at or see' }
        ],
        definition: 'to view or see beforehand',
        sentence: 'The teacher gave us a preview of the material we would cover next week.'
      },
      {
        word: 'rewrite',
        colorCoded: '<span class="prefix">re</span><span class="root">write</span>',
        parts: [
          { type: 'prefix', text: 're', meaning: 'again' },
          { type: 'root', text: 'write', meaning: 'to form letters or words' }
        ],
        definition: 'to write again or differently',
        sentence: 'She had to rewrite her essay after receiving feedback from her teacher.'
      },
      {
        word: 'disappear',
        colorCoded: '<span class="prefix">dis</span><span class="root">appear</span>',
        parts: [
          { type: 'prefix', text: 'dis', meaning: 'not, opposite of' },
          { type: 'root', text: 'appear', meaning: 'to come into view' }
        ],
        definition: 'to cease to be visible or to exist',
        sentence: 'The magician made the rabbit disappear during the magic show.'
      },
      {
        word: 'misplace',
        colorCoded: '<span class="prefix">mis</span><span class="root">place</span>',
        parts: [
          { type: 'prefix', text: 'mis', meaning: 'wrongly' },
          { type: 'root', text: 'place', meaning: 'to put in a specific location' }
        ],
        definition: 'to put in a wrong place and be unable to find',
        sentence: 'I misplaced my keys and spent an hour looking for them.'
      }
    ]
  },
  {
    id: 'suffixes',
    title: 'Common Suffixes',
    description: 'Learn common suffixes and their meanings',
    skillId: 'morphology',
    difficulty: 'intermediate',
    words: [
      {
        word: 'teacher',
        colorCoded: '<span class="root">teach</span><span class="suffix">er</span>',
        parts: [
          { type: 'root', text: 'teach', meaning: 'to impart knowledge or skill' },
          { type: 'suffix', text: 'er', meaning: 'person who does something' }
        ],
        definition: 'a person who teaches, especially in a school',
        sentence: 'Our teacher explained the math problem step by step.'
      },
      {
        word: 'happiness',
        colorCoded: '<span class="root">happy</span><span class="suffix">ness</span>',
        parts: [
          { type: 'root', text: 'happy', meaning: 'feeling pleasure or contentment' },
          { type: 'suffix', text: 'ness', meaning: 'state or quality' }
        ],
        definition: 'the state of being happy',
        sentence: 'The children\'s laughter was a sign of their happiness.'
      },
      {
        word: 'carefully',
        colorCoded: '<span class="root">care</span><span class="suffix">ful</span><span class="suffix">ly</span>',
        parts: [
          { type: 'root', text: 'care', meaning: 'serious attention or consideration' },
          { type: 'suffix', text: 'ful', meaning: 'full of' },
          { type: 'suffix', text: 'ly', meaning: 'in a specified manner' }
        ],
        definition: 'in a way that avoids potential danger, mishap, or harm',
        sentence: 'He carefully placed the fragile vase on the shelf.'
      },
      {
        word: 'friendship',
        colorCoded: '<span class="root">friend</span><span class="suffix">ship</span>',
        parts: [
          { type: 'root', text: 'friend', meaning: 'a person with whom one has a bond of mutual affection' },
          { type: 'suffix', text: 'ship', meaning: 'state or condition' }
        ],
        definition: 'the state of being friends',
        sentence: 'Their friendship has lasted for over twenty years.'
      },
      {
        word: 'comfortable',
        colorCoded: '<span class="root">comfort</span><span class="suffix">able</span>',
        parts: [
          { type: 'root', text: 'comfort', meaning: 'a state of physical ease' },
          { type: 'suffix', text: 'able', meaning: 'capable of or suitable for' }
        ],
        definition: 'providing physical ease and relaxation',
        sentence: 'The new sofa was very comfortable to sit on.'
      }
    ]
  },
  {
    id: 'root_words',
    title: 'Common Root Words',
    description: 'Learn common root words and their meanings',
    skillId: 'morphology',
    difficulty: 'advanced',
    words: [
      {
        word: 'transport',
        colorCoded: '<span class="prefix">trans</span><span class="root">port</span>',
        parts: [
          { type: 'prefix', text: 'trans', meaning: 'across' },
          { type: 'root', text: 'port', meaning: 'to carry' }
        ],
        definition: 'to carry across or from one place to another',
        sentence: 'The truck will transport the goods to the warehouse.'
      },
      {
        word: 'biology',
        colorCoded: '<span class="root">bio</span><span class="root">logy</span>',
        parts: [
          { type: 'root', text: 'bio', meaning: 'life' },
          { type: 'root', text: 'logy', meaning: 'study of' }
        ],
        definition: 'the study of living organisms',
        sentence: 'She is taking a biology class this semester.'
      },
      {
        word: 'telescope',
        colorCoded: '<span class="root">tele</span><span class="root">scope</span>',
        parts: [
          { type: 'root', text: 'tele', meaning: 'far' },
          { type: 'root', text: 'scope', meaning: 'to see' }
        ],
        definition: 'an optical instrument for making distant objects appear closer',
        sentence: 'We used a telescope to observe the stars.'
      },
      {
        word: 'autobiography',
        colorCoded: '<span class="root">auto</span><span class="root">bio</span><span class="root">graphy</span>',
        parts: [
          { type: 'root', text: 'auto', meaning: 'self' },
          { type: 'root', text: 'bio', meaning: 'life' },
          { type: 'root', text: 'graphy', meaning: 'writing' }
        ],
        definition: 'an account of a person\'s life written by that person',
        sentence: 'The famous athlete published his autobiography last year.'
      },
      {
        word: 'geography',
        colorCoded: '<span class="root">geo</span><span class="root">graphy</span>',
        parts: [
          { type: 'root', text: 'geo', meaning: 'earth' },
          { type: 'root', text: 'graphy', meaning: 'writing or description' }
        ],
        definition: 'the study of the physical features of the earth',
        sentence: 'In geography class, we learned about different landforms.'
      }
    ]
  }
];

/**
 * Get a morphology lesson by ID
 * 
 * @param {string} id - Lesson ID
 * @returns {Object|null} - Lesson object or null if not found
 */
export const getLessonById = (id) => {
  return mockMorphologyLessons.find(lesson => lesson.id === id) || null;
};

export default {
  mockMorphologyLessons,
  getLessonById,
};
