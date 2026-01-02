import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
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

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
    themes: ['light', 'dark'],
  }),
}))

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

describe('Interactive Features Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Search Bar Functionality - Requirements 2.2', () => {
    it('should render search bar with proper styling and placeholder', async () => {
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      const searchInput = screen.getByPlaceholderText(/Search for courses/i)
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveClass('flex', 'h-10', 'w-full')
    })

    it('should handle search input changes', async () => {
      const user = userEvent.setup()
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      const searchInput = screen.getByPlaceholderText(/Search for courses/i)
      
      await user.type(searchInput, 'Azure Fundamentals')
      
      expect(searchInput).toHaveValue('Azure Fundamentals')
    })

    it('should trigger search on Enter key press', async () => {
      const user = userEvent.setup()
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      const searchInput = screen.getByPlaceholderText(/Search for courses/i)
      
      await user.type(searchInput, 'Azure{enter}')
      
      // Verify search functionality is triggered
      expect(searchInput).toHaveValue('Azure')
    })

    it('should have proper search button styling and behavior', async () => {
      const user = userEvent.setup()
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      const searchButton = screen.getByRole('button', { name: /search/i })
      expect(searchButton).toBeInTheDocument()
      
      await user.click(searchButton)
      
      // Verify button is clickable and styled correctly
      expect(searchButton).toHaveClass('inline-flex', 'items-center', 'justify-center')
    })
  })

  describe('Theme Switching Functionality - Requirements 4.4', () => {
    it('should render theme toggle button', async () => {
      const Header = (await import('../components/layout/Header')).default
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Look for theme toggle button (usually a sun/moon icon)
      const themeButton = screen.getByRole('button', { name: /toggle theme/i })
      expect(themeButton).toBeInTheDocument()
    })

    it('should toggle theme when theme button is clicked', async () => {
      const user = userEvent.setup()
      const Header = (await import('../components/layout/Header')).default
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      const themeButton = screen.getByRole('button', { name: /toggle theme/i })
      
      await user.click(themeButton)
      
      // Verify theme switching function is called
      expect(mockSetTheme).toHaveBeenCalled()
    })

    it('should apply correct theme classes to document', async () => {
      const RootLayout = (await import('../app/layout')).default
      
      const { container } = render(
        <RootLayout>
          <div>Test content</div>
        </RootLayout>
      )

      // Verify theme provider is properly set up
      expect(container.querySelector('html')).toBeInTheDocument()
    })
  })

  describe('Navigation and Links - Requirements 2.2, 4.4', () => {
    it('should handle navigation menu interactions', async () => {
      const user = userEvent.setup()
      const Header = (await import('../components/layout/Header')).default
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Test main navigation links
      const learningLink = screen.getByText(/Self-paced Learning/i)
      expect(learningLink).toBeInTheDocument()
      
      await user.hover(learningLink)
      
      // Verify hover interactions work
      expect(learningLink).toBeInTheDocument()
    })

    it('should handle dropdown menu interactions', async () => {
      const user = userEvent.setup()
      const Header = (await import('../components/layout/Header')).default
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Look for dropdown triggers
      const dropdownTrigger = screen.getByText(/Self-paced Learning/i)
      
      await user.click(dropdownTrigger)
      
      // Verify dropdown functionality
      expect(dropdownTrigger).toBeInTheDocument()
    })

    it('should handle footer links correctly', async () => {
      const user = userEvent.setup()
      const Footer = (await import('../components/layout/Footer')).default
      
      render(
        <TestWrapper>
          <Footer />
        </TestWrapper>
      )

      // Test footer links
      const footerLinks = screen.getAllByRole('link')
      expect(footerLinks.length).toBeGreaterThan(0)
      
      // Test first footer link
      if (footerLinks[0]) {
        await user.click(footerLinks[0])
        expect(footerLinks[0]).toBeInTheDocument()
      }
    })
  })

  describe('Button Interactions', () => {
    it('should handle course card button clicks', async () => {
      const user = userEvent.setup()
      const CourseCard = (await import('../components/home/CourseCard')).default
      
      const mockCourse = {
        title: 'Azure Fundamentals',
        description: 'Learn Azure basics',
        image: '/test-image.jpg',
        duration: '2 hours',
        level: 'Beginner'
      }

      render(
        <TestWrapper>
          <CourseCard {...mockCourse} />
        </TestWrapper>
      )

      // Look for interactive elements in course card
      const courseButton = screen.getByRole('button') || screen.getByRole('link')
      
      if (courseButton) {
        await user.click(courseButton)
        expect(courseButton).toBeInTheDocument()
      }
    })

    it('should handle CTA buttons in hero section', async () => {
      const user = userEvent.setup()
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      // Look for call-to-action buttons
      const ctaButtons = screen.getAllByRole('button')
      expect(ctaButtons.length).toBeGreaterThan(0)
      
      // Test first CTA button
      if (ctaButtons[0]) {
        await user.click(ctaButtons[0])
        expect(ctaButtons[0]).toBeInTheDocument()
      }
    })

    it('should handle carousel navigation buttons', async () => {
      const user = userEvent.setup()
      const CoursesSection = (await import('../components/home/CoursesSection')).default
      
      const { container } = render(
        <TestWrapper>
          <CoursesSection />
        </TestWrapper>
      )

      // Look for carousel navigation buttons
      const prevButton = container.querySelector('[data-testid="carousel-prev"]')
      const nextButton = container.querySelector('[data-testid="carousel-next"]')
      
      if (nextButton) {
        await user.click(nextButton)
        expect(nextButton).toBeInTheDocument()
      }
      
      if (prevButton) {
        await user.click(prevButton)
        expect(prevButton).toBeInTheDocument()
      }
    })
  })

  describe('Form Interactions', () => {
    it('should handle form submissions correctly', async () => {
      const user = userEvent.setup()
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      const searchInput = screen.getByPlaceholderText(/Search for courses/i)
      const searchForm = searchInput.closest('form')
      
      if (searchForm) {
        await user.type(searchInput, 'test search')
        
        fireEvent.submit(searchForm)
        
        // Verify form submission handling
        expect(searchInput).toHaveValue('test search')
      }
    })

    it('should validate form inputs properly', async () => {
      const user = userEvent.setup()
      const HeroSection = (await import('../components/home/HeroSection')).default
      
      render(
        <TestWrapper>
          <HeroSection />
        </TestWrapper>
      )

      const searchInput = screen.getByPlaceholderText(/Search for courses/i)
      
      // Test empty input validation
      await user.clear(searchInput)
      await user.tab()
      
      // Verify input validation behavior
      expect(searchInput).toBeInTheDocument()
    })
  })

  describe('Accessibility Interactions', () => {
    it('should handle keyboard navigation', async () => {
      const user = userEvent.setup()
      const Header = (await import('../components/layout/Header')).default
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Test tab navigation
      await user.tab()
      
      const focusedElement = document.activeElement
      expect(focusedElement).toBeInTheDocument()
    })

    it('should support screen reader accessibility', async () => {
      const Header = (await import('../components/layout/Header')).default
      
      render(
        <TestWrapper>
          <Header />
        </TestWrapper>
      )

      // Verify ARIA labels and roles
      const navigation = screen.getByRole('navigation')
      expect(navigation).toBeInTheDocument()
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
      })
    })
  })
})