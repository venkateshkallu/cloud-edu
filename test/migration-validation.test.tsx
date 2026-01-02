import { describe, it, expect, vi } from 'vitest'
import { existsSync } from 'fs'
import path from 'path'

describe('Migration Validation Tests', () => {
  describe('10.1 Test all page routes - Requirements 2.1, 2.5, 4.1', () => {
    it('should have all required page files in correct Next.js structure', () => {
      // Verify homepage exists
      expect(existsSync(path.join(process.cwd(), 'app/page.tsx'))).toBe(true)
      
      // Verify course detail page exists
      expect(existsSync(path.join(process.cwd(), 'app/courses/[slug]/page.tsx'))).toBe(true)
      
      // Verify lesson player page exists
      expect(existsSync(path.join(process.cwd(), 'app/courses/[slug]/lesson/[[...lessonId]]/page.tsx'))).toBe(true)
      
      // Verify 404 page exists
      expect(existsSync(path.join(process.cwd(), 'app/not-found.tsx'))).toBe(true)
    })

    it('should have proper Next.js app structure', () => {
      // Verify root layout exists
      expect(existsSync(path.join(process.cwd(), 'app/layout.tsx'))).toBe(true)
      
      // Verify global styles exist
      expect(existsSync(path.join(process.cwd(), 'app/globals.css'))).toBe(true)
      
      // Verify Next.js config exists
      expect(existsSync(path.join(process.cwd(), 'next.config.js'))).toBe(true)
    })

    it('should have all required components migrated', () => {
      // Verify layout components
      expect(existsSync(path.join(process.cwd(), 'components/layout/Header.tsx'))).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'components/layout/Footer.tsx'))).toBe(true)
      
      // Verify home page components
      expect(existsSync(path.join(process.cwd(), 'components/home/HeroSection.tsx'))).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'components/home/CoursesSection.tsx'))).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'components/home/CertificationsSection.tsx'))).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'components/home/SkillsProgramSection.tsx'))).toBe(true)
      
      // Verify UI components
      expect(existsSync(path.join(process.cwd(), 'components/ui/button.tsx'))).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'components/ui/card.tsx'))).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'components/ui/input.tsx'))).toBe(true)
    })
  })

  describe('10.2 Test responsive design - Requirements 2.4', () => {
    it('should have Tailwind CSS configuration with responsive breakpoints', () => {
      expect(existsSync(path.join(process.cwd(), 'tailwind.config.ts'))).toBe(true)
    })

    it('should have mobile-first responsive classes in components', async () => {
      const fs = await import('fs/promises')
      
      // Check Header component for responsive classes
      const headerContent = await fs.readFile(path.join(process.cwd(), 'components/layout/Header.tsx'), 'utf-8')
      expect(headerContent).toMatch(/md:|lg:|xl:|sm:/)
      
      // Check HeroSection for responsive classes
      const heroContent = await fs.readFile(path.join(process.cwd(), 'components/home/HeroSection.tsx'), 'utf-8')
      expect(heroContent).toMatch(/md:|lg:|xl:|sm:/)
    })

    it('should have proper viewport meta tag in layout', async () => {
      const fs = await import('fs/promises')
      const layoutContent = await fs.readFile(path.join(process.cwd(), 'app/layout.tsx'), 'utf-8')
      expect(layoutContent).toMatch(/viewport.*width=device-width/)
    })
  })

  describe('10.3 Test interactive features - Requirements 2.2, 4.4', () => {
    it('should have search functionality in HeroSection', async () => {
      const fs = await import('fs/promises')
      const heroContent = await fs.readFile(path.join(process.cwd(), 'components/home/HeroSection.tsx'), 'utf-8')
      
      // Check for search input
      expect(heroContent).toMatch(/placeholder.*[Ss]earch/)
      expect(heroContent).toMatch(/Button.*>[\s\n]*Search/)
    })

    it('should have theme switching functionality', async () => {
      const fs = await import('fs/promises')
      
      // Check for ThemeProvider in layout or providers
      const layoutContent = await fs.readFile(path.join(process.cwd(), 'app/layout.tsx'), 'utf-8')
      const providersContent = existsSync(path.join(process.cwd(), 'components/providers.tsx')) 
        ? await fs.readFile(path.join(process.cwd(), 'components/providers.tsx'), 'utf-8')
        : ''
      
      const combinedContent = layoutContent + providersContent
      expect(combinedContent).toMatch(/ThemeProvider|next-themes/)
    })

    it('should have proper button and link components', async () => {
      const fs = await import('fs/promises')
      
      // Check button component exists and has proper styling
      const buttonContent = await fs.readFile(path.join(process.cwd(), 'components/ui/button.tsx'), 'utf-8')
      expect(buttonContent).toMatch(/className.*variants|cva|class-variance-authority/)
      
      // Check for interactive classes
      expect(buttonContent).toMatch(/hover:|focus:|active:/)
    })

    it('should have navigation with proper links', async () => {
      const fs = await import('fs/promises')
      const headerContent = await fs.readFile(path.join(process.cwd(), 'components/layout/Header.tsx'), 'utf-8')
      
      // Check for navigation links
      expect(headerContent).toMatch(/Self-paced Learning|Instructor-led Training|Credentials/)
      expect(headerContent).toMatch(/Link.*href|href.*Link/)
    })
  })

  describe('Build and Configuration Validation', () => {
    it('should have proper package.json with Next.js dependencies', async () => {
      const fs = await import('fs/promises')
      const packageContent = await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8')
      const packageJson = JSON.parse(packageContent)
      
      // Check for Next.js
      expect(packageJson.dependencies.next).toBeDefined()
      expect(packageJson.dependencies.react).toBeDefined()
      expect(packageJson.dependencies['react-dom']).toBeDefined()
      
      // Check for UI dependencies
      expect(packageJson.dependencies['@tanstack/react-query']).toBeDefined()
      expect(packageJson.dependencies['next-themes']).toBeDefined()
      expect(packageJson.devDependencies.tailwindcss || packageJson.dependencies.tailwindcss).toBeDefined()
    })

    it('should have proper TypeScript configuration', () => {
      expect(existsSync(path.join(process.cwd(), 'tsconfig.json'))).toBe(true)
    })

    it('should have proper build scripts', async () => {
      const fs = await import('fs/promises')
      const packageContent = await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8')
      const packageJson = JSON.parse(packageContent)
      
      expect(packageJson.scripts.dev).toBe('next dev')
      expect(packageJson.scripts.build).toBe('next build')
      expect(packageJson.scripts.start).toBe('next start')
    })
  })

  describe('Styling and Assets Validation', () => {
    it('should have global CSS with proper imports', async () => {
      const fs = await import('fs/promises')
      const globalCssContent = await fs.readFile(path.join(process.cwd(), 'app/globals.css'), 'utf-8')
      
      // Check for Tailwind directives
      expect(globalCssContent).toMatch(/@tailwind base|@tailwind components|@tailwind utilities/)
      
      // Check for custom CSS variables
      expect(globalCssContent).toMatch(/--.*:/)
    })

    it('should have shadcn/ui configuration', () => {
      expect(existsSync(path.join(process.cwd(), 'components.json'))).toBe(true)
      expect(existsSync(path.join(process.cwd(), 'lib/utils.ts'))).toBe(true)
    })

    it('should have proper font configuration', async () => {
      const fs = await import('fs/promises')
      const layoutContent = await fs.readFile(path.join(process.cwd(), 'app/layout.tsx'), 'utf-8')
      
      // Check for font imports and usage
      expect(layoutContent).toMatch(/Plus_Jakarta_Sans|font/)
    })
  })
})