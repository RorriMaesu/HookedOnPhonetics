# Contributing to Hooked On Phonetics

Thank you for considering contributing to Hooked On Phonetics! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template when creating a new issue
- Include detailed steps to reproduce the bug
- Include screenshots if applicable
- Specify your operating system, browser, and relevant version information

### Suggesting Enhancements

- Check if the enhancement has already been suggested in the Issues section
- Use the feature request template when creating a new issue
- Provide a clear description of the enhancement
- Explain why this enhancement would be useful to most users

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure they pass
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hooked-on-phonetics.git
   cd hooked-on-phonetics
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both the client and server directories
   - Fill in your API keys and configuration values

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Coding Guidelines

- Follow the ESLint and Prettier configurations
- Write tests for new features
- Maintain or improve code coverage
- Follow the existing code style and architecture
- Use meaningful commit messages

## Testing

- Run tests before submitting a pull request:
  ```bash
  pnpm test
  ```

- Ensure code coverage is maintained or improved:
  ```bash
  pnpm test:coverage
  ```

## Documentation

- Update documentation for any changes to the API, features, or behavior
- Use clear and concise language
- Include examples where appropriate

## Branching Strategy

- `main` - Production-ready code
- `scaffold` - Development branch for staging changes
- Feature branches should be created from `scaffold` and merged back into `scaffold`

## License

By contributing to Hooked On Phonetics, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
