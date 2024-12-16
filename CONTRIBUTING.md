# Contributing Guidelines

## Project Scope
- Little Lemon is a modern restaurant website built with React
- Focus on responsive design and accessibility
- Maintain a clean, intuitive user interface
- Follow Meta's best practices for React development

## Development Standards
### Code Style
- Use functional components with hooks
- Follow ESLint and Prettier configurations
- Use meaningful component and variable names
- Include JSDoc comments for complex functions
- Keep components small and focused

### Git Workflow
- Use meaningful commit messages
- Create feature branches for new work
- Submit pull requests for review
- Keep commits atomic and focused

## AI Development Guidelines
### Prompt Engineering
- Be specific about the component or feature you're working on
- Provide context about the project's existing patterns
- Specify any performance requirements
- Mention accessibility requirements if applicable

### AI Tool Usage
- Use AI for:
  - Code review suggestions
  - Documentation generation
  - Testing scenarios
  - Performance optimization ideas
  - Accessibility improvements
- Always review AI-generated code for:
  - Security concerns
  - Performance implications
  - Accessibility compliance
  - Integration with existing patterns

### Code Quality Checks
Before submitting AI-generated code:
1. Ensure it follows project structure
2. Verify all imports are correct
3. Check for proper error handling
4. Confirm responsive design compliance
5. Test accessibility features

## Project Structure
```
little-lemon/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── context/        # React context files
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Helper functions
│   ├── assets/         # Images, fonts, etc.
│   └── styles/         # CSS/SCSS files
└── public/             # Static files
```

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Run tests: `npm test`

## Additional Resources
- [React Documentation](https://react.dev/)
- [Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Meta's React Style Guide](https://github.com/facebook/react/wiki/Style-Guide)
