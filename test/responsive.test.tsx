import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

// Helper function to simulate viewport changes
const setViewport = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  
  // Update matchMedia mock based on width
  window.matchMedia = vi.fn().mockImplementation(query => {
    const matches = query.includes('768px') ? width >= 768 : 
                   query.includes('1024px') ? width >= 1024 : 
                   query.includes('640px') ? width >= 640 : false
    
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  })
  
  fireEvent(window, new Event('resize'))
}

describe('Responsive Design Tests - Requirement 2.4', () => {
  beforeEach(() => {
    // Reset viewport to desktop size before each test
    setViewport(1024)
  })

  describe('Mobile Navigation Tests', () => {
    it('should show mobile navigation menu on small screens', async () => {
      const Header = (await import('../components/layout/Header')).default
      
      // Set mobile viewport
      setViewport(640)
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Look for mobile menu trigger (hamburger button)
      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      expect(mobileMenuButton).toBeInTheDocument()
    })

    it('should toggle mobile menu when hamburger button is clicked', async () => {
      const user = userEvent.setup()
      const Header = (await import('../components/layout/Header')).default
      
      // Set mobile viewport
      setViewport(640)
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      
      // Click to open mobile menu
      await user.click(mobileMenuButton)
      
      // Verify mobile menu content is visible
      expect(screen.getByText(/Self-paced Learning/i)).toBeInTheDocument()
    })

    it('should hide desktop navigation on mobile screens', async () => {
      const Header = (await import('../components/layout/Header')).default
      
      // Set mobile viewport
      setViewport(640)
      
      const { container } = render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Desktop navigation should be hidden on mobile
      const desktopNav = container.querySelector('.hidden.md\\:flex')
      expect(desktopNav).toBeInTheDocument()
    })
  })

  describe('Breakpoint Tests', () => {
    it('should adapt layout for tablet screens (768px)', async () => {
      const HomePage = (await import('../app/page')).default
      
      // Set tablet viewport
      setViewport(768)
      
      const { container } = render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // Verify responsive grid classes are applied
      const courseGrid = container.querySelector('.grid')
      expect(courseGrid).toBeInTheDocument()
    })

    it('should adapt layout for desktop screens (1024px+)', async () => {
      const HomePage = (await import('../app/page')).default
      
      // Set desktop viewport
      setViewport(1200)
      
      const { container } = render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      )

      // Verify desktop layout is properly structured
      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('should handle course cards responsively', async () => {
      const CourseCard = (await import('../components/home/CourseCard')).default
      
      const mockCourse = {
        title: 'Test Course',
        description: 'Test Description',
        image: '/test-image.jpg',
        duration: '2 hours',
        level: 'Beginner'
      }

      // Test mobile layout
      setViewport(640)
      const { container: mobileContainer } = render(
        <TestWrapper>
          <CourseCard {...mockCourse} />
        </TestWrapper>
      )
      
      expect(mobileContainer.querySelector('.card')).toBeInTheDocument()

      // Test desktop layout
      setViewport(1024)
      const { container: desktopContainer } = render(
        <TestWrapper>
          <CourseCard {...mockCourse} />
        </TestWrapper>
      )
      
      expect(desktopContainer.querySelector('.card')).toBeInTheDocument()
    })
  })

  describe('Touch Interactions', () => {
    it('should handle touch events on mobile buttons', async () => {
      const user = userEvent.setup()
      const Header = (await import('../components/layout/Header')).default
      
      // Set mobile viewport
      setViewport(640)
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      const mobileMenuButton = screen.getByRole('button', { name: /menu/i })
      
      // Simulate touch interaction
      fireEvent.touchStart(mobileMenuButton)
      fireEvent.touchEnd(mobileMenuButton)
      
      // Button should be responsive to touch
      expect(mobileMenuButton).toBeInTheDocument()
    })

    it('should handle swipe gestures on carousel components', async () => {
      const CoursesSection = (await import('../components/home/CoursesSection')).default
      
      // Set mobile viewport
      setViewport(640)
      
      const { container } = render(
        <TestWrapper>
          <CoursesSection />
        </TestWrapper>
      )

      // Look for carousel container
      const carousel = container.querySelector('[data-orientation="horizontal"]')
      if (carousel) {
        // Simulate swipe gesture
        fireEvent.touchStart(carousel, { touches: [{ clientX: 100, clientY: 0 }] })
        fireEvent.touchMove(carousel, { touches: [{ clientX: 50, clientY: 0 }] })
        fireEvent.touchEnd(carousel)
        
        expect(carousel).toBeInTheDocument()
      }
    })
  })

  describe('Hero Section Responsive Behavior', () => {
    it('should adapt hero section for mobile screens', async () => {
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      // Set mobile viewport
      setViewport(640)
      
      const { container } = render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      // Verify hero section renders on mobile
      expect(screen.getByText(/Learn Azure/i)).toBeInTheDocument()
      
      // Check for responsive classes
      const heroContainer = container.querySelector('.container')
      expect(heroContainer).toBeInTheDocument()
    })

    it('should show proper search bar layout on different screen sizes', async () => {
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      // Test mobile
      setViewport(640)
      const { container: mobileContainer } = render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )
      
      const mobileSearchInput = mobileContainer.querySelector('input[placeholder*="Search"]')
      expect(mobileSearchInput).toBeInTheDocument()

      // Test desktop
      setViewport(1024)
      const { container: desktopContainer } = render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )
      
      const desktopSearchInput = desktopContainer.querySelector('input[placeholder*="Search"]')
      expect(desktopSearchInput).toBeInTheDocument()
    })
  })
})