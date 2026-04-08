# Contributing Guide

Terima kasih telah tertarik berkontribusi pada Alumni Tracker UMM! 🎉

## Cara Berkontribusi

### 1. Setup Development Environment

```bash
# Clone repository
git clone https://github.com/yourusername/alumni-tracker-umm.git
cd alumni-tracker-umm

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Development Workflow

```bash
# Start dev server
npm run dev

# Build untuk testing
npm run build

# Lint code
npm run lint
```

### 3. Commit Guidelines

```bash
# Format: type(scope): description

git commit -m "feat(alumni): add export to excel functionality"
git commit -m "fix(tracking): fix status badge rendering issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(css): improve responsive design on mobile"
git commit -m "refactor(components): optimize Modal component"
git commit -m "test(validators): add validation tests"
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Styling changes
- `refactor`: Code refactoring
- `test`: Test cases
- `chore`: Build process, dependencies

### 4. Push dan Create Pull Request

```bash
# Push ke remote
git push origin feature/your-feature-name

# Create PR di GitHub
# Deskripsi PR harus jelas dan detail
```

## Coding Standards

### File Structure
```
- Components: PascalCase (Button.jsx)
- Functions: camelCase (handleClick)
- Constants: UPPER_SNAKE_CASE
- CSS Classes: kebab-case (button-primary)
```

### Code Style
```javascript
// ✅ Good
const handleSubmit = (e) => {
  e.preventDefault();
  // logic here
};

// ❌ Bad
const handleSubmit=e=>{e.preventDefault();}

// ✅ Good
import { Button } from './components';

// ❌ Bad
import Button from './components/Button';
```

### Component Structure
```jsx
import React, { useState } from 'react';
import { Input } from './FormElements';

// Props documentation
const MyComponent = ({ title, onSubmit }) => {
  // State declarations
  const [state, setState] = useState('');

  // Event handlers
  const handleChange = (e) => {
    setState(e.target.value);
  };

  // Effects
  React.useEffect(() => {
    // initialization
  }, []);

  // Render
  return (
    <div className="my-component">
      <Input onChange={handleChange} />
    </div>
  );
};

export default MyComponent;
```

## Testing

### Testing Checklist
- [ ] Test di Chrome, Firefox, Safari
- [ ] Test responsif di mobile (375px), tablet (768px), desktop (1440px)
- [ ] Test semua form validation
- [ ] Test CRUD operations
- [ ] Test error scenarios
- [ ] Test permissions (admin vs operator)

### Manual Testing Template

```markdown
## Test Summary

### New Feature
- [ ] Feature berfungsi sesuai spec
- [ ] Responsive di semua device
- [ ] Form validation bekerja
- [ ] Error handling baik
- [ ] Documentation updated

### Bug Fix
- [ ] Bug sudah fixed
- [ ] Tidak ada regression
- [ ] Related tests updated
- [ ] Documentation updated
```

## Documentation

### Update README jika:
- Menambah fitur baru
- Mengubah deployment instructions
- Menambah dependencies
- Mengubah API endpoints

### Update DOKUMENTASI.md jika:
- Menambah/mengubah fungsi public
- Menambah/mengubah components
- Mengubah folder structure
- Menambah env variables

### Code Comments
```javascript
// ✅ Good: Clear and descriptive
// Format tanggal sesuai locale Indonesia
const formatDate = (date) => {
  return date.toLocaleDateString('id-ID');
};

// ❌ Bad: Unclear
// format the date
const formatDate = (date) => {
  return date.toLocaleDateString('id-ID');
};
```

## Issue Reporting

### Bug Report Template
```markdown
## Description
Deskripsi singkat bug

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
Apa yang seharusnya terjadi

## Actual Behavior
Apa yang terjadi sebenarnya

## Screenshots
(if applicable)

## Environment
- Browser: Chrome 120
- Device: MacBook Pro
- OS: macOS Sonoma
```

### Feature Request Template
```markdown
## Description
Deskripsi fitur yang diinginkan

## Motivation
Kenapa fitur ini dibutuhkan

## Proposed Solution
Cara implementasi yang disarankan

## Alternatives
Alternatif lain yang mungkin
```

## Semantic Versioning

Project mengikuti [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

Example: `1.2.3`
- 1 = MAJOR
- 2 = MINOR
- 3 = PATCH

## Community Guidelines

- Be respectful
- Be inclusive
- Provide constructive feedback
- Acknowledge good contributions
- Help others when possible

## Questions?

- Open discussion di [GitHub Discussions](https://github.com/yourusername/alumni-tracker-umm/discussions)
- Check existing issues dan documentation
- Ask in pull request comments

---

Thank you for contributing! 🙏
