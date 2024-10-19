import { Calculator, CalculatorIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'latexEquation',
  title: 'LatexEquation',
  type: 'object',
  fields: [
    defineField({
      name: 'equation',
      title: 'Equation',
      type: 'array',
      description:
        'Use LaTeX to write mathematical equations. For inline math, use the inline math block. For block math, use the math block.',
      of: [
        {
          type: 'block',
          title: 'Block',
          of: [{ type: 'latex', icon: CalculatorIcon, title: 'Inline math' }],
        },
        { type: 'latex', icon: CalculatorIcon, title: 'Math block' },
      ],
      options: {
        layout: 'tags',
      },
    }),
  ],
})


